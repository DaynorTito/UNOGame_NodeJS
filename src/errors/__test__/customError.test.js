import { 
    AlreadyExistsError, 
    ValidationError, 
    NotFoundError, 
    UnauthorizedError, 
    ForbiddenError, 
    InternalServerError, 
    BadRequestError, 
    ConflictError 
} from "../customError.js";


test('AlreadyExistsError should have correct message and status code', () => {
    const error = new AlreadyExistsError();
    expect(error.message).toBe('Already exists');
    expect(error.statusCode).toBe(409);
    expect(error.name).toBe('AlreadyExistsError');
});

test('ValidationError should have correct message and status code', () => {
    const error = new ValidationError();
    expect(error.message).toBe('Validation failed');
    expect(error.statusCode).toBe(400);
    expect(error.name).toBe('ValidationError');
});

test('NotFoundError should have correct message and status code', () => {
    const error = new NotFoundError();
    expect(error.message).toBe('Resource not found');
    expect(error.statusCode).toBe(404);
    expect(error.name).toBe('NotFoundError');
});

test('UnauthorizedError should have correct message and status code', () => {
    const error = new UnauthorizedError();
    expect(error.message).toBe('Unauthorized access');
    expect(error.statusCode).toBe(401);
    expect(error.name).toBe('UnauthorizedError');
});

test('ForbiddenError should have correct message and status code', () => {
    const error = new ForbiddenError();
    expect(error.message).toBe('Access forbidden');
    expect(error.statusCode).toBe(403);
    expect(error.name).toBe('ForbiddenError');
});

test('InternalServerError should have correct message and status code', () => {
    const error = new InternalServerError();
    expect(error.message).toBe('Internal server error');
    expect(error.statusCode).toBe(500);
    expect(error.name).toBe('InternalServerError');
});

test('BadRequestError should have correct message and status code', () => {
    const error = new BadRequestError();
    expect(error.message).toBe('Bad request');
    expect(error.statusCode).toBe(400);
    expect(error.name).toBe('BadRequestError');
});

test('ConflictError should have correct message and status code', () => {
    const error = new ConflictError();
    expect(error.message).toBe('Conflict');
    expect(error.statusCode).toBe(409);
    expect(error.name).toBe('ConflictError');
});
