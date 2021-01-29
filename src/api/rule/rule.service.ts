import { UniversalsService } from "../../@core/common/universals.service"
import { IResponse, IRule, IValidationResponse } from "../../util/rule.interface";



export class RuleService extends UniversalsService {

    public processBaseResponse = async (metaData): Promise<IResponse> => {
        try {
            const data = {
                name: "Chekwube Udeogu",
                github: "@chrischeks",
                email: "chekwubeudeogu@gmail.com",
                mobile: "08182447114",
                twitter: "@christok_cheks"
            }
            return this.successResponse("My Rule-Validation API", data);
        } catch (error) {
            return this.serviceErrorHandler(error, metaData);
        }
    }

    public processValidateInput = async (body, metaData): Promise<IResponse> => {
        try {
            const { rule, data } = body;
            const type: string[] = ["Object]", "Array]", "String]"].filter(item => item === Object.prototype.toString.call(data).split(" ")[1]);
            const validate = {
                "Object]": this.dataIsObject(rule, data),
                "Array]": this.dataIsArray(rule, data),
                "String]": this.dataIsString(rule, data)
            }
            return await validate[type[0]];
        } catch (error) {
            return this.serviceErrorHandler(error, metaData);
        }
    }

    private dataIsObject = async (rule, data) => {
        const { field, condition, conditionValue } = await this.setRule(rule);
        const fieldSplit = field.split(".")
        const nestedField = fieldSplit.length > 1 ? true : false;
        if (!nestedField && data[field]) {
            return this.validateCondition(condition, data[fieldSplit[0]], conditionValue, field);
        } else if (nestedField && data[fieldSplit[0]][fieldSplit[1]]) {
            return this.validateCondition(condition, data[fieldSplit[0]][fieldSplit[1]], conditionValue, field);
        } else {
            return this.failureResponse(`field ${field} is missing from data.`, null);
        }
    }

    private dataIsString = async (rule, data) => {
        const { field, condition, conditionValue } = await this.setRule(rule);
        if (data[field]) {
            return this.validateCondition(condition, data[field], conditionValue, field);
        } else {
            return this.failureResponse(`field ${field} is missing from data.`, null);
        }
    }

    private dataIsArray = async (rule, data) => {
        const { field, condition, conditionValue } = await this.setRule(rule);
        if (data[field]) {
            return this.validateCondition(condition, data[field], conditionValue, field);
        } else {
            return this.failureResponse(`field ${field} is missing from data.`, null);
        }
    }


    private validateCondition = async (condition, fieldVal, conditionVal, field): Promise<IResponse> => {
        const validateData = {
            "eq": fieldVal === conditionVal,
            "neq": fieldVal !== conditionVal,
            "gt": fieldVal > conditionVal,
            "gte": fieldVal >= conditionVal,
            "contains": fieldVal.includes(conditionVal)
        }
        if (validateData[condition]) return this.successResponse(`field ${field} successfully validated.`, await this.dataPortion(false, field, fieldVal, condition, conditionVal));
        return this.failureResponse(`field ${field} failed validation.`, await this.dataPortion(true, field, fieldVal, condition, conditionVal));
    }

    private dataPortion = async (error, field, fieldValue, condition, conditionVal): Promise<IValidationResponse> => {
        return {
            "validation": {
                error,
                field,
                field_value: fieldValue,
                condition,
                condition_value: conditionVal
            }
        }
    }


    private setRule = async (rule): Promise<IRule> => {
        return { field: rule.field, condition: rule.condition, conditionValue: rule.condition_value };
    }

    // private dataIsObject = async (rule, data) => {
    //     const field = rule.field;
    //     const condition = rule.condition;
    //     const conditionValue = rule.condition_value;
    //     const fieldSplit = field.split(".")
    //     const nestedField = fieldSplit.length > 1 ? true : false;
    //     if (!nestedField && data[field]) {
    //         return this.validateCondition(condition, data[fieldSplit[0]], conditionValue, field);
    //     } else if (nestedField && data[fieldSplit[0]][fieldSplit[1]]) {
    //         return this.validateCondition(condition, data[fieldSplit[0]][fieldSplit[1]], conditionValue, field);
    //     } else {
    //         return this.failureResponse(`field ${field} is missing from data.`, null);
    //     }
    // }


    // private validateCondition = async (condition, fieldVal, conditionVal, field): Promise<IResponse> => {
    //     let result: boolean;
    //     switch (condition) {
    //         case "eq":
    //             result = fieldVal === conditionVal;
    //             break;
    //         case "neq":
    //             result = fieldVal !== conditionVal;
    //             break;
    //         case "gt":
    //             result = fieldVal > conditionVal;
    //             break;
    //         case "gte":
    //             result = fieldVal >= conditionVal;
    //             break;
    //         case "contains":
    //             result = fieldVal.includes(conditionVal);
    //             break;
    //         default:
    //             result = false
    //             break;
    //     }

    //     if (result) return this.successResponse(`field ${field} successfully validated.`, await this.dataPortion(false, field, fieldVal, condition, conditionVal));
    //     return this.failureResponse(`field ${field} failed validation.`, await this.dataPortion(true, field, fieldVal, condition, conditionVal));
    // }


    // public processValidateInput = async (body, metaData): Promise<IResponse> => {
    //     try {
    //         const { rule, data } = body;
    //         const type: string[] = ["Object]", "Array]", "String]"].filter(item => item === Object.prototype.toString.call(data).split(" ")[1]);
    //         if (type[0] === "Object]") {
    //             return await this.dataIsObject(rule, data);
    //         } else if (type.length > 0 && type[0] === "Array]") {
    //             return await this.dataIsArray(rule, data);
    //         } else {
    //             return await this.dataIsString(rule, data);
    //         }
    //     } catch (error) {
    //         return this.serviceErrorHandler(error, metaData);
    //     }
    // }
}