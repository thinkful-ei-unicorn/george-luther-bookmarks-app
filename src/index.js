import $ from 'jquery';

import cuid from 'cuid';
import moment from 'moment';

import 'normalize.css';
import './index.css';

import api from './api';
import store from './store';
import bookmarks from './bookmarks';

function main() {
  api.getBookmarks()
    
    .then((links) => {
      console.log(links)
      links.forEach((link) => store.addLink(link));
        //consider localStorage.json intermediary for more client-side permanence... 
        //since api doesn't have a value for expanded, can't direct copy, would need to use expanded, created, and edited as separate localStorage data?
        //and change addLink to not replace on load aka ignore data?
        //alternatively, could store objects/arrays as a string within a key value pair of a bookmark that is always filtered from user view and parse them for use!
      bookmarks.render();
    });


  bookmarks.bindEventListeners();
  bookmarks.render();
};

$(main);