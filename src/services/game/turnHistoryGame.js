import { ValidationError } from "../../errors/customError.js";
import container from "../../config/container.js";
import {HistoryDto} from "../../models/dto/HistoryDto.js"

const historyRepository = container.resolve('historyRepository');

const showHistoryGame =  async (gameId) => {
    const history = await historyRepository.findAllByClause({gameId});
    return formatRegister(history);
};

const formatRegister = (historyRecords) => {
    const formattedHistory = historyRecords.map(record => {
        const historyDto = new HistoryDto(record);
        return historyDto.getHistory();
    });
    return formattedHistory;
};

const createHistoryService = async (historyData) => {
    return await historyRepository.create(historyData);
};

const getHistoryService = async () => {
    return await historyRepository.findAll();
};

const getHistoryByIdService = async (id) => {
    return await historyRepository.findById(id);
};

export default {
    showHistoryGame,
    createHistoryService,
    getHistoryByIdService,
    getHistoryService
}