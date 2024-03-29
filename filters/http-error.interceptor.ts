import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException, HttpStatus
} from "@nestjs/common";

import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    console.log(exception);
    
    response.status(status).json({
      statusCode: status,
      exception: exception,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
