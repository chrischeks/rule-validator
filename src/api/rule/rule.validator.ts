import { Request, Response, NextFunction } from 'express';
import { UniversalsController } from '../../@core/common/universals.controller';
import { body, validationResult } from 'express-validator';
// const { validationResult, body } = require('express-validator');

export class expressValid extends UniversalsController {
  acceptedTypes: string[] = ['Object]', 'Array]', 'String]'];
  public userValidationRules = (): any[] => {
    return [
      body('rule')
        .exists()
        .withMessage('rule is required.')
        .custom((val) => Object.prototype.toString.call(val).split(' ')[1] === 'Object]')
        .withMessage('rule should be an object.'),
      body('rule.field').exists().withMessage('field is required.'),
      body('rule.condition')
        .exists()
        .withMessage('condition is required.')
        .isIn(['eq', 'neq', 'gt', 'gte', 'contains'])
        .withMessage("condition should be either 'eq', 'neq', 'gt', 'gte' or 'contains'"),
      body('rule.condition_value').exists().withMessage('condition_value is required.'),
      body('data')
        .exists()
        .withMessage('data is required.')
        .custom((val) => this.acceptedTypes.includes(Object.prototype.toString.call(val).split(' ')[1]))
        .withMessage('data should be either a JSON object, an array, or a string.')
    ];
  };

  public validate = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    this.controllerResponseHandler(
      {
        statusCode: 400,
        status: 'error',
        message: errors.array()[0].msg,
        data: null
      },
      res
    );
  };
}
