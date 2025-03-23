import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { format } from 'date-fns';
import { Reflector } from '@nestjs/core';
import { RESPONSE_MESSAGE_METADATA } from '../decorators';
 
export type Response<T> = {
  success: boolean;
  statusCode: number;
  path: string;
  message: string;
  data: T;
  timestamp: string;
};
 
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}
 
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res, context)),
      catchError((err: HttpException) =>
        throwError(() => this.errorHandler(err, context)),
      ),
    );
  }
 
  errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
 
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
 
    response.status(status).json({
      success: false,
      statusCode: status,
      path: request.url,
      message: exception.message,
      data: exception,
      timestamp: format(new Date().toISOString(), 'yyyy-MM-dd HH:mm:ss'),
    });
  }
 
  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = response.statusCode;
    const message = this.reflector.get<string>(RESPONSE_MESSAGE_METADATA, context.getHandler()) || 'success';

    return {
      success: true,
      path: request.url,
      data: res,
      timestamp: format(new Date().toISOString(), 'yyyy-MM-dd HH:mm:ss'),
      statusCode,
      message,
    };
  }
}

// Success

// {
//   "success": true,
//   "statusCode": 200,
//   "path": "/products/1",
//   "message": "success"
//   "timestamp": "2025-03-15 18:43:41",
//   "data": {
//     "id": 1,
//     "name": "Sudadera Gris",
//     "image": "1.jpg",
//     "price": "49",
//     "inventory": 0,
//     "categoryId": 1,
//     "category": {
//       "id": 1,
//       "name": "Sudaderas"
//     }
//   },
// }

// Error

// {
//   "status": false,
//   "statusCode": 404,
//   "path": "/products/1000",
//   "message": "Product not registered",
//   "result": {
//     "response": {
//       "message": "Product not registered",
//       "error": "Not Found",
//       "statusCode": 404
//     },
//     "status": 404,
//     "options": {},
//     "message": "Product not registered",
//     "name": "NotFoundException"
//   },
//   "timestamp": "2025-03-15 18:44:22"
// }