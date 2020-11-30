import $ from 'jquery'

import store from './store'
import api from './api'

//to stay with the instant/live editing vibe... add new bookmark submission attempt on other handlers? 
//this way new bookmarks automatically and immediately become part of the group.

const renderNewBookmark = function () {
  $('.js-new-bookmark-div').html(`
              <form class="js-new-bookmark-form new-bookmark-form">
                <div class="condensed">
                  <!-- delete -->
                  <button class="delete-bookmark-btn js-delete-bookmark-btn" type="button">
                    <i class="fas fa-times"></i>
                  </button>
                  <!-- bookmark title -->
                  <h2><input title="bookmark name (required)" type="text" 
                    name="bookmark-entry" class="js-new-title" 
                    placeholder="e.g., facebook" required></h2>
                  <!-- rating -->
                  <ul class="stars">
                    <li value='1'><button type="button" class="star 1"><i class="far fa-star"></i></button></li>
                    <li value='2'><button type="button" class="star 2"><i class="far fa-star"></i></button></li>
                    <li value='3'><button type="button" class="star 3"><i class="far fa-star"></i></button></li>
                    <li value='4'><button type="button" class="star 4"><i class="far fa-star"></i></button></li>
                    <li value='5'><button type="button" class="star 5"><i class="far fa-star"></i></button></li>
                  </ul>
                </div>

                <div class="expanded">
                  <div class="url">
                    <!-- url link -->
                    <input title="bookmark url (required)" type="text" 
                      name="bookmark-url" class="bookmark-url js-new-url" 
                      placeholder="e.g., www.facebook.com" required>
                  </div>
                  <!-- description -->
                  <textarea title="bookmark description (not required)" class="js-new-description" rows="4" cols="50" placeholder="Add a description here. (optional)"></textarea>
                </div>
              </form>`)
}

const generateRatingString = function (link) {
  let ratingHTML = ''
  for (let i=0; i < 5; i++) {
    if (i < link.rating) { //filled star icon
      ratingHTML += `<li value=${i+1}><button class="star ${i+1}" type="button"><i class="fas fa-star"></i></button></li>`
    } else { //hollow star icon
      ratingHTML += `<li value=${i+1}><button class="star ${i+1}" type="button"><i class="far fa-star"></i></button></li>`
    }
  }
  return ratingHTML
}
const isExpanded = function (link) {
  let expandedBtnString = ''
  if (!link.expanded) {
    expandedBtnString = '"fas fa-caret-right fa-2x"'
  } else {
    expandedBtnString = '"fas fa-caret-down fa-2x"'
  }
  return expandedBtnString
}
const generateLinkElement = function (link) {
  //1) generate star rating
  let ratingString = generateRatingString(link)
  //2) if expanded, generate url, link, and description
  let expandedString = ''
  if (link.expanded) {
    expandedString = `
      <div class="url">
        <!-- url link -->
        <input title="bookmark url (required)" type="text" 
          name="bookmark-url" class="bookmark-url js-bookmark-url" 
          placeholder="e.g., www.facebook.com" value=${link.url} required>
        <!-- visit -->
        <a class="visit-bookmark-btn js-visit-bookmark-btn" href="${link.url}" target="_blank">
          <i class="fas fa-external-link-alt"></i>
        </a>
      </div>
      <!-- description -->
      <textarea title="bookmark description (not required)" class="js-bookmark-description" rows="4" cols="50" placeholder="Add a description here. (optional)">${link.desc}</textarea>
  `}
  //3) generate the condensed version
  return `
  <li class="bookmark js-bookmark-form" data-item-id="${link.id}">
    <div class="condensed">
      <!-- delete -->
      <button class="delete-bookmark-btn js-delete-bookmark-btn">
        <i class="fas fa-times"></i>
      </button>
      <!-- bookmark title -->
      <h2><input title="bookmark name (required)" type="text" 
        name="bookmark-entry" class="js-bookmark-entry" 
        placeholder="e.g., facebook" value=${link.title} required></h2>
      <!-- rating -->
      <ul class="stars">
        ${ratingString}
      </ul>
      <!-- expand -->
      <button title="show/hide details" class="expand-bookmark-toggle js-expand-bookmark-toggle" type="button">
        <i class=${isExpanded(link)}></i>
      </button>
    </div>

    <div class="expanded">
      ${expandedString}
    </div>
  </li>
  `
}
const generateBookmarksString = function (ShownBookmarks) {
    const elements = ShownBookmarks.map((el) => generateLinkElement(el));
    return elements.join('');
}

const generateError = function (message) {
    return `
        <section class="error">
          <button id="cancel-error">
            <i class="fas fa-times"></i>
          </button>
          <p>${message}.</p>
        </section>`
}
const renderError = function () {
    if (store.error) {
      const el = generateError(store.error)
      $('.error-div').html(el)
    } else {
      $('.error-div').empty()
    }
}
const handleCloseError = function () {
  $('.error-div').on('click', '#cancel-error', () => {
    store.setError(null)
    renderError()
  })
}

const handleHeaderInputs = function () {
  $('header').on('input', '#filter', function(e){
    store.searchText = $(e.target).val().toLowerCase()
    render()
  })
  $('header').on('input','#minStars', function(e){
    let val = Number($(e.target).val())
    if (typeof val === "number") {
      store.minRating = val
    }
    render()
  })
  $('header').on('input','#maxStars', function(e){
    let val = Number($(e.target).val())
    console.log(val)
    if (typeof val === "number" && val > 0) {
      store.maxRating = val
    } else {
      store.maxRating = 5
    }
    render()
  })
}

let sortFuncs = {
  byCreated: function (links) {
    //consider making a toggle
    links.sort((a, b)=> (a.createdAt < b.createdAt) ? 1 : -1)
  },
  byEdited: function (links) {
    //consider making a toggle
    links.sort((a, b)=> (a.editedAt < b.editedAt) ? 1 : -1)
  },
  byHighRating: function (links) {
    links.sort((a, b)=> (a.rating < b.rating) ? 1 : -1)
  },
  byLowRating: function (links) {
    links.sort((a, b)=> (a.rating > b.rating) ? 1 : -1)
  },
  byTitle: function (links) {
    links.sort((a, b)=> (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1)
  }
}

const handleHeaderSelect = function () {
  $('header').on('change','#sortBy', function(e){
    store.sortBy = $(e.target).val()
    render()
  })
}

//SHOWS CURRENT BOOKMARKS
//WE START HERE!!!!!!
const render = function () {
    renderError()

    let links = [...store.links]
    //Only show bookmarks where title includes searchbar text
    if (store.searchText) {
        links = links.filter(link => link.title.toLowerCase().includes(store.searchText))
    }
    //Don't show bookmarks outside rating range
    if (store.minRating > 0) {
      links = links.filter(link => link.rating >= store.minRating)
    }
    if (store.maxRating < 5) {
        links = links.filter(link => link.rating <= store.maxRating)
    }

    //calls functions dynamically by string of select option value!!
    sortFuncs[store.sortBy](links)
    
    //Render the accepted bookmarks strings
    const shownBookmarksString = generateBookmarksString(links)
  
    //Insert the HTML into the DOM
    $('.js-bookmark-list').html(shownBookmarksString);
}

//NOT YET FUNCTIONING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// there is no singular bookmark submission button..?
//when the user attempts to use functions outside of the form...
// create a .trigger('submit') that attempts to submit or error


const handleStars = function () {
  //if stars are clicked then set the value.
  $('.js-new-bookmark-div').on('click', '.star', function(e) {
    e.preventDefault
    store.newRating = $(e.target).closest('li').val()
    console.log(`rating set to ${store.newRating}`)
    let updatedStars = ''
    for (let i=0; i<5; i++) {
      if (i < store.newRating) { //filled star icon
        updatedStars += `<li value=${i+1}><button class="star ${i+1}" type="button"><i class="fas fa-star"></i></button></li>`
      } else { //hollow star icon
        updatedStars += `<li value=${i+1}><button class="star ${i+1}" type="button"><i class="far fa-star"></i></button></li>`
      }
    }
    $(e.target).closest('.stars').html(updatedStars)
  })
  $('.js-bookmark-list').on('click', '.star', function(e) {
    e.preventDefault()
    //set + update rating
    const newRating = $(e.target).closest('li').val()
    const id = getBookmarkIdFromElement(e.currentTarget)

    api.updateBookmark(id, { rating: newRating })
      .then(() => {
        store.findAndUpdate(id, { rating: newRating })
        render()
      })
      .catch((error) => {
        console.log(error)
        store.setError(error.message)
        renderError()
      })
  })
}

const handleNewBookmark = function () {
  $('.js-new-bookmark-div').on('submit','.js-new-bookmark-form', function(e) {
    e.preventDefault();
    console.log('new bookmark submission attempt')
    
    store.newTitle = $('.js-new-title').val().trim()

    store.newUrl = $('.js-new-url').val().trim().toLowerCase()
    if (!store.newUrl.includes('http://') || !store.newUrl.includes('https://')) {
      store.newUrl = 'http://' + store.newUrl
    }

    store.newDesc = $('.js-new-description').val().trim()
    
    api.createBookmark(store.newTitle, store.newUrl, store.newDesc, store.newRating)
      .then((newBookmark) => {
        store.addingBookmark = false
        store.addLink(newBookmark)
        $('.js-new-bookmark-div').empty()
        render()
      })
      .catch((error) => {
        store.setError(error.message)
        renderError()
      })
  })
}

const handleAddBookmarkBtn = function () {
    $('header').on('click', '#js-add-bookmark', function (event) {
      event.preventDefault()
      //is there a blank bookmark? 
      if (store.addingBookmark) {
        $('.js-new-bookmark-form').trigger('submit')
        //if there is a blank bookmark, check that the form is fulfilled
        // if not, send an error, if it is save it and change how it's rendered.

        //when every action outside of the new bookmark automatically submits a bookmark add this:
        //store.addingBookmark = true
      } else {
        store.addingBookmark = true
        renderNewBookmark()
      }
    })
}


const getBookmarkIdFromElement = function (item) {
    return $(item)
      .closest('.js-bookmark-form')
      .data('item-id')
}

const handleDeleteBtn = function () {
    $('.js-bookmark-list').on('click', '.js-delete-bookmark-btn', event => {
      const id = getBookmarkIdFromElement(event.currentTarget)
  
      api.deleteBookmark(id)
        .then(() => {
          store.findAndDelete(id)
          render()
        })
        .catch((error) => {
          console.log(error)
          store.setError(error.message)
          renderError()
        })
    })
    $('.js-new-bookmark-div').on('click', '.js-delete-bookmark-btn', function(e) {
      $('.js-new-bookmark-div').empty()
      store.addingBookmark = false
      store.newTitle = null
      store.newUrl = null
      store.newDesc = null
      store.newRating = null
    })
}

const handleExpandBtn = function() {
  $('.js-bookmark-list').on('click', '.js-expand-bookmark-toggle', function(e) {
    e.preventDefault()
    const id = getBookmarkIdFromElement(e.currentTarget)
    const old = store.findById(id).expanded
    store.findAndUpdate(id, { expanded: !old})
    render()
  })
}
//is there one function for the creation and editing of bookmarks?...
//in any case should split this up to allow live updating
//maybe get rid of unique new bookmark form in favor of continuously editable forms?
const handleEditBookmark = function () {
  //realtime!
    //title entry
    $('.js-bookmark-list').on('input', '.js-bookmark-entry', event => {
      console.log('editing title')
      event.preventDefault()
      const id = getBookmarkIdFromElement(event.currentTarget)
      const linkTitle = $(event.currentTarget).val()
  
      api.updateBookmark(id, { title: linkTitle })
        .then(() => {
          store.findAndUpdate(id, { title: linkTitle })
        })
        .catch((error) => {
          console.log(error)
          store.setError(error.message)
          renderError()
        })
    })
    //url
    $('.js-bookmark-list').on('input', '.js-bookmark-url', event => {
      console.log('editing url')
      const id = getBookmarkIdFromElement(event.currentTarget)
      const linkUrl = $(event.currentTarget).val()
      console.log(id, linkUrl)
      api.updateBookmark(id, { url: linkUrl })
        .then(() => {
          store.findAndUpdate(id, { url: linkUrl })
        })
        .catch((error) => {
          console.log(error)
          store.setError(error.message)
          renderError()
        })
    })
    //description
    $('.js-bookmark-list').on('input', '.js-bookmark-description', event => {
      console.log('editing desc')
      event.preventDefault()
      const id = getBookmarkIdFromElement(event.currentTarget)
      const linkDesc = $(event.currentTarget).val()
      console.log(linkDesc)
      api.updateBookmark(id, { desc : linkDesc })
        .then(() => {
          store.findAndUpdate(id, { desc : linkDesc })
        })
        .catch((error) => {
          console.log(error)
          store.setError(error.message)
          renderError()
        })
    })
}


//add functions for the collapse / expand toggle, inspired by handleItemCheck/toggleFilter

const bindEventListeners = function () {

  //handle UI of header
    
    handleAddBookmarkBtn() 
    handleHeaderInputs()
    
    handleHeaderSelect()

  //handle UI of new bookmark
    handleStars()
    handleNewBookmark()


  //handle UI of old bookmarks
    handleEditBookmark()
    handleExpandBtn()

    handleDeleteBtn()
    
    handleCloseError()
  };
  
  // This object contains the only exposed methods from this module:
  export default {
    render,
    bindEventListeners
  };