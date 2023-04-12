[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-f059dc9a6f8d3a56e377f745f24479a46679e63a5d9fe6f495e02850cd0d8118.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7035222&assignment_repo_type=AssignmentRepo)
# HW2 : Guess The Celebrity (Web View)

## Instructions:
 
You will create a **React app that implements the “Guess The Celebrity” game.**

In this assignment, we will implement the web view and the game functionalities.
This homework has no backend (model and controller); you will store all the data in the ***browser's localStorage***.



## Setup:

React uses Node.js as runtime environment. We then need to have Node.JS installed.
 
- Install Node.JS
Download and install the latest Long Term Support (LTS) version of Node.js (currently 16.14.0).
Get it at https://nodejs.org/en/. Verify that Node.JS and npm (node.js package manager) were properly installed by running the commands

`node -v`

`npm -v`

- Create a react app in your project directory with this command `npx create-react-app <NAME_OF_YOUR_APP>`  
(for example: `npx create-react-app myawesomegame`)

This project also uses ESLint-plugin-React, a Node.js module. We will need to have ESLint and ESLint-plugin-React installed.
 
- Install ESLint and ESLint-plugin-React
Follow the instructions at https://www.npmjs.com/package/eslint-plugin-react.
We are using the Airbnb JavaScript Style.

- Configure Eslint with the following command `https://eslint.org/docs/user-guide/getting-started`

You can read more about ESLint at https://eslint.org/docs/user-guide/getting-started.

The starter package contains a .travis.yml file that will run ESLint (on Travis CI) everytime there is a commit to the main branch.

**Make sure you put the folder name of your React application in the commented space of the .travis.yaml file if your package.json is not in the root of your repository!**


## App Specifications:
- The user should enter their name (it will be stored along with their score). Your program should validate this as an alphanumeric string. No password is required
- If it is the first time that the username is entered, then it is stored. If it is a returning user, then their previous best score will be retrieved from the database
- Your app should display a picture of a celebrity one at a time and ask the user to guess/pick the celebrity's name. You should provide 4 potential answers with one being the correct one 
- Your app should contain at least 10 celebrities (10 questions) 
- Your app should pick the celebrity randomly (no hardcoding!) 
- Your app should keep track of the user’s score  
- Your app should display three scores while the user is playing the game: the user's current score, the user’s best score, and the app overall best score with the name of the user 
- - Your webapp should store the user names  and the scores (current, best personal, all time best) in the browser’s ***localStorage***. The scores must be updated correctly!
- Your app should have an option to display the top "k" players (username + scores) sorted by scores descending
- It is okay to keep "k" as a constant. For example, your app could only display the top 10 players 
- Your app should allow the user to delete their information from the app

## Backend Mocking:
- Since we do not have a backend ready during this phase of the software development, we have to mock it
- You will create a JSON file containing all your questions to mock the model
- You will store the users information inside the browser's local storage
- You will write your code as if we had a backend
- You will read the JSON file to retrieve the questions
- You will import the JSON file inside your React app
- Inside your functions, you will use the localstorage anywhere you need to make a request to the controller 


## Design:
- You will realize that your app implements most of the game logic in the view (like most modern apps)
- It is likely that your implementation will not exactly match your design
- Since software development is an iterative process, **you should update your design to match your implementation** 
 

## Validation:
- Your code must be clean, readable, and ***ESLint warning-free*** (Airbnb style)
- Your CSS file must pass validation at http://jigsaw.w3.org/css-validator/validator. 
- In addition, all your code must be clean, readable, properly indented, and well-structured.
- You may not use jQuery in this assignment. Ask the course staff before installing any JavaScript library.
- Feel free to use any CSS library (like bootstrap)

## GitHub:
- You must use a git branching strategy while working on the homework
- See the link below for more details 

## Submission:
- Do **NOT** push `node_modules` to Github/Gradescope or we will have to deduct points off your assignment.
- Do not forget to commit your work to GitHub regularly.
- Only the last push before the due date will be graded.

## Useful links:
- LocalStorage info: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- Git branching strategy: https://github.com/MicrosoftDocs/azure-devops-docs/blob/main/docs/repos/git/git-branching-guidance.md
- Import JSON file: https://reactgo.com/react-load-json-file/

