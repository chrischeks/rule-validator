import logger from '../../util/logger/logger';
import { IResponse } from '../../util/interface/rule.interface';

export class UniversalsService {
  protected failureResponse = async (message: string, data): Promise<IResponse> => {
    return {
      statusCode: 400,
      message,
      status: 'error',
      data
    };
  };

  protected successResponse = async (message: string, data): Promise<IResponse> => {
    return {
      statusCode: 200,
      message,
      status: 'success',
      data
    };
  };

  protected serviceErrorHandler = async (error, metaData): Promise<IResponse> => {
    const { originalUrl, method, ip } = metaData;
    logger.log('warn', `URL:${originalUrl} - METHOD:${method} - IP:${ip} - ERROR:${error}`);
    return {
      statusCode: 500,
      status: 'error',
      message: 'Internal server error',
      data: null
    };
  };
}
