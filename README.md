# WORMFLARE

Wormflare is a web app for saving and organizing websites you love and loathe.

## [This is the live app!](https://thinkful-ei-unicorn.github.io/george-luther-bookmarks-app/dist/)

## User Stories

- [x] User opens page displaying any existing bookmarks in condensed view.
- [x] User can select minimum rating from select that renders/displays only bookmarks with a rating = or > than the selected rating.
- [x] User can add a new bookmark to the list.
    - [x] Bookmarks can contain title, url, description, and rating
    - [x] Attempts to submit a new bookmark when a API rejects url or description result in an error being displayed.

- [x] User can click on a bookmark to display 'detailed' info.
    - [x] Details include url, link, and description.
- [x] User can remove bookmark with remove button.

    ### Extension Features
    (view extension branch for features in development!)
- [x] User can edit any aspect of existing bookmarks in real-time
    - [x] If API rejects bookmark update of url or description, error is displayed and change is not retained.
- [ ] Additional bookmark data is retained by the API
    - [ ] Creation timestamp
    - [ ] Edit timestamp
    - [ ] Expanded / Condensed
- [x] User can input maximum and minimum rating to display
- [x] User can sort bookmark list
    - [x] by name (alphabetical)
    - [x] by creation time (only per session, not saved in localStorage or API)
    - [x] by edited time (only per session, not saved in localStorage or API)
    - [x] by highest rating
    - [x] by lowest rating

## Technical Specifications

- [x] interactions with the API are achieved through AJAX via fetch.
- [x] scripted manipulation of the DOM is achieved via jQuery.
- [x] architecture is modular.
- [x] global variables are minimal.
- [x] functions are grouped logically.
- [x] event handlers do not directly manipulate the DOM.
- [x] DOM is generally re-rendered rather than directly manipulated.
- [ ] HTML is semantic.
- [x] design is responsive and mobile first.
- [ ] a11y best practices are considered and applied.

- [x] Github Pages link in 'about' area
- [x] Readme file
- [x] All required user stories are implemented
- [x] Separated file modules
- [x] Logical function grouping
- [x] Main tag is empty (three tags, but previously accepted by grader.)
- [x] Store object contains data
- [x] Template generation functions
- [x] Render function conditionally replaces content of page
- [x] Event handlers are single purpose
- [x] Re-render on store update
- [x] All js/jq for DOM in rendering function(s)
- [x] Store properties only within event handlers
- [x] Keyboard accessible
- [x] Use fetch for AJAX
- [x] Use jQuery for Dom access
- [x] Namespacing architecture for scope control
- [x] React-ful / RESTful
- [ ] semantic HTML
- [x] responsive, mobile first
- [ ] A11y practices
- [x] new bookmark in form
- [ ] inputs grouped and labeled
- [ ] feedback for all errors
