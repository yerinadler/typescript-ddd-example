export class ApplicationError extends Error {
  public readonly httpStatus: number;
  public readonly statusCode: string;

  constructor(httpStatus: number, statusCode: string, message: string) {
    super(message);
    this.httpStatus = httpStatus || 500;
    this.statusCode = statusCode || '500';
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message: string) {
    super(404, '404', message);
  }
}
