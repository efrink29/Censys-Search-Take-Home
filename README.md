# Censys Take Home Search Tool

This project was created in React by Ethan Frink as a small demonstration of technical ability.

## Structure 

This app runs with the main 'App' component facilitating the structure of the page. 
When something is changed by a subcomponent the state of the app (in pageState) is changed.
I combined all elements into a single state hook for clarity and performance.

### Components
**SearchBar** - Defines the search bar which is comprised of text input, selectors for: Virtual Hosts/Sort By, and a search button\
**ResultList** - Defines the container for displaying results of a search query inside of a list of 'Result' objects. Also displays error messges.\
**Cursors** - Defines Previous and Next buttons that allow the user to move through pages of info provided by cursors from the search api.

### Running this tool

**Clone Repo** - Clone using gh cli or https\
**install packages** - Run 'npm install' in root of cloned repo to install dependencies and 'node-modules' 

#### Authentication
In order to run this tool you must provide a valid APIID and Secret from a Censys account. \
Update the .env file with your ID and Secret following the example.\
**.env IS NOT SUPPOSED TO BE INCLUDE IN A PUBLIC GITHUB REPO** - I included mine here as an example but its not something I would normally ever do.

#### Running development server

**npm start** - Starts development server at localhost:3000 (see below) 

#### Running tests 

**npm test** - Runs test script defined in App.test.js

#### Build For Production 

**npm run build** - Runs default react build tools to process for production environment




