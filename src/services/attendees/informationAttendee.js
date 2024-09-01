import container from "../../config/container.js";
import { Sequelize } from "sequelize";

const userPlayerRepository = container.resolve('userPlayerRepository');


const getPlayersFromAttendees = async(attendees) => {
    const userIds = attendees.map(att => att.userId);
    const userPlayers = await userPlayerRepository.findAllByClause({id: userIds });
    return userPlayers;
};

const getUserPlayers = async (players) => {
    const usernames = players.map(player => player.username);
    return await userPlayerRepository.findAllByClause({
        username: { [Sequelize.Op.in]: usernames }
    });
};

export default {
    getPlayersFromAttendees,
    getUserPlayers
}
