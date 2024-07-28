class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export class AlreadyExistsError extends CustomError {
    constructor(message = 'Already exists') {
      super(message, 409); // 409 Conflict
    }
  }
  
  export class ValidationError extends CustomError {
    constructor(message = 'Validation failed') {
      super(message, 400); // 400 Bad Request
    }
  }
  
  export class NotFoundError extends CustomError {
    constructor(message = 'Resource not found') {
      super(message, 404); // 404 Not Found
    }
  }
  
  export class UnauthorizedError extends CustomError {
    constructor(message = 'Unauthorized access') {
      super(message, 401); // 401 Unauthorized
    }
  }
  
  export class ForbiddenError extends CustomError {
    constructor(message = 'Access forbidden') {
      super(message, 403); // 403 Forbidden
    }
  }
  
  export class InternalServerError extends CustomError {
    constructor(message = 'Internal server error') {
      super(message, 500); // 500 Internal Server Error
    }
  }
  
  export class BadRequestError extends CustomError {
    constructor(message = 'Bad request') {
      super(message, 400); // 400 Bad Request
    }
  }
  
  export class ConflictError extends CustomError {
    constructor(message = 'Conflict') {
      super(message, 409); // 409 Conflict
    }
  }
  
