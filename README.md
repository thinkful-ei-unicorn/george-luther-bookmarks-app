# WORMFLARE - bookmark and organize your loved and loathed websites

[Click here to view the live app](https://thinkful-ei-unicorn.github.io/george-luther-bookmarks-app/)

## User Stories

* User can add a bookmark to the list by pressing the plus sign, 
thus adding a new blank bookmark... unless one already exists and is not filled properly.
Then they'll get an error message. 
 *My goal with this version was to streamline the process by minimizing necessary user actions and page clutter
 by allowing all bookmarks including new ones to be manipulated in real-time for immediate updating and feedback.
 **This will have to change because there is currently no submit button, reducing intuitiveness and successful error feedback.
 I will probably just sort of start over from scratch and stick strictly to the requirements. 
 **Eventually I'll finish this version so that it updates on input or change and will do one of two things:
    1. Attempt to save or reject anytime you try to manipulate the DOM outside of the new bookmark.
    2. Not exist and assimilate & function just like the other bookmarks.
 **Instead of labels, I intentionally made placeholders very obvious and added titles/tooltips for further explanation.
  ** This didn't work well for a11y purposes. Perhaps I can add labels but with "display: none"?
 
* Bookmarks contain:
  * title
  * url link
  * way to open link in a new tab
  * description (optional)
  * rating (optional)
* The app automatically renders existing bookmarks, grabbing them from the Thinkful Bookmarks API
  * The bookmarks initially appear in a condensed view, although this state could also be stored.
* Users can expand bookmarks to show the url, link, description
* Bookmarks have a big red X for removing bookmarks. This needs to change because of a11y.
* When there is no title in a bookmark an error is displayed
* When the url does not contain http:// it is added for the user. This needs to change. 
  * In the fancy version it could check for www and .com and test for a working url...
  * If I get rid of the formatter function it will diplay an error, this is what I will do.

* Rather than a dropdown for filtering ratings, there are input fields which allow users to set min and max
  * just change this to a simple dropdown.
  
* There is a dropdown which allows users to sort the bookmarks based on various critera
  *highest rating
  *lowest rating
  *recently created
  *recently edited
  *name (alphabeticaly
  * It would be good to set some of these up as toggles, but this should be removed for the next submission.
  
 * All bookmark information can be edited and will return errors for improper entry.
  * The http formatter needs to change
  
  
  ALL INPUTS NEED LABELS w For attribute!!!!
  ERROR FEEDBACK IS DOES NOT FIT OFFICIAL GUIDELINES
  REVIEW AND CHANGE HOW GITHUB PAGES SHOULD BE SET UP
  
  
