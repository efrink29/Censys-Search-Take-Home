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

In order to run this tool you must provide a valid APIID and Secret from a Censys account. These are stored in the .env file for security. 
**.env IS NOT SUPPOSED TO BE INCLUDE IN A PUBLIC GITHUB REPO** - I included mine here as an example but its not something I would normally ever do. The secret key listed will be reset so if you are having authentication issues try using your own keys locally or email me with any concerns efrink29@gmail.com.\

**Clone Repo** - Clone using gh cli or https\
**install packages** - Run 'npm install' in root of cloned repo to install dependencies and 'node-modules' \
**npm run start** - Starts development server at localhost:3000 (see below) 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
**TESTS ARE NOT COMPREHENSIVE** - The tests I have here only cover surface level functionality and serve as a foundation for more comprehensive tests to be added.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\


