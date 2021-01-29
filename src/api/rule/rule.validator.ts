import joi from 'joi';


export class InputValidator {
    public ruleValidator = joi.object({
        rule: joi.object().keys({
            field: joi.string().error(new Error("jjjjjjjjjjjj")).required(),
            condition: joi.string().required(),
            condition_value: joi.number().required()
        }).required(),
        data: joi.object({}).required(),
    })


    public isString = function (value) {
        if (typeof value === 'string') {
            return true;
        }
        return false;
    };




}