import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Game = sequelize.define('Game', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    maxPlayers: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true
});

export default Game;
