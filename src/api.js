const BASE_URL = 'https://thinkful-list-api.herokuapp.com/george-luther'

const linksAPIFetch = function (...args) {
    let error;
    return fetch(...args)
      .then(response => {
        if (!response.ok) {
          error = { code: response.status }
          if (!response.headers.get('content-type').includes('json')) {
            error.message = response.statusText
            return Promise.reject(error)
          }
        }
        return response.json()
    })
    .then(data => {
        if (error) {
            error.message = data.message
            return Promise.reject(error)
        }
        return data
    })
}

const getBookmarks = function () {
    return linksAPIFetch(`${BASE_URL}/bookmarks`)
}

const createBookmark = function (title, url, desc, rating) {
    const newBookmark = JSON.stringify({ title, url, desc, rating })
    return linksAPIFetch(`${BASE_URL}/bookmarks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: newBookmark
    })
}

const updateBookmark = function (id, updateData) {
    const newData = JSON.stringify(updateData)
    return linksAPIFetch(`${BASE_URL}/bookmarks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: newData
    })
}

const deleteBookmark = function (id) {
    return linksAPIFetch(`${BASE_URL}/bookmarks/${id}`, {
        method: 'DELETE'
    })
}

export default {
    getBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark
  };