import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Game from "./game";

const Card = sequelize.define('Card', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Game,
            key: 'id'
        }
    }

}, {
    timestamps: true
});

export default Card;