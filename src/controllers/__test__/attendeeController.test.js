import {
    createAttendee,
    getAttendees,
    getAttendeeById,
    updateAttendee,
    deleteAttendee,
    leaveAttendeeInProgess,
    userMarkAsReady
} from '../attendeeController.js';

import {
    createAttendeeService,
    getAttendeesService,
    getAttendeeByIdService,
    updateAttendeeService,
    deleteAttendeeService,
    leaveAttendeeService,
    markAsReady
} from '../../services/attendeeService.js';

jest.mock('../../services/attendeeService.js');

let mockRequest;
let mockResponse;
let mockNext;

beforeEach(() => {
    mockRequest = {};
    mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    send: jest.fn()
    };
    mockNext = jest.fn();
});

test('createAttendee should create an attendee and return 201 status', async () => {
    mockRequest.body = {  id: 1, someData: 'data' };
    mockRequest.user = { id: 1 };
    createAttendeeService.mockResolvedValue({});

    await createAttendee(mockRequest, mockResponse, mockNext);

    expect(createAttendeeService).toHaveBeenCalledWith(mockRequest.body, mockRequest.user);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User joined the game successfully' });
});

test('getAttendees should return all attendees and 200 status', async () => {
    const mockAttendees = [{ id: 1 }, { id: 2 }];
    getAttendeesService.mockResolvedValue(mockAttendees);

    await getAttendees(mockRequest, mockResponse, mockNext);

    expect(getAttendeesService).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockAttendees);
});

test('getAttendeeById should return an attendee and 200 status when found', async () => {
    const mockAttendee = { id: 1 };
    mockRequest.params = { id: '1' };
    getAttendeeByIdService.mockResolvedValue(mockAttendee);

    await getAttendeeById(mockRequest, mockResponse, mockNext);

    expect(getAttendeeByIdService).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockAttendee);
});

test('getAttendeeById should return 404 when attendee not found', async () => {
    mockRequest.params = { id: '999' };
    getAttendeeByIdService.mockResolvedValue(null);

    await getAttendeeById(mockRequest, mockResponse, mockNext);

    expect(getAttendeeByIdService).toHaveBeenCalledWith('999');
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Attendee not found' });
});

test('updateAttendee should update an attendee and return 200 status', async () => {
    const mockUpdatedAttendee = { id: 1, name: 'Updated' };
    mockRequest.params = { id: '1' };
    mockRequest.body = { name: 'Updated' };
    updateAttendeeService.mockResolvedValue(mockUpdatedAttendee);

    await updateAttendee(mockRequest, mockResponse, mockNext);

    expect(updateAttendeeService).toHaveBeenCalledWith('1', mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedAttendee);
});

test('deleteAttendee should delete an attendee and return 204 status', async () => {
    mockRequest.params = { id: '1' };
    deleteAttendeeService.mockResolvedValue();

    await deleteAttendee(mockRequest, mockResponse, mockNext);

    expect(deleteAttendeeService).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(204);
    expect(mockResponse.send).toHaveBeenCalled();
});

test('leaveAttendeeInProgess should allow user to leave and return 200 status', async () => {
    mockRequest.body = { gameId: '1' };
    mockRequest.user = { id: 1 };
    leaveAttendeeService.mockResolvedValue();

    await leaveAttendeeInProgess(mockRequest, mockResponse, mockNext);

    expect(leaveAttendeeService).toHaveBeenCalledWith('1', 1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User left the game successfully' });
});

test('userMarkAsReady should mark user as ready and return 200 status', async () => {
    mockRequest.body = { gameId: '1' };
    mockRequest.user = { id: 1 };
    markAsReady.mockResolvedValue({});

    await userMarkAsReady(mockRequest, mockResponse, mockNext);

    expect(markAsReady).toHaveBeenCalledWith('1', 1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User mark as ready successfully' });
});
