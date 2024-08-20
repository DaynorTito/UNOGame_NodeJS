import UserPlayer from "./userPlayer.js";
import { UserRepository } from "./UserRepository.js";
import { UserDto } from "./UserDto.js"

export class UserMySqlRepository extends UserRepository {

    async getUser (username) {
        return await UserPlayer.findOne({where: { username }});
    }

    async findUserByUserName (username) {
        const userMysql = await UserPlayer.findOne({where: { username }});
        const dtoUser = new UserDto(userMysql);
        return dtoUser.getUser();
    }

    async validateUserPassword (username, password) {
        const isPasswordValid = (await UserPlayer.findOne({where: { username }})).comparePassword(password);
        return isPasswordValid;
    }
}
