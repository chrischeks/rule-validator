import * as express from 'express';
// import { inputValidator } from '../../util/rule.middleware';
import { RuleController } from './rule.controller';
import { expressValid } from './rule.express';
// import { InputValidator } from './rule.validator';
export const ruleRouter = express.Router();



const validator = new expressValid();
ruleRouter.get(
  '/',
  new RuleController().baseResponse
);

ruleRouter.post(
  '/validate-rule',
  validator.userValidationRules(),
  validator.validate,
  new RuleController().validateInput
);
