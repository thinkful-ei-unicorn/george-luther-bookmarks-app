//consider api vs non-api keys/values
//consider use of localStorage json
import moment from 'moment';

const links = []

let error = null

let searchText = null
let maxRating = 5
let minRating = 0
let sortBy = 'byCreated'

let addingBookmark = false
let newTitle = null
let newUrl = null
let newDesc = null
let newRating = null

const findById = function (id) {
    return this.links.find(currentLink => currentLink.id === id)
}

const addLink = function (link) {
    link.expanded = false
    link.createdAt = moment().valueOf()
    link.editedAt = moment().valueOf()
    this.links.push(link)
}

const findAndDelete = function (id) {
    this.links = this.links.filter(currentLink => currentLink.id !== id)
}

const findAndUpdate = function (id, newInfo) {
    const currentLink = this.findById(id)
    currentLink.editedAt = moment().valueOf()
    Object.assign(currentLink, newInfo)
}


const setError = function (error) {
    this.error = error;
}

export default {
    links,
    error,

    searchText,
    maxRating,
    minRating,
    sortBy,

    addingBookmark,
    newTitle,
    newUrl,
    newDesc,
    newRating,

    findById,
    addLink,
    findAndDelete,
    findAndUpdate,

    setError
  }