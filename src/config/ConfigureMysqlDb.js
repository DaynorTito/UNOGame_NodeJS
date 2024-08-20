import { UserMySqlRepository } from "../models/UserMySqlRepository.js";
import { ConfigureDatabase } from "./ConfigureDatabase.js";

export class ConfigureMysqlDb extends ConfigureDatabase{
	
    initializeRepositories () {
        return {
            userRepository: new UserMySqlRepository()
        }
    }
	
}