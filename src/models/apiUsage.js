import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const ApiUsage = sequelize.define ('ApiUsage', {
    endpointAccess: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    requestMethod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    statusCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    responseTimeAvg: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    responseTimeMin: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    responseTimeMax: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    requestCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

export default ApiUsage;