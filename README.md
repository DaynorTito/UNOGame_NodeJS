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
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── index.js
├── .env
├── .gitignore
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
   - Endpoint: `POST /auth/login
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
   - Endpoint: `POST /auth/logout`.
   - Description: Logout the user (token invalidation must be handled by the client).

If you do not have a registered user, you can register with UserPlayer post endoint, described in the sections below.



### Protected Endpoints

To access protected endpoints, be sure to include the JWT token in the request header as described above. Some examples of protected endpoints are:

- GET /infuser: Gets the username and email an user.
- POST /games: Creates a new game.
- PUT /api/update-settings: Update user settings.

### Error Handling

- If you try to access a protected endpoint without a valid token, you will receive a 401 (Unauthorized) error.
- If the token has expired, you will receive a 403 (Forbidden) error.


   ## Verification requests in Postman:

   ![alt text](/docs/images/postPlayerimg.png)