import { Request, Response, ErrorRequestHandler } from 'express';
import { IResponse } from '../../util/interface/rule.interface';
import logger from '../../util/logger/logger';

export class UniversalsController {
  protected controllerErrorHandler = (req: Request, res: Response, error: ErrorRequestHandler): Response<any> => {
    const { originalUrl, method, ip } = req;
    logger.log('warn', `URL:${originalUrl} - METHOD:${method} - IP:${ip} - ERROR:${error}`);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      data: null
    });
  };

  protected controllerResponseHandler = async (response: IResponse, res: Response): Promise<Response<any>> => {
    const { statusCode, status, message, data } = response;
    return res.status(statusCode).json({
      status,
      message,
      data
    });
  };
}
