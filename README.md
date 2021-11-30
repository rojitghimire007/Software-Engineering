# PipeLine Project
  This project is a prototype that deals with pipeline inventory controls and item tracking. The main intension of this project is to digitalize the paper-based system to ensure data validity and easier navigation.

## Technologies Used:
  - React.js
  - Node.js
  - Express.js
  - React Beautiful DnD
  - PostgreSQL (RDS instance)
  - AWS EC2

## Prerequisites
 - Node.js v12.x or later
 - npm v5.x or later
 - git v2.14.1 or later
 - AWS

## Developer Guide:
  ### Running Frontend (Development Server):
  - Form root of the project, `cd` into `frontend` directory with `cd frontend`
  - Run `npm install` to install necessary modules
  - Once all the necessary modules are installed, you can do `npm start` to get the frontend running
  - Frontend runs in port 3000 by default
  
### Bulding a react frontend (For deployment):
  - Once you have your development server running, you can issue `npm build` to initiate the build process.
  - After the process is completed, you will have a build folder with an `index.js`, which will be the entry point.
  
### Running Backend:
  - From root of the project, `cd` into `server` directory with `cd server`
  - Run `npm install` to install necessary modules
  - Once the module instalization is done, you can issue a `node index.js`
  - Backend runs in port 8081 by default

- Once frontend and backend is running, you can open your browser and test it locally.

## Making code changes
 - Fork and clone the repository git clone https://github.com/rojitghimire007/Software-Engineering
 - Create a branch git checkout -b "<your_branch_name>"
 - Make your changes in that branch
 - Test your changes
 - Add and commit your changes with git add . && git commit -m "<your_commit_message>"
 - Then push the changes into your branch git push origin branch_name
 - Now you can create a PR using that branch in our repository.

  