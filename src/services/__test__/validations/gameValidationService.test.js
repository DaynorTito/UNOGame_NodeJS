import {
    ValidationError,
    UnauthorizedError
} from "../../../errors/customError.js";
import {
    GameStatus
} from "../../../utils/gameStatus.js";
import {
    UserStatus
} from "../../../utils/userStatus.js";
import container from "../../../config/container.js";
import gameStateService from "../../game/gameStateService.js";
import calculateScores from "../../scores/calculateScores.js";
import {
    validateGameStart,
    validateGameEnd,
    validateMaxPlayers,
    validateGameTurn,
    validateGameInProgress,
    userExistGame,
    validateTurnPlayer,
    validateWinner
} from "../../validations/gameValidationService.js";

const attendeeRepository = container.resolve('attendeeRepository');
const gameRepository = container.resolve('gameRepository');
const userPlayerRepository = container.resolve('userPlayerRepository');

describe('validateGameStart', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should throw UnauthorizedError if the user is not the creator', async () => {
        const mockGame = { userCreatedId: 'user1', status: GameStatus.PENDING };
        const mockUserId = 'user2';

        await expect(validateGameStart(mockGame, mockUserId)).rejects.toThrow(UnauthorizedError);
        await expect(validateGameStart(mockGame, mockUserId)).rejects.toThrow('You cannot start the game');
    });

    it('should throw ValidationError if the game is already in progress', async () => {
        const mockGame = { userCreatedId: 'user1', status: GameStatus.IN_PROGRESS };
        const mockUserId = 'user1';

        await expect(validateGameStart(mockGame, mockUserId)).rejects.toThrow(ValidationError);
        await expect(validateGameStart(mockGame, mockUserId)).rejects.toThrow('Game has already started');
    });

    it('should throw ValidationError if not all attendees are ready', async () => {
        const mockGame = { id: 'game1', userCreatedId: 'user1', status: GameStatus.PENDING };
        const mockUserId = 'user1';

        jest.spyOn(attendeeRepository, 'findAllByClause').mockResolvedValue([{ status: UserStatus.READY }]);
        jest.spyOn(attendeeRepository, 'count').mockResolvedValue(2);

        await expect(validateGameStart(mockGame, mockUserId)).rejects.toThrow(ValidationError);
        await expect(validateGameStart(mockGame, mockUserId)).rejects.toThrow('Not all attendees are ready');
    });

    it('should pass if the game is not started and all attendees are ready', async () => {
        const mockGame = { id: 'game1', userCreatedId: 'user1', status: GameStatus.PENDING };
        const mockUserId = 'user1';

        jest.spyOn(attendeeRepository, 'findAllByClause').mockResolvedValue([{ status: UserStatus.READY }, { status: UserStatus.READY }]);
        jest.spyOn(attendeeRepository, 'count').mockResolvedValue(2);

        await expect(validateGameStart(mockGame, mockUserId)).resolves.not.toThrow();
    });
});

describe('validateMaxPlayers', () => {
    it('should throw ValidationError if max players are less than 2 or more than 10', () => {
        expect(() => validateMaxPlayers(1)).toThrow(ValidationError);
        expect(() => validateMaxPlayers(1)).toThrow("Max players value invalid, you can create a game with 2 to 10 players");
        expect(() => validateMaxPlayers(11)).toThrow(ValidationError);
        expect(() => validateMaxPlayers(11)).toThrow("Max players value invalid, you can create a game with 2 to 10 players");
    });

    it('should not throw any error if max players are between 2 and 10', () => {
        expect(() => validateMaxPlayers(2)).not.toThrow();
        expect(() => validateMaxPlayers(10)).not.toThrow();
    });
});


describe('validateGameInProgress', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should throw ValidationError if the game is not in progress', async () => {
        const mockGame = { id: 'game1', status: GameStatus.PENDING };

        jest.spyOn(gameRepository, 'findById').mockResolvedValue(mockGame);

        await expect(validateGameInProgress('game1')).rejects.toThrow(ValidationError);
        await expect(validateGameInProgress('game1')).rejects.toThrow('Game is not in progress');
    });

    it('should not throw any error if the game is in progress', async () => {
        const mockGame = { id: 'game1', status: GameStatus.IN_PROGRESS };

        jest.spyOn(gameRepository, 'findById').mockResolvedValue(mockGame);

        await expect(validateGameInProgress('game1')).resolves.not.toThrow();
    });
});

describe('userExistGame', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should throw ValidationError if the user does not exist', async () => {
        jest.spyOn(userPlayerRepository, 'findOneByClause').mockResolvedValue(null);

        await expect(userExistGame('username', 'game1')).rejects.toThrow(ValidationError);
        await expect(userExistGame('username', 'game1')).rejects.toThrow('User doesnt exist');
    });

    it('should throw ValidationError if the user is not in the game', async () => {
        const mockUser = { id: 'user1' };

        jest.spyOn(userPlayerRepository, 'findOneByClause').mockResolvedValue(mockUser);
        jest.spyOn(attendeeRepository, 'findOneByClause').mockResolvedValue(null);

        await expect(userExistGame('username', 'game1')).rejects.toThrow(ValidationError);
        await expect(userExistGame('username', 'game1')).rejects.toThrow('User is not in game');
    });

    it('should return the user if they exist and are in the game', async () => {
        const mockUser = { id: 'user1' };
        const mockAttendee = { gameId: 'game1', userId: 'user1' };

        jest.spyOn(userPlayerRepository, 'findOneByClause').mockResolvedValue(mockUser);
        jest.spyOn(attendeeRepository, 'findOneByClause').mockResolvedValue(mockAttendee);

        const result = await userExistGame('username', 'game1');

        expect(result).toEqual(mockUser);
    });
});

describe('validateTurnPlayer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should throw ValidationError if it is not the user\'s turn', async () => {
        const mockGame = { id: 'game1', currentTurn: 'user2' };
        const mockAttendee = { gameId: 'game1', userId: 'user1', turn: 'user1' };

        jest.spyOn(gameRepository, 'findById').mockResolvedValue(mockGame);
        jest.spyOn(attendeeRepository, 'findOneByClause').mockResolvedValue(mockAttendee);

        await expect(validateTurnPlayer('game1', 'user1')).rejects.toThrow(ValidationError);
        await expect(validateTurnPlayer('game1', 'user1')).rejects.toThrow('it is not your turn');
    });

    it('should not throw any error if it is the user\'s turn', async () => {
        const mockGame = { id: 'game1', currentTurn: 'user1' };
        const mockAttendee = { gameId: 'game1', userId: 'user1', turn: 'user1' };

        jest.spyOn(gameRepository, 'findById').mockResolvedValue(mockGame);
        jest.spyOn(attendeeRepository, 'findOneByClause').mockResolvedValue(mockAttendee);

        await expect(validateTurnPlayer('game1', 'user1')).resolves.not.toThrow();
    });
});

