import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../config/database.js";
import Game from "./game.js";
import UserPlayer from "./userPlayer.js";

const Score = sequelize.define('Score', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    playerId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: UserPlayer,
            key: 'id'
        }
    },
    gameId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Game,
            key: 'id'
        }
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, { 
    timestamps: true
});

export default Score;