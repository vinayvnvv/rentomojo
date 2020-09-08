# HACKER-NEWS

## Stats
-  This Application is created with a fully productive and also professional and having below features
	- Adding new news feed
	- Add comments to the news
	- You can add nested reply for a each comment to nth level.
	- You can delete the replies and comments only if you are created that.
	- You can delete the news only if you are created that.
	- You ca change logged in users for managing news and comments.
	- you can add new User to the portal.
 - Assignment has been completed in **2 days**
 - Project created without any external **UI framework** and all UI components and styles are created by custom.
 - Created with plain **Javascript** and used **Vue.js** for data-bindings.
 - Used **SASS** pre-processor for css styles. Theme colors & dimensions can be changed with one file ( `app/sass/utils/var.sass` ).
 - Used **JSX** for writing html part inside the javascript code itself.
 - Used **Babel.js** compiler for javascript syntax and JSX transforms.
 - Used **Prettier** for keeping the code clean.
 - Used **NodeJs** for back-end integration.
 - Used **ExpressJS** for rest-api's  and **MongoDB** for database.
 
## Integration Techniques

-  Used Separate collection(table) for saving the comments for news.
-  Used Custom ***Tree parsing*** algorithm to parse the top level comments into tree structure. 

## Product Usage Guide
-  You can add the new news to the database by clicking the menu icon in the Application header.
-  You can change the login user by selecting the user from the drop-down which is available in the App Header menu
-   You can also add the new user in the same section as mentioned above.
-   Logged in user can edit only his comments.
-   Logged in user can delete the news which he created and also delete all the comments related to that news.

## Installation & Run

- Clone to the repository
	- `git clone https://github.com/vinayvnvv/rentomojo.git`
-   Go to the cloned directory
	-  `cd /rentomojo`
- Install packages
	-  `npm install`
- Run the Application
	-  `npm start`
- Once you run the application, server is started in `http://localhost:3000`
