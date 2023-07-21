# Video Game Information Manager

This app is an app that allows you to add, edit, delete, & read game information from your personal database.
The utilities used to make this all work together is React, a postgres docker image running as a container, an express server, & Google Chrome Browser.

# Setup
## To get get started you'll need to...
  1. Open a terminal & clone this repo into a folder of your choosing
  2. Run a docker container of a postgres image with default configurations as shown in the Galvanize [Connecting to PostgreSQL lesson](https://learn-2.galvanize.com/cohorts/3593/blocks/655/content_files/lessons/connecting_to_postgres.md)
    * Here's the specific commands needed to run...
       1. mkdir -p $HOME/docker/volumes/**inventory**
       2. docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/**inventory**:/var/lib/postgresql/data postgres

  3. Run the command "npm install" to install all the node modules required for the app
  4. Now we need to setup the database with information. From the root folder you cloned into...
     1. Run "( cd ./src/backend && npx knex migrate:latest )"
     2. Run "( cd ./src/backend && npx knex seed:run )"
    
  5. Next, you'll need to open a 2nd terminal so that the server can run. I recommend using a 2nd terminal in VS Code...
     1. If running from the root folder enter the command "( cd ./src/backend && npx nodemon server.js)"
  6. Lastly, from your root folder run "npm start" & your good to go!

# Usage
  - Usage is pretty self-explanatory upon loading the page.
  - Game information will be displayed to you if you ran the migrations, seed files, & server correctly.
  - From the main page all you can do w/o an account is view the game information displayed.
  - Upon creating an account, however you can see more options & functions afforded to you such as creating a new game, editing game information, etc.
.
  - I've went ahead & attached my Wireframe during initial planning & construction of this app.
Play around & have fun with the project!
.

![Initial Wireframe](https://github.com/AG992/Inventory-Manager-Project/assets/131806332/929805cc-213e-444d-80ae-f479ddb62fce)
