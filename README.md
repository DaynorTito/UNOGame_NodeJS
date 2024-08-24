# UNOGame_NodeJS

This project implements an API for the classic card game UNO, where there are several games, userPlayers and scores. It makes use of NodeJS with Express for the creation of the server and Sequelize with ORM for the interaction with a MySQL database, so that the interaction is efficient.

![alt text](/docs/images/image.png)

This game consists of getting rid of all the cards you start the game with, which are seven, plus those you “draw” during the game. Each time a userPlayer does not have a card of the color or number drawn or a joker, he must take a card from the deck.

## Project Structure

```bash
UNOGame_NodeJS/
├── node_modules/
├── docs/
│   ├── images/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── errors/
│   ├── middlewares/
│   ├── models/
│   │   ├── dto/
│   │   ├── interfaces/
│   │   └── repositories/
│   ├── routes/
│   ├── services/
│   │   ├── authentication/
│   │   ├── cards/
│   │   ├── game/
│   │   └── validations/
│   ├── utils/
│   ├── app.js
│   └── index.js
├── .env
├── .babelrc
├── .gitignore
├── eslint.config.js
├── package-lock.json
├── package.json
└── README.md
```

## Installations

1. **Clone repository:**
   ```bash
   https://github.com/DaynorTito/UNOGame_NodeJS.git
   ```
2. **Install dependences:**
To start the server, make sure you have all the dependencies installed and then run the following command:

   ```bash
    npm install
   ```
3. Verify the environment variables that will be used in the project in the database configuration, in the following file:
   ```bash
    .env
   ```
4. Once the dependencies are installed, you can start the server with the following command:
   ```bash
    node src/index.js
   ```

## Description of Routes

The API is organized into four sets of routes: `cards`, `games`, `userPlayers`, and `scores`. Below is a description of each set of routes and their corresponding HTTP methods:

### Card Routes (`/api/v1/cards`)

* `POST /cards`
   * **Description**: Creates a new card.
   * **Request Body**: JSON object with card details.
* `GET /cards`
   * **Description**: Retrieves a list of all cards.
* `GET /cards/:id`
   * **Description**: Retrieves a specific card by ID.
* `PUT /cards/:id`
   * **Description**: Updates a specific card by ID.
   * **Request Body**: JSON object with new card details.
* `DELETE /cards/:id`
   * **Description**: Deletes a specific card by ID.

### Game Routes (`/api/v1/games`)

* `POST /games`
   * **Description**: Creates a new game, when creating a new game with the name, state, maximum players and rules, it is registered with the id of the player who is creating it.
   * **Request Body**: JSON object with game details.
* `GET /games`
   * **Description**: Retrieves a list of all games.
* `GET /games/:id`
   * **Description**: Retrieves a specific game by ID.
* `PUT /games/:id`
   * **Description**: Updates a specific game by ID.
   * **Request Body**: JSON object with new game details.
* `DELETE /games/:id`
   * **Description**: Deletes a specific game by ID.

### UserPlayer Routes (`/api/v1/userPlayers`)

* `POST /register`
   * **Description**: Creates a new userPlayer.
   * **Request Body**: JSON object with userPlayer details.
* `GET /users`
   * **Description**: Retrieves a list of all userPlayers.
* `GET /users/:id`
   * **Description**: Retrieves a specific userPlayer by ID.
* `GET /infuser`
   * **Description**: Retrieves a specific userPlayer by ID.
* `PUT /users/:id`
   * **Description**: Updates a specific userPlayer by ID.
   * **Request Body**: JSON object with new userPlayer details.
* `DELETE /users/:id`
   * **Description**: Deletes a specific userPlayer by ID.

### Score Routes (`/api/v1/scores`)

* `POST /scores`
   * **Description**: Creates a new score.
   * **Request Body**: JSON object with score details.
* `GET /scores`
   * **Description**: Retrieves a list of all scores.
* `GET /scores/:id`
   * **Description**: Retrieves a specific score by ID.
* `PUT /scores/:id`
   * **Description**: Updates a specific score by ID.
   * **Request Body**: JSON object with new score details.
* `DELETE /scores/:id`
   * **Description**: Deletes a specific score by ID.

### Attendee Routes (`/api/v1/attendees`)

* `POST /attendees`
   * **Description**: Creates a new attendee.
   * **Request Body**: JSON object with attendee details.
* `GET /attendees`
   * **Description**: Retrieves a list of all attendees.
* `GET /attendees/:id`
   * **Description**: Retrieves a specific attendee by ID.
* `PUT /attendees/:id`
   * **Description**: Updates a specific attendee by ID.
   * **Request Body**: JSON object with new attendee details.
* `DELETE /attendees/:id`
   * **Description**: Deletes a specific attendee by ID.


## Authentication

This project uses authentication based on JWT (JSON Web Tokens) to protect certain endpoints. The following describes the authentication process and how to use the protected endpoints.

### Authentication Process

1. **Login**
   - Endpoint: `POST /api/v1//login
   - Description: allows users to log in and obtain a JWT token.
   - Request body:
     ```json
     {
       “username": ‘your_user’,
       “password": ”your_password”
     }
     ```
   - Successful response:
     ```json
     {
       “access_token": ”eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...”
     }
     ```

2. **Token usage**.
   - To access protected endpoints, include the token in the request header:
     ```
     authorization: Bearer your_token_jwt
     ```

3. **Logout**
   - Endpoint: `POST /api/v1/logout`.
   - Description: Logout the user (token invalidation must be handled by the client).

If you do not have a registered user, you can register with UserPlayer post endoint, described in the sections below.

## Main features

To access any endpoint it is necessary to authenticate by logging in, or if not yet registered, register a user.

### Create a new game:
`POST /api/v1/games`
   
   **Description**: Creates a new game, when creating a new game with the name, state, maximum players and rules, it is registered with the id of the player who is creating it.

### Join an existing game:
`POST /api/v1/attendee`
   
   **Description**: The game must be previously created, to join the game just enter the game id in json format. If everything is OK, you should see a message with success

### Start a game when all players are ready:
`POST /api/v1/startGame`
   
   **Description**: The game must be previously created, to join the game just enter the game id in json format. Only the user who created the game can start the game, and also all those who joined the game must be ready. If everything is OK, you should see a message with success.

### Leave a game in progress:
`POST /api/v1/leave`
   
   **Description**: To an usaer can leave a game that is in progress, it must be in active state and the player requesting to leave the game must be part of it, you must send the id of the game you want to leave and in the header the authentication token.

### End a game:
`POST /api/v1/finishGame`

**Description**: To end the active game only the user who created it can end it, and also the game must not be finished yet, the game id is received in the body of the game and the authentication token in the corresponding header.

### Obtain the current status of the game:
`GET /api/v1/statusGame`

**Description**: Any user can get the current status of any game, just by sending the game id in JSON format.

### Obtain the list of players in the game:

`GET /api/v1/playersGame`

**Description**: To obtain the list of players of a game, send in the body of the request the id of the game and the username of all the players who joined the game will be displayed.

### Get the current player to play a card:

`GET /api/v1/nextPlayer`

**Description**: To get the player whose turn it is to play, for this function the players will have a turn order of the way they joined the game and they will take turns from the first one to join, to the last one


### Protected Endpoints

To access protected endpoints, be sure to include the JWT token in the request header as described above. Some examples of protected endpoints are:

- GET /infuser: Gets the username and email an user.
- POST /games: Creates a new game.
- PUT /api/update-settings: Update user settings.

### Error Handling

- If you try to access a protected endpoint without a valid token, you will receive a 401 (Unauthorized) error.
- If the token has expired, you will receive a 403 (Forbidden) error.


   ## Some verification requests in Postman:

   ![alt text](/docs/images/postPlayerimg.png)

![alt text](/docs/images/image-3.png)

![alt text](/docs/images/image-4.png)

![alt text](/docs/images/image-5.png)

   ![alt text](/docs/images/image-2.png)

   ![alt text](/docs/images/image-6.png)

   ![alt text](/docs/images/image-1.png)


## Testing and Code Coverage
In this project, several unit and integration tests have been implemented and executed using Jest. The following is a description of what Jest is, what mocks are, how they were used in the project tests, the type of tests performed, the objective of each test and a summary of the results obtained. 

### What is Jest?
Jest is a JavaScript testing framework. It is used in Node.js applications for its ease of use, speed and advanced features such as code coverage reporting, the ability to perform asynchronous testing and support for mocks and spies.


### What are Mocks?
Mocks are simulated objects that mimic the behavior of real objects. They were used in the project in unit and integration testing to isolate the code being tested, allowing testing to focus on the specific functionality of the unit code without relying on external components such as databases, external services, or any other dependencies.

In this project, mocks were used to simulate dependencies on controllers and services, ensuring that the tests were deterministic and did not depend on external components.

### Execution of the Tests
To run the tests, the following command was used:

```bash
   npm run test
```
The above command runs Jest with the option to generate a code coverage report.

The test report generated can be found in the folder:
```bash
   /coverage
```
### Test Results
All tests were executed correctly, with a total of 124 tests passing successfully.

- **Test Suites:** 13 passed, 13 in total

- **Tests:** 124 passed, 124 in total

- **Snapshots:** 0 in total

- **Execution time:** 3,956 seconds

- **Total coverage:** 87.86 %


![alt text](/docs/images/reportCovCons.png)

### Types of Tests Performed
#### Unit Tests
Unit tests focus on validating the functionality of individual code components, such as functions and methods. In this project, unit tests were performed for drivers, services and error handling.

A __test__ folder was created inside each project folder.

- Objective: To ensure that each unit of code works - correctly in isolation.
- Methods: Mocks were used to simulate external dependencies and ensure that the tests are deterministic. 

## Code Coverage
Code coverage is an indicator of the amount of source code being executed by the tests. The following is a summary of code coverage:

### Total Coverage:
Statements: 87.86%.

Branches: 89.53%

Functions: 94.31% 

Lines: 87.83% 

The project has an overall code coverage of 87.86%, which is a good indicator of the quality and scope of the testing performed. The tests have covered all major areas of the code, ensuring that critical components work as expected.

## Coverage report 

![alt text](/docs/images/reportCoverageHtml.png)


## SOLID Principles Application

This project adheres to SOLID principles to ensure a robust, maintainable, and extensible codebase. Here's how each principle is applied:

### Single Responsibility Principle (SRP)

Each module has a single responsibility. For example, we've separated game operations, state management, and validations:

```javascript
   // gameService.js - Handles basic CRUD operations
   export const createGameService = async (gameData, user) => {
      // ...
   };

   // gameStateService.js - Manages game state and everything concerning the status of an item
   export const startGame = async (id, updateData, userId) => {
      // ...
   };

   // gameValidationService.js - Handles game-specific validations before performing the game logic operations
   export const validateGameStart = async (game, userId) => {
      // ...
   };
```

### Open/Closed Principle (OCP)
The code is open for extension but closed for modification. We use interfaces and dependency injection to allow for easy extension:
```javascript
   // IGameRepository.js
   export interface IGameRepository {
      async create(entity) {
         throw new Error("Method 'create()' must be implemented.");
      }

      async findById(id) {
         throw new Error("Method 'findById()' must be implemented.");
      }

      async findAll() {
         throw new Error("Method 'findAll()' must be implemented.");
      }
   }

   // gameRepository.js
   export class GameRepository implements IGameRepository {
      // ...
   }
```
All of this was also applied to the other entities and models that are handled in the game.


## Liskov Substitution Principle (LSP)
Subclasses can be substituted for their base classes. All our repositories implement the same interface, to comply with this principle we make use of Awilix with the help of a file called container.js as follows:

```javascript
// In the container configuration
   container.register({
      gameRepository: asClass(GameRepository).singleton(),
      attendeeRepository: asClass(AttendeeRepository).singleton(),
      // ...
   });
```


## Interface Segregation Principle (ISP)

We apply the Interface Segregation Principle by creating smaller, more focused objects that define the structure of our repositories and services. This allows us to depend on smaller, more specific contracts. For example:

```javascript
// attendeeRepository.js
const attendeeRepositoryMethods = {
    findByGameId: async (gameId) => { /* ... */ },
    updateStatus: async (attendeeId, status) => { /* ... */ }
};

// gameRepository.js
const gameRepositoryMethods = {
    create: async (gameData) => { /* ... */ },
    findById: async (id) => { /* ... */ },
    updateStatus: async (gameId, status) => { /* ... */ }
};

// We can then use these method objects to create our repositories
const createAttendeeRepository = (db) => ({
    ...attendeeRepositoryMethods,
    // db-specific implementations
});
```
By defining these method objects separately, we ensure that each service only depends on the methods it needs. This reduces coupling and makes the system more flexible and easier to maintain.
We also create specific service objects that define only the methods needed for particular operations:

```javascript
// gameStateService.js
const gameStateServiceMethods = {
    startGame: async (gameId, userId) => { /* ... */ },
    endGame: async (gameId, userId) => { /* ... */ },
    getNextTurn: async (gameId) => { /* ... */ }
};

// gameValidationService.js
const gameValidationServiceMethods = {
    validateGameStart: async (game, userId) => { /* ... */ },
    validateGameEnd: async (game, userId) => { /* ... */ }
};

// We can then create our services using these method objects
const createGameStateService = (dependencies) => ({
    ...gameStateServiceMethods,
    // implementation using dependencies
});
```
This approach allows us to have focused "interfaces" that cater to specific needs of different parts of our application, adhering to the Interface Segregation Principle even in a dynamically-typed language like JavaScript.


## Dependency Inversion Principle (DIP)
We depend on abstractions, not concretions. This is achieved through dependency injection using Awilix:
```javascript
   import { createContainer, asClass, asFunction } from 'awilix';

   const container = createContainer();

   container.register({
      gameService: asFunction(gameService),
      gameRepository: asClass(GameRepository).singleton(),
      // ...
   });

   export default container;
```
In our services, we resolve dependencies from the container:

```javascript
   import container from "../config/container.js";
   const gameRepository = container.resolve('gameRepository');
```


By applying these principles, we've created a flexible architecture that's easy to extend and maintain. New game rules, repositories, or services can be added with minimal changes to existing code.


## Logger with Winston

This project uses [Winston](https://github.com/winstonjs/winston) for logging to provide comprehensive and structured logs. Winston is configured to handle different log levels, format logs with timestamps, and include request-specific information such as UUIDs for better traceability.

### Usage
Adding Request IDs
Each incoming HTTP request is assigned a unique RequestId using a middleware that generates a UUID and attaches it to the request object. This UUID is then passed to Winston to ensure that all logs associated with that request are tagged consistently.


### Logging Examples
- **Info Logs:** General information about requests, responses, or system behavior.

```javascript
req.logger.info('User logged in successfully', { userId: req.user.id });
```
- **Error Logs:** When an error occurs, the stack trace is automatically included in the log.

```javascript
req.logger.error('Failed to process payment', { error: err.message });
```

### Log Files
The logs are saved in two files:

- **error.log:** Stores only error logs.
- **combined.log:** Stores all logs (info, errors, etc.).
- **exceptions.log:** Stores logs of unhandled exceptions and critical errors. This file is crucial for tracking down bugs and issues that lead to application crashes or unexpected behaviors.

These files can be found in the root directory of the project.
