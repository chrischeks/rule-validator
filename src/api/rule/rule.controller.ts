import { NextFunction, Request, Response } from 'express';
import { UniversalsController } from '../../@core/common/universals.controller';
import { IResponse } from '../../util/interface/rule.interface';
import { RuleService } from './rule.service';

export class RuleController extends UniversalsController {
  public baseResponse = async (req: Request, res: Response): Promise<void> => {
    const { ip, method, originalUrl } = req;
    try {
      const response: IResponse = await new RuleService().processBaseResponse({
        ip,
        method,
        originalUrl
      });
      this.controllerResponseHandler(response, res);
    } catch (error) {
      this.controllerErrorHandler(req, res, error);
    }
  };

  public validateInput = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { ip, method, originalUrl, body } = req;
    try {
      const response: IResponse = await new RuleService().processValidateInput(body, { ip, method, originalUrl });
      this.controllerResponseHandler(response, res);
    } catch (error) {
      this.controllerErrorHandler(req, res, error);
    }
  };
}
