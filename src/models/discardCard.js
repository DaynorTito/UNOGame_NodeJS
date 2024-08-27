import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Game from "./game.js";
import Card from "./card.js";
import UserPlayer from "./userPlayer.js";

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
    userId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: UserPlayer,
            key: 'id'
        }
    },
    top: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    state: {
        type: DataTypes.ENUM('used', 'unused', 'in play'),
        allowNull: false,
        defaultValue: 'unused'
    }
}, {
    timestamps: true
});

export default DiscardCard;
