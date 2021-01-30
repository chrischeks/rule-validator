# Project Title

RULE VALIDATION

---

## Requirements

For development, you will only need Node.js and a node global package.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v14.15.4

    $ npm --version
    6.14.10

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

## Install

    $ git clone https://github.com/chrischeks/rule-validator.git
    $ cd rule-validator
    $ npm install

## Configure app

Create a .env file in the root directory and set the followings:

    PORT=4000
    NAME=Your name
    GITHUB=@your github handle
    EMAIL=your email
    MOBILE=your mobile
    TWITTER=@your twitter handle

## Running the project

    $ npm run start:dev

## Simple build for production

    $ npm start
