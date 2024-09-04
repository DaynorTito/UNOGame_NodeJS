import { ValidationError, AlreadyExistsError, UnauthorizedError } from "../../../errors/customError.js";
import container from "../../../config/container.js";
import attendeeValidationService from "../../validations/attendeeValidationService.js";

const attendeeRepository = container.resolve('attendeeRepository');
const userPlayerRepository = container.resolve('userPlayerRepository');

describe('Validation Functions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('validateJoinGame', () => {
        it('should throw AlreadyExistsError if user is already an attendee', async () => {
            const mockGame = { id: 'game1', maxPlayers: 5 };
            const mockUser = { id: 'user1' };

            jest.spyOn(attendeeRepository, 'findOneByClause').mockResolvedValue(true); // Simula que el usuario ya está unido

            await expect(attendeeValidationService.validateJoinGame(mockGame, mockUser)).rejects.toThrow(AlreadyExistsError);
        });

        it('should throw ValidationError if game is full', async () => {
            const mockGame = { id: 'game1', maxPlayers: 2 };
            const mockUser = { id: 'user2' };

            jest.spyOn(attendeeRepository, 'findOneByClause').mockResolvedValue(null);
            jest.spyOn(attendeeRepository, 'count').mockResolvedValue(2);

            await expect(attendeeValidationService.validateJoinGame(mockGame, mockUser)).rejects.toThrow(ValidationError);
        });

        it('should not throw any error if user can join the game', async () => {
            const mockGame = { id: 'game1', maxPlayers: 5 };
            const mockUser = { id: 'user3' };

            jest.spyOn(attendeeRepository, 'findOneByClause').mockResolvedValue(null);
            jest.spyOn(attendeeRepository, 'count').mockResolvedValue(3);

            await expect(attendeeValidationService.validateJoinGame(mockGame, mockUser)).resolves.not.toThrow();
        });
    });

    describe('validateUserExist', () => {
        it('should throw ValidationError if user does not exist', async () => {
            const mockUserId = 'user4';

            jest.spyOn(userPlayerRepository, 'findById').mockResolvedValue(null);

            await expect(attendeeValidationService.validateUserExist(mockUserId)).rejects.toThrow(ValidationError);
        });

        it('should not throw any error if user exists', async () => {
            const mockUserId = 'user5';
            const mockUser = { id: mockUserId, username: 'User5' };

            jest.spyOn(userPlayerRepository, 'findById').mockResolvedValue(mockUser);

            await expect(attendeeValidationService.validateUserExist(mockUserId)).resolves.not.toThrow();
        });
    });

    describe('validateUserName', () => {
        it('should throw UnauthorizedError if username does not match', () => {
            const mockUser = { username: 'User6' };
            const mockPlayer = 'User7';

            expect(() => attendeeValidationService.validateUserName(mockUser, mockPlayer)).toThrow(UnauthorizedError);
        });

        it('should not throw any error if username matches', () => {
            const mockUser = { username: 'User8' };
            const mockPlayer = 'User8';

            expect(() => attendeeValidationService.validateUserName(mockUser, mockPlayer)).not.toThrow();
        });
    });
});
