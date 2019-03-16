EnterpriseWeb_Assignment1



Basic Point of Interest db using Mongo

in the assignment there are two types of people,
1. users: these are the general public
2. admin: these can edit and delete points of interest created by users.

In the assignment, there are two versions on the menu, depending on wether you are a user or admin.
when logged in as an admin person , 
 - you can sign up up another admin person.
 - in the in the view points, you have the option of edit and delete.
 - userlistings menu item allow you to edit the settings of any user and delete any user

if logged in as a user, the only option is view on the view points tab.
settings only shows the curent logged in user
gallery is a cloudinary items, which works but at the time of this you need to manually enter the credentials
stored in the .env file
add Point of interest, allows user or admin to add a point of interest
at this momnt in time i cannot get the return url from the cloudinary upload as it throws an error.

I used the handlebars helpers to decide on what menu to display, at this moment in time i cannot get it too work properly
however in the partial categoryList, the helperclass works, and it displays the view option on each item for a user
and for a admin, it displays the edit and delete otions 

outstanding issue mainmenu helper not completed.
heroku site has issues and is not avaialble.

Post Assignement date, 
corrected heroku redirect issues by correcting  Auth: in the various methods in the Models.
The model defaults to auth=true, so auth can be commented out and specifically assigned false where required.
Auth:true is required when in the method the logged in person id is gleamed from the auth cookie.

Needed to amend the Atlas db reference in the .env file.
Deleted cluster and added a new one.

Added Procfile

In index file changed server number to 3050 from 3000, just to see a change in console output. 

Accounts Model.

// 13.03.2019 error const ObjectId = require('mongodb').ObjectId;
const ObjectId = require('mongoose').Types.ObjectId;









