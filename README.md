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
   ### Environment Variables Configuration
   Before running the application, you need to configure your environment variables. A .env.template file is provided in the project root, which you can use as a starting point.

   Steps to Configure:
   Copy the template:

   ```bash
      cp .env.template .env
   ```

   Fill in the required variables: Open the newly created .env file and fill in the necessary environment variables:

   ```env
   DB_NAME=        # Your database name
   DB_USER=        # Your database username
   DB_PASSWORD=    # Your database password
   DB_HOST=        # The database host (e.g., localhost)
   DB_DIALECT=     # The database dialect (e.g., postgres, mysql)
   SECRET=         # Your secret key for authentication
   ```

4. Once the dependencies are installed, and configure .env configuration, you can start the server with the following command:
   ```bash
    pnpm run dev
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


### Authentication Validation Monad
This project implements a monadic approach for handling authentication in a Node.js backend application. The AuthenticationMonad class encapsulates the logic for validating user credentials and managing authentication tokens. This approach aims to streamline and modularize authentication operations, improving code readability and maintainability.


### Authentication Monad
The AuthenticationMonad class is a monadic implementation for handling token-based authentication in a Node.js application. It provides a fluent interface for validating and decoding JWT tokens, making the authentication process modular and easy to manage.

### Authentication Monad
The AuthenticationMonad class allows you to handle token validation and decoding in a chainable manner. It uses the flatMap method to enable method chaining and centralized error handling.

#### Methods

- **static of(token):** Initializes a new AuthenticationMonad instance with the provided token.

- **flatMap(fn):** Applies the provided function to the current monad instance, handling errors that may occur.

- **checkTokenExistence():** Checks if the token exists. If not, throws an UnauthorizedError.

- **validateToken():** Validates the token using jwt.verify. If the token is invalid or expired, throws an UnauthorizedError.

- **getResult():** Returns the result of the monadic operations, including the token and its decoded content.


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

### Distribution of Cards to Players:

`POST /api/v1/dealCards`
```json
{
   "gameId": "2ce66004-a1d1-45dc-83ac-eb94a272b995",
   "cardsPerPlayer": 7
}
```

**Description**: Cards are distributed randomly to each of the game attendees, in the body of the request must be added the id of the game and also the number of cards to be distributed to each player, the expected response is status code 200 with the list of all game attendees with the respective cards that were distributed for this method, two recursive functions are used to randomly distribute and randomly assign the races, at the end a card is placed to start the game in the deck, this card is checked to make sure it is not a special card.

### User can get top card dicard pile :

`GET /api/v1/getCardDiscardPile`

```json
{
   "gameId": "2ce66004-a1d1-45dc-83ac-eb94a272b995"
}
```

**Description**: To get the card at the top of the discard pile you can access using the id of the game in the body of the request waiting for a status code 200 and the color and the card at the top.

### Players can play a valid card of their cards:

`POST /api/v1/playCard`

```json
{
    "gameId": "2ce66004-a1d1-45dc-83ac-eb94a272b995",
    "player": "juan123",
    "cardPlayed": "Green 2"
}
```
**Description**: Players after receiving the cards, can play the cards depending on the top card of the pile they have, it must match either in number, color or any special card, for this verification a composition of functions is used. Also a person must wait his turn to play the card and when the result is successful the card he played becomes the card on the top of the pile. You must enter in the body the id of the game, the username you want to play the card and the card you want to play, a status code 200, a success message, the card you played and the username of the next player in turn.

### If a Player Cannot Play a Card, Must Draw a Card from the Deck:

`POST /api/v1/drewCardFromDeck`

```json
{
    "gameId": "f5cff83a-11d8-4cc3-972b-5d27e0bc00d9",
    "player": "juan123"
}
```
**Description**: If a user cannot play any of his cards, what he can do is to draw a card from the card pile, and add it to his deck, once this happens his turn ends, he must enter the game id and username of the player who will draw cards in his respective turn, he should receive a status code 200, showing also a success message.

### Players Must Say "UNO" When Having a Remaining Card:

`POST /api/v1/sayUno`

```json
{
    "gameId": "2ce66004-a1d1-45dc-83ac-eb94a272b995",
    "player": "daynor123",
    "action": "say uno"
}
```
**Description**: When a player has only one card he must say UNO because if he does not say one, other users could challenge the user who did not say one, besides it is necessary to say UNO to win a game when a player runs out of cards, because if he runs out of cards and did not say UNO, he will not be able to win.

### Players May Challenge Others for Not Saying “UNO":

`POST /api/v1/challengePlayer`

```json
{
    "gameId": "2ce66004-a1d1-45dc-83ac-eb94a272b995",
    "challenger": "juan123",
    "challengedPlayer": "daynor123"
}
```
**Description**: If a player forgot to say UNO when he only had one card another user in the game can challenge the player, so that 2 cards are added to the challenged player's deck.


### Player's Turn Ends After Playing or Drawing a Card


**Description**: Each player's turn ends when he successfully plays a card or when he draws a card since he cannot play any of his cards, showing after these plays the username of the next player in turn.


### Ending the Game when running out of Cards:

**Description**: After a card play it is verified if there is a player with 0 score, when a player has 0 score it means that he has run out of cards, it is the indication to indicate that he won the game, then when there is a winner it will show the message inciting the player and also a list of all the scores.

###  Players Can See Current Game Status:

`GET /api/v1/statusGame`

```json
{
   "gameId": "2ce66004-a1d1-45dc-83ac-eb94a272b995"
}
```
**Description**: The players of the game can see the general status of the game including the current user in turn, the card on the top of the card pile, the card decks of each of the attendees to the game, and finally the history of moves made by each user, just enter the game id and you will receive a status code 200 with all of the above.

###  Players Can View Their Own Cards During the Game:

`GET /api/v1/userCards`

```json
{
   "gameId": "2ce66004-a1d1-45dc-83ac-eb94a272b995",
   "player": "daynor123"
}
```
**Description**: Players in a game can see their current cards they have in the deck, with their respective colors and values.

###  Players Can View the Movement History in the Game:

`GET /api/v1/historyGame`

```json
{
    "gameId": "2ce66004-a1d1-45dc-83ac-eb94a272b995"
}
```
**Description**: Players can view the move history of the game with the game id, this history includes moves or draw from the stock if a card is not available to play.

### Players Can View Current Scores of All Players:

`GET /api/v1/scoresPlayers`

```json
{
    "gameId": "2ce66004-a1d1-45dc-83ac-eb94a272b995"
}
```
**Description**: Players can list the scores of each player at any time, these scores are based on the values of the cards they have at the time of the query, the best player will be the one who has a low score, because to win it is necessary to have 0 points, for this query is necessary to enter the id of the game and you will receive a list of all players in the game with their corresponding scores.


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

- **Test Suites:** 1 failed, 25 passed, 26 total

- **Tests:**  1 failed, 150 passed, 151 total

- **Snapshots:** 0 in total

- **Execution time:** 3.676 seconds

- **Total coverage:** 76.71 %




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
Statements: 76.71%.

Branches: 44.44%

Functions: 82.51% 

Lines: 77.77% 

The project has an overall code coverage of 76.71%, which is a good indicator of the quality and scope of the testing performed. The tests have covered all major areas of the code, ensuring that critical components work as expected.



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


## Cache


A middleware was implemented where a cache memory is managed.CacheMiddleware is a custom middleware for caching API responses to improve performance on repeated requests. The middleware implements an in-memory cache with configurable settings for cache expiration and maximum size. It uses the Least Recently Used (LRU) policy to manage cache entries, ensuring that the most frequently accessed items are retained while older and less frequently accessed items are removed.

### Features
- Configurable Cache Settings: Customize the cache's maximum size (max) and expiration time (maxAge) via a JSON configuration object.
- LRU Cache Policy: Implements a Least Recently Used (LRU) eviction policy to remove the oldest cache entries when the cache size limit is reached.
- Automatic Cache Expiration: Automatically expires cache entries based on a configurable expiration time (maxAge).
- Manual Cache Implementation: Does not rely on external caching libraries, ensuring a custom, lightweight solution.

### How It Works
- Cache Key Generation: Generates a unique cache key based on the HTTP method and request URL.
- Cache Lookup: Checks if a cached response exists for the generated key. If it exists and hasn't expired, it serves the cached response, resetting the expiration time.
- Cache Expiry Handling: If the cached entry has expired, it is removed from the cache.
- Cache Addition: If no cache exists for the key, the response is stored in the cache with a new expiration time after it is processed.
- LRU Eviction Policy: When the maximum cache size is reached, the least recently used (oldest) entry is removed from the cache.

### Configuration
You can configure the CacheMiddleware using a JSON object to specify the cache settings:

```json
   {
   "max": 50,       // Maximum number of items in the cache
   "maxAge": 30000  // Cache expiration time in milliseconds (e.g., 30 seconds)
   }
```
- max: The maximum number of items allowed in the cache. When this limit is reached, the oldest entries are removed according to the LRU policy.
- maxAge: The duration (in milliseconds) for which a cached entry remains valid. After this period, the entry is considered expired.

1. When a request is made to the API, the middleware checks if a cached response exists for the request.
2. If a valid cached response exists, it is returned immediately, reducing response time.
3. If no cache exists or the cached response has expired, the middleware processes the request as usual, caches the new response and returns it to the client.
4. The middleware effectively manages the size and expiration of the cache by deleting expired entries and enforcing the LRU policy when the cache limit is reached.


## API Documentation with Swagger

Basic endpoint documentation has been implemented for the project. To view the Swagger graphical interface and test the documented endpoints, please navigate to the following URL:

```bash
http://localhost:3000/api-docs/#/
```

## Endpoints

### Authentication

- **POST** `/login` - Authenticate a user and obtain a JWT token.
- **POST** `/logout` - Log out the user.

### Games

- **POST** `/games` - Create a new game.
- **GET** `/games` - Retrieve all games.
- **GET** `/games/:id` - Retrieve a specific game by ID.
- **PUT** `/games/:id` - Update a game by ID.
- **DELETE** `/games/:id` - Delete a game by ID.

### Cards

- **POST** `/cards` - Create a new card.
- **GET** `/cards` - Retrieve all cards.
- **GET** `/cards/:id` - Retrieve a specific card by ID.
- **PUT** `/cards/:id` - Update a card by ID.
- **DELETE** `/cards/:id` - Delete a card by ID.

### Attendees

- **POST** `/attendees` - Add an attendee to a game.
- **POST** `/leave` - Leave an ongoing game.
- **GET** `/attendees` - Retrieve all attendees.
- **GET** `/attendees/:id` - Retrieve a specific attendee by ID.
- **PUT** `/attendees/:id` - Update an attendee by ID.
- **DELETE** `/attendees/:id` - Delete an attendee by ID.

### Discards

- **POST** `/discards` - Create a new discard.
- **GET** `/discards` - Retrieve all discards.
- **GET** `/discards/:id` - Retrieve a specific discard by ID.
- **PUT** `/discards/:id` - Update a discard by ID.
- **DELETE** `/discards/:id` - Delete a discard by ID.

### Scores

- **POST** `/scores` - Create a new score.
- **GET** `/scores` - Retrieve all scores.
- **GET** `/scores/:id` - Retrieve a specific score by ID.
- **PUT** `/scores/:id` - Update a score by ID.
- **DELETE** `/scores/:id` - Delete a score by ID.

### Scores

- **GET** `/requests` - Show all requests done in server.
- **GET** `/response-times` - Show all response time of requests done in server.
- **GET** `/status-codes` - Show all status code retrieve of the server.
- **GET** `/popular-endpoints` - Show the most used enpoint in the server.

