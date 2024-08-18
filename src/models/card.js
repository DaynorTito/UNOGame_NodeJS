import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../config/database.js";

const Card = sequelize.define('Card', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    },
    point: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    timestamps: true
});

export default Card;