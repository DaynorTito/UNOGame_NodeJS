# UNOGame_NodeJS

This project implements an API for the classic card game UNO, where there are several games, players and scores. It makes use of NodeJS with Express for the creation of the server and Sequelize with ORM for the interaction with a MySQL database, so that the interaction is efficient.

![alt text](/utils/images/readme/image.png)x

This game consists of getting rid of all the cards you start the game with, which are seven, plus those you “draw” during the game. Each time a player does not have a card of the color or number drawn or a joker, he must take a card from the deck.

## Project Structure

```bash
UNOGame_NodeJS/
├── node_modules/
├── src/
│   ├── config/
│   ├── controllers/
│   │   └── gameController.js
│   ├── middlewares/
│   │   └── 
│   ├── models/
│   │   └── player.js
│   │   └── game.js
│   ├── routes/
│   │   └── gameRoutes.js
│   ├── services/
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

The API is organized into four sets of routes: `cards`, `games`, `players`, and `scores`. Below is a description of each set of routes and their corresponding HTTP methods:

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
   * **Description**: Creates a new game.
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

### Player Routes (`/api/v1/players`)

* `POST /players`
   * **Description**: Creates a new player.
   * **Request Body**: JSON object with player details.
* `GET /players`
   * **Description**: Retrieves a list of all players.
* `GET /players/:id`
   * **Description**: Retrieves a specific player by ID.
* `PUT /players/:id`
   * **Description**: Updates a specific player by ID.
   * **Request Body**: JSON object with new player details.
* `DELETE /players/:id`
   * **Description**: Deletes a specific player by ID.

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

   ## Verification requests in Postman:

   ![alt text](/src/utils/images/readme/postPlayerimg.png)