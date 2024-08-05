import { createAttendeeService, 
    getAttendeesService, 
    getAttendeeByIdService, 
    updateAttendeeService, 
    deleteAttendeeService,
    leaveAttendeeService,
    markAsReady,
    getPlayersGame,
    getNroPlayersJoined,
    getUserNextTurn
} from "../attendeeService.js";
import { getGameByIdService } from "../gameService.js";
import Attendee from "../../models/attendee.js";
import Game from '../../models/game.js';
import { UserStatus } from '../../utils/userStatus.js';

jest.mock("../gameService.js");
jest.mock("../../models/attendee.js");
jest.mock("../../models/game.js");

beforeEach(() => {
  jest.clearAllMocks();
});

test('createAttendeeService crea un nuevo asistente correctamente', async () => {
    const mockGame = { id: 1, maxPlayers: 4 };
    const mockUser = { id: 1 };
    const attendeeData = { gameId: 1 };
  
    getGameByIdService.mockResolvedValue(mockGame);
    Attendee.findOne.mockResolvedValue(null);
    Attendee.create.mockResolvedValue({ ...attendeeData, userId: mockUser.id, turn: 1 });
    Attendee.findAll.mockResolvedValue([]);
    const result = await createAttendeeService(attendeeData, mockUser);
  
    expect(result).toEqual(expect.objectContaining({ 
      gameId: attendeeData.gameId,
      userId: mockUser.id,
      turn: 1
    }));
});

test("should throw ValidationError if game does not exist", async () => {
    getGameByIdService.mockResolvedValue(null);
    const attendeeData = { gameId: 1 };
    const user = { id: 1 };
      await expect(createAttendeeService(attendeeData, user))
      .rejects
      .toThrow('Game does not exist');
});

test('createAttendeeService should throw AlreadyExistsError if attendee already exists', async () => {
  getGameByIdService.mockResolvedValue({ id: '1', maxPlayers: 4 });
  Attendee.findOne.mockResolvedValue({ id: '1' });
  const attendeeData = { gameId: 1 };
   const user = { id: 1 };
  await expect(createAttendeeService(attendeeData, user))
    .rejects.toThrow('Already exists');
});

test("should throw ValidationError if the game is full", async () => {
    getGameByIdService.mockResolvedValue({ id: 1, maxPlayers: 3 });
    const attendees = [{ gameId: 1 }, { gameId: 1 }, { gameId: 1 }];
    Attendee.findAll.mockResolvedValue(attendees);
    Attendee.findOne.mockResolvedValue(null);
    const attendeeData = { gameId: 1 };
    const user = { id: 4 };
    await expect(createAttendeeService(attendeeData, user))
      .rejects
      .toThrow('You cannot join, game is full');
});

test('getAttendeesService should return all attendees', async () => {
    const mockAttendees = [{ id: 1 }, { id: 2 }];
    Attendee.findAll.mockResolvedValue(mockAttendees);
    const result = await getAttendeesService();
    expect(result).toBe(mockAttendees);
});

test('getAttendeeByIdService should return an attendee for your ID', async () => {
    const mockAttendee = { id: 1, name: 'Test Attendee' };
    Attendee.findByPk.mockResolvedValue(mockAttendee);
    const result = await getAttendeeByIdService(1);
    expect(result).toBe(mockAttendee);
});

test('updateAttendeeService should update an attendee correctly.', async () => {
    const mockAttendee = {id: 1,userId: 2,gameId: 3,
        update: jest.fn().mockResolvedValue({ id: 1, userId: 2, gameId: 2 })
    };
    Attendee.findByPk.mockResolvedValue(mockAttendee);
    const updateData = { gameId: 2 };
    const result = await updateAttendeeService(1, updateData);
    expect(mockAttendee.update).toHaveBeenCalledWith(updateData);
});

test('updateAttendeeService should validate before updating an attendee', async () => {
    Attendee.findByPk.mockResolvedValue(null);
    const updateData = { name: 'Updated Name' };
    await expect(updateAttendeeService(1, updateData)).rejects.toThrow('Attendee not found');
});

test('deleteAttendeeService should delete an attendee and return true when attendee exists', async () => {
    const mockAttendee = {
        destroy: jest.fn().mockResolvedValue(true)
    };
    Attendee.findByPk.mockResolvedValue(mockAttendee);
    const result = await deleteAttendeeService(1);
    expect(mockAttendee.destroy).toHaveBeenCalled();
    expect(result).toBe(true);
});

test('deleteAttendeeService should throw an error when attendee does not exist', async () => {
    Attendee.findByPk.mockResolvedValue(null);
    await expect(deleteAttendeeService(1)).rejects.toThrow('Attendee not found');
});

test('leaveAttendeeService should throw an error if the game is not found or not active', async () => {
    Game.findOne.mockResolvedValue(null);
    await expect(leaveAttendeeService(1, 1)).rejects.toThrow('Game not found or not active');
});

test('leaveAttendeeService should throw an error if the user is not a player in the game', async () => {
    Game.findOne.mockResolvedValue({ id: 1, status: 'active' });
    Attendee.findOne.mockResolvedValue(null);
    await expect(leaveAttendeeService(1, 1)).rejects.toThrow('User is not a player in this game');
});

test('leaveAttendeeService should remove the attendee and return true if all conditions are met', async () => {
    const mockAttendee = {
        destroy: jest.fn().mockResolvedValue(true)
    };
    Game.findOne.mockResolvedValue({ id: 1, status: 'active' });
    Attendee.findOne.mockResolvedValue(mockAttendee);
    const result = await leaveAttendeeService(1, 1);
    expect(mockAttendee.destroy).toHaveBeenCalled();
    expect(result).toBe(true);
});

test('markAsReady should throw an error if the attendee is not part of the game', async () => {
    Attendee.findOne.mockResolvedValue(null);
    await expect(markAsReady(1, 1)).rejects.toThrow('Is not part of the game or already is ready');
});

test('markAsReady should throw an error if the attendee is already ready', async () => {
    Attendee.findOne.mockResolvedValue({ status: UserStatus.READY });
    await expect(markAsReady(1, 1)).rejects.toThrow('Is not part of the game or already is ready');
});

test('markAsReady should correctly mark a user as ready.', async () => {
  const updateFunction = function(data) {
    Object.assign(this, data);
    return this;
  };
  const mockAttendee = {id: 1, status: UserStatus.NOT_READY,
    update: jest.fn().mockImplementation(updateFunction)
  };
  Attendee.findOne.mockResolvedValue(mockAttendee);
  Attendee.findByPk.mockResolvedValue(mockAttendee);
  const result = await markAsReady(1, 1);

  expect(Attendee.findOne).toHaveBeenCalledWith({where: { gameId: 1, userId: 1}});
  expect(mockAttendee.update).toHaveBeenCalledWith({ status: UserStatus.READY });
});

test('getPlayersGame should throw an error if there are no players in the game', async () => {
    Attendee.findAll.mockResolvedValue([]);
    await expect(getPlayersGame(1)).rejects.toThrow('There are no players in this game');
});

test('getPlayersGame should return userIds of attendees', async () => {
    const mockAttendees = [
        { userId: 1 },
        { userId: 2 },
        { userId: 3 }
    ];
    Attendee.findAll.mockResolvedValue(mockAttendees);
    const result = await getPlayersGame(1);
    expect(result).toEqual([1, 2, 3]);
});

test('getPlayersGame should handle multiple attendees correctly', async () => {
    const mockAttendees = [
        { userId: 10 },
        { userId: 20 },
        { userId: 30 },
    ];
    Attendee.findAll.mockResolvedValue(mockAttendees);
    const result = await getPlayersGame(1);
    expect(result).toEqual([10, 20, 30]);
});

test('getNroPlayersJoined should return 0 if there are no attendees for the game', async () => {
    Attendee.findAll.mockResolvedValue([]);
    const result = await getNroPlayersJoined(1);
    expect(result).toBe(0);
});

test('getUserNextTurn should return the userId of the attendee at the specified turn', async () => {
    const mockAttendee = { userId: 1 };
    Attendee.findOne.mockResolvedValue(mockAttendee);
    const result = await getUserNextTurn(1, 1);
    expect(result).toBe(1);
});
