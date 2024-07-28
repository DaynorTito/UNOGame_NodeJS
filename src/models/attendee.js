import { DataTypes, UUIDV4} from "sequelize";
import sequelize from "../config/database.js";
import UserPlayer from "./userPlayer.js";
import Game from "./game.js";


const Attendee = sequelize.define('Attendee', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    userId: {
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
    status: {
        type: DataTypes.STRING,
        defaultValue: 'on hold'
    }

}, {
    timestamps: true
});

export default Attendee;