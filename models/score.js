import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Player from "./player";
import Game from "./game";

const Score = sequelize.define('Score', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    playerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Player,
            key: 'id'
        }
    },
    gameId: {
        type: DataTypes.INTEGER,
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