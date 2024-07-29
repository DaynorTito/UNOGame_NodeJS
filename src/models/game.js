import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../config/database.js";
import UserPlayer from "./userPlayer.js";

const Game = sequelize.define('Game', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: UUIDV4,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    },
    maxPlayers: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rules: {
        type: DataTypes.STRING,
        allowNull: true
    },
    currentTurn: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    userCreatedId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: UserPlayer,
            key: 'id'
        }
    }
}, {
    timestamps: true
});

export default Game;
