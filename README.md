# EnterpriseWeb_Assignment1
Basic Point of Interest db using Mongo


in the assignment there are two types of people,
1. users: these are the general public
2. admin: these can edit and delete points of interest created by users.

In the assignment, there are two versions on the menu, depending on wheter you are a user or admin.
when logged in as an admin person , 
#can sign up up another admin person.
# in the in the view points, you have the option of edit and delete.
# if logged in as a user, the only option is view on the view points tab.
# userlistings menu item allow you to edit the settings of any user and delete any user
# settings only shows the curent logged in user
#gallery is a cloudinary items, which works but at the time of this you need to manually enter the credentials
stored in the .env file
#add Point of interest, allows user or admin to add a point of interest
# at this momnt in time i cannot get the return url from the cloudinary upload as it throws an error.
# i used the handlebars helpers to decide on what menu to display, at this moment in time i cannot get it too work properly
# however in the partial categoryList, the helperclass works, and it displays the view option on each item for a user
# and for a admin, it displays the edit and delete otions 

outstanding issue mainmenu helper not completed.
heroku site has issues and is not avaialble.

