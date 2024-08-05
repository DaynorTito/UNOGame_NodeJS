import { createGameService,
    getGamesService,
    getGameByIdService,
    updateGameService,
    startGameService,
    deleteGameService,
    endGameService,
    getPlayersService,
    getNextTurnService
} from "../gameService.js";
import Game from '../../models/game.js';
import Attendee from "../../models/attendee.js";
import { GameStatus } from "../../utils/gameStatus.js";
import { UserStatus } from "../../utils/userStatus.js";
import UserPlayer from "../../models/userPlayer.js";
import {getUserNextTurn, getNroPlayersJoined} from "../attendeeService.js"

jest.mock("../../models/game.js");
jest.mock("../../models/attendee.js")
jest.mock("../../models/userPlayer.js")



beforeEach(() => {
    jest.clearAllMocks();
});

test('createGameService should create a new game with the user who created it', async () => {
    const mockGameData = { name: 'Game 1', userCreatedId: 1 };
    const mockUser = { id: 1 };
    Game.create.mockResolvedValue(mockGameData);
    const result = await createGameService(mockGameData, mockUser)
    expect(Game.create).toHaveBeenCalledWith({ ...mockGameData, userCreatedId: mockUser.id });
    expect(result).toEqual(mockGameData);
});

test('getGamesService should return all games', async () => {
    const mockGames = [{ id: 1, name: 'Game 1' }, { id: 2, name: 'Game 2' }];
    Game.findAll.mockResolvedValue(mockGames);
    const result = await getGamesService();
    expect(Game.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockGames);
});

test('getGameByIdService should return a game if it exists', async () => {
    const mockGame = { id: 1, name: 'Game 1' };
    Game.findByPk.mockResolvedValue(mockGame);
    const result = await getGameByIdService(1);
    expect(Game.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockGame);
});

test('getGameByIdService should throw ValidationError if game does not exist', async () => {
    Game.findByPk.mockResolvedValue(null);
    await expect(getGameByIdService(1)).rejects.toThrow('Game does not exist');
});

test('should update a game correctly', async () => {
    const mockGame = { id: 1, name: 'Old Game Name',
      update: jest.fn().mockImplementation(function(data) {
        Object.assign(this, data);
        return this;
      })
    };
    Game.findByPk.mockResolvedValue(mockGame);
    const updateData = { name: 'New Game Name' };
    const result = await updateGameService(1, updateData);
    expect(Game.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual({id: 1,  name: 'New Game Name', update: expect.any(Function) });
});

test('should throw Error when game does not exist', async () => {
    Game.findByPk.mockResolvedValue(null);
    await expect(updateGameService(1, { name: 'New Game Name' }))
      .rejects.toThrow('Game not found');
});

test('should start a game correctly', async () => {
    const mockGame = { id: 1, userCreatedId: 10, status: GameStatus.WAITING,
      update: jest.fn().mockImplementation(function(data) {
        Object.assign(this, data);
        return this;
      })
    };
    Game.findByPk.mockResolvedValue(mockGame);
    Attendee.findAll.mockResolvedValue([{}, {}]);
    Attendee.count.mockResolvedValue(2);
    const updateData = { someField: 'someValue' };
    const result = await startGameService(1, updateData, 10);
    expect(Attendee.findAll).toHaveBeenCalledWith({where: {gameId: 1, status: UserStatus.READY}});
    expect(Attendee.count).toHaveBeenCalledWith({where: { gameId: 1}});
    expect(mockGame.update).toHaveBeenCalledWith({
      ...updateData,
      status: GameStatus.IN_PROGRESS
    });
});

test('should throw UnauthorizedError when user is not the creator', async () => {
    const mockGame = { id: 1, userCreatedId: 10, status: GameStatus.WAITING };
    Game.findByPk.mockResolvedValue(mockGame);
    await expect(startGameService(1, {}, 11))
    .rejects.toThrow('You cannot start the game');
});

test('should throw ValidationError when game is already in progress', async () => {
    const mockGame = {id: 1, userCreatedId: 10, status: GameStatus.IN_PROGRESS };
    Game.findByPk.mockResolvedValue(mockGame);    
    await expect(startGameService(1, {}, 10))
      .rejects.toThrow('Game has already stared');
});

 test('should throw ValidationError when not all attendees are ready', async () => {
    const mockGame = { id: 1, userCreatedId: 10, status: GameStatus.WAITING };

    Game.findByPk.mockResolvedValue(mockGame);
    Attendee.findAll.mockResolvedValue([{}]);
    Attendee.count.mockResolvedValue(2);
    await expect(startGameService(1, {}, 10))
    .rejects.toThrow('Not all attendees are ready');
});

test('should delete a game and return true when game exists', async () => {
    const mockGame = { id: 1,
      destroy: jest.fn().mockResolvedValue(true)
    };
    Game.findByPk.mockResolvedValue(mockGame);
    const result = await deleteGameService(1);
    expect(mockGame.destroy).toHaveBeenCalled();
    expect(result).toBe(true);
});

test('should throw Error when game does not exist', async () => {
    Game.findByPk.mockResolvedValue(null);
    await expect(deleteGameService(1))
      .rejects.toThrow('Game not found');
});

test('should end a game correctly', async () => {
    const mockGame = { id: 1, userCreatedId: 10, status: GameStatus.IN_PROGRESS,
      update: jest.fn().mockImplementation(function(data) {
        Object.assign(this, data);
        return this;
      })
    };
    Game.findByPk.mockResolvedValue(mockGame);
    const updateData = { someField: 'someValue' };
    const result = await endGameService(1, updateData, 10);
    expect(mockGame.update).toHaveBeenCalledWith({
      ...updateData,
      status: GameStatus.FINISHED
    });
    expect(result).toEqual({ id: 1, userCreatedId: 10, status: GameStatus.FINISHED, someField: 'someValue',
      update: expect.any(Function)
    });
  });

test('should throw ValidationError when game is not in progress', async () => {
    const mockGame = { id: 1, userCreatedId: 10, status: GameStatus.WAITING
    };
    Game.findByPk.mockResolvedValue(mockGame);
    await expect(endGameService(1, {}, 10))
      .rejects.toThrow('Game is not in progress');
  });

test('should throw UnauthorizedError when user is not the creator', async () => {
    const mockGame = { id: 1, userCreatedId: 10, status: GameStatus.IN_PROGRESS };
    Game.findByPk.mockResolvedValue(mockGame);

    await expect(endGameService(1, {}, 11))
      .rejects.toThrow('Only the creator can finish the game');
});

test('should return players of a game', async () => {
    const mockGame = { id: 1 };
    const mockAttendees = [1, 2, 3];
    const mockPlayers = [
      { username: 'player1' },
      { username: 'player2' },
      { username: 'player3' }
    ];
    Game.findByPk.mockResolvedValue(mockGame);
    Attendee.findAll.mockResolvedValue(mockAttendees);
    UserPlayer.findAll.mockResolvedValue(mockPlayers);
    const result = await getPlayersService(1);
    expect(result).toEqual(mockPlayers);
  });

test('should return empty array when no players found', async () => {
    const mockGame = { id: 1 };
    const mockAttendees = [];
    UserPlayer.findAll.mockResolvedValue([]);
    const result = await getPlayersService(1);
    expect(result).toEqual([]);
});
