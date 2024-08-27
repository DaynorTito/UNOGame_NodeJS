import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Game from "./game.js";

const TurnHistory = sequelize.define('TurnHistory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    player: {
        type: DataTypes.STRING,
        allowNull: false
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gameId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Game,
            key: 'id'
        }
    }
}, {
    timestamps: true
});

export default TurnHistory;
