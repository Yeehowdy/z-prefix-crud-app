# Z Prefix CRUD App

An app with basic CRUD functionality.
This app contains two tables, one for users and one for inventories.

# Setup Procedure

- Clone this repository to your local machine
- CD into the directory and run this command "cd ui && npm i && cd ../api && npm i"
- Spin up a Postgres Docker container on port 5432 and create a database inside it called "crud_app"
- Open ./api/knexfile.js in your text viewer of choice and change the highlighted fields on line 10 to match your corresponding PSQL details
- In one terminal, cd to api and run the command "npm run reset", then run "npm start"
- In another terminal, cd to ui and run the command "npm start"

You should now have the full stack app setup with port 8080 being your Express server and port 3000 being your React app.

# App Usage

Upon landing on "http://localhost:3000/" you will be greeted with a table containing all items and their details.

To create an account, click the "Sign Up" button on the Nav Bar
Upon filling out the requested fields you will be presented with a Modal instructing you to press the button to navigate to the login page

On the login page, you will need to provide the correct username and password.
After successful login, you will be taken to the homepage which will filter the table to only your items.


# CRUD Capability from Site
NOTE: You must be signed in to perform any creations, updates, or deletions

If you wish to see all items, click the corresponding "See all items" button above the table
When viewing all items, you will not be able to update any items. 


If you wish to create an item, click the corresponding "Create Item" button above the table
You will be presented with a template table row which you will need to populate.
Once you are finished populating the new item, press the submit button to POST it to the server and the table will automatically refresh
NOTE: You may not change or assign item ID's as the database does all ID management

If you wish to edit an item, click the corresponding "Edit" button on the right side of the table.
The fields will become editable and you can make any changes you wish.
After you are done making your edits, press the "Submit" button on the right side of the table.
NOTE: You are only capable of updating your own items when the "See my items" filter is active.

If you wish to delete an item, simply press the delete button on the right side of the table
NOTE: You are only capable of deleting your own items when the "See my items" filter is active.
NOTE: Ensure you are not currently creating or updating an item, otherwise the button will be disabled