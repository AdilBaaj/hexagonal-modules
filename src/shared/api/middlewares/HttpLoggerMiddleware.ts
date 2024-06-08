import type { NestMiddleware } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(HttpLoggerMiddleware.name);
  public use(req: Request, _res: Response, next: NextFunction) {
    this.logger.log(`HTTP request {${req.baseUrl}, ${req.method}}`);
    next();
  }
}
