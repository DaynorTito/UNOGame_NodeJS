import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Game from "./game.js";
import Card from "./card.js";

const DiscardCard = sequelize.define('DiscardCard', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    gameId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Game,
            key: 'id'
        }
    },
    cardId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Card,
            key: 'id'
        }
    },
    state: {
        type: DataTypes.ENUM('discard', 'unused'),
        allowNull: false,
        defaultValue: 'unused'
    }
}, {
    timestamps: true
});

export default DiscardCard;
