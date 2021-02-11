import * as express from 'express';
import { RuleController } from './rule.controller';
import { expressValid } from './rule.validator';
export const ruleRouter = express.Router();

const validator = new expressValid();
ruleRouter.get('/', new RuleController().baseResponse);

ruleRouter.post('/validate-rule', validator.validationRules(), validator.validate, new RuleController().validateInput);

