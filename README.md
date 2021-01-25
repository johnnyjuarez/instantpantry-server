# InstantPantry Client

**[InstantPantry](https://instantpantry-client.vercel.app/)**

**Summary**

An Inventory Mangagement System for your pantry!

Simply sign up, create categories, and add items to whichever categories necessary by either filling out the form or scanning the barcode!

This application was built using React, Node, PostgreSQL, and Express.

### Auth Routes

POST /api/auth - Post username and password credentials allow the user to login using username and password, password is compared to stored hashed password in DB, as well as the users username.

### User Routes

POST /api/user - Post username, name, and password to be stored in database to be used for /api/auth route.

### Category Routes

GET /api/category - Returns an array of categories(objects) related to the user_id in the parameter, with key value of category_ids, and category names/titles.

POST /api/category - Post a category requiring a name property linked to a user id given by the params.

DELETE /api/category - Delete a category given the category_id from the params.

### Item Routes

GET /api/items - Returns an array of items(objects) related to teh category_id in the parameter.

POST /api/items - Post an item requiring item_name, and amount, with optional image, and barcode fields, referencing category_id from the parameters.

PATCH /api/items - Patch an item that takes item_name, and amount values.

DELETE /api/items - Delete an item given the item_id from the params.


![](public/images/landingModal.png)
![](public/images/login.png)
![](public/images/signup.png)
![](public/images/dashboard.png)
![](public/images/itemview.png)
![](public/images/addcategory.png)
![](public/images/additemform.png)
![](public/images/barcodeadditem.png)
![](public/images/barcodeadditemform.png)
