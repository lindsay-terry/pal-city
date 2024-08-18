# pal-city
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
An API for a social network application for pals to connect and react to each other's posts using Express.js for routing, a MongoDB database, and the Mongoose ODM.  Pal city lays the framework for a functional social media application with working routes to manage users, thoughts, reactions, and friend connections.  


## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Credits](#credits)
* [Tests](#tests)
* [Questions](#questions)

## Installation
Installation instructions for application:
`npm i` 

## Usage

Click [here](https://drive.google.com/file/d/1S0tsVSP99TwTxRggtI6vI3RBVfitAA5q/view?usp=sharing) to see a video walkthrough of application.

To use pal-city, clone the repository and run `npm i` to install all dependencies. Ensure MongoDB is installed and run the script depicted in the package.json file `npm run seed` to connect to your local MongoDB database and create the necessary collections for the application.  Start the application using `npm start` and navigate to your favorite API testing environment (we've used Insomnia for the demonstration).

Interact with the application using the following endpoints:

* `/api/users` **GET** to query all users and **POST** to create a new user.

* `/api/users/:userId` **GET** to query a single user, **PUT** to update a user, and **DELETE** to delete a user.

* `/api/users/:userId/friends/:friendId` **POST** to add a friend and add the friend ID to the friends array on the user and **DELETE** to delete a friend and remove the ID from the friends array.

* `/api/thoughts` **GET** to query all thoughts and **POST** to create a new thought, to be added to the user's thoughts array.

* `/api/thoughts/:thoughtId` **GET** to query a single thought, **PUT** to update a thought, and **DELETE** to delete a single thought and remove it from the user's associated thoughts.

* `/api/thoughts/:thoughtId/reactions` **POST** to create a new reaction to be applied to a specific thought.

* `/api/thoughts/:thoughtId/reactions/:reactionId` **DELETE** to delete a specific reaction and remove it from the associated thought.

![Screenshot of application in use in Insomnia](/assets/images/palcity.png)
![Screenshot of application in use in Insomnia](/assets/images/palcity2.png)

## License
This project is operating under the MIT license.  For more detailed information, please click [here](https://opensource.org/license/mit).

## Contributing
See contact information and contact me to contribute

## Credits
N/A

## Tests
To run tests for the application:
N/A

## Questions
Contact me for any questions regarding this project:

GitHub: [lindsay-terry](https://github.com/lindsay-terry)

Email: lindsaytee66@gmail.com
