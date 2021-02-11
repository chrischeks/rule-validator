import { IResponse } from '../../util/interface/rule.interface';
import { BaseService } from './rule.base-service';

export class RuleService extends BaseService {

  public processBaseResponse = async (metaData): Promise<IResponse> => {
    try {
      const data = {
        name: process.env.NAME,
        github: process.env.GITHUB,
        email: process.env.EMAIL,
        mobile: process.env.MOBILE,
        twitter: process.env.TWITTER
      };
      return this.successResponse('My Rule-Validation API', data);
    } catch (error) {
      return this.serviceErrorHandler(error, metaData);
    }
  };


  public processValidateInput = async (body, metaData): Promise<IResponse> => {
    try {
      const { rule, data } = body;
      const dataType = Object.prototype.toString.call(data).split(' ')[1];
      const matchedType: string = ['Object]', 'Array]', 'String]'].filter((item) => item === dataType)[0];
      const { field, condition, conditionValue } = await this.setRule(rule);
      const fieldSplit = field.split('.');
      const nestedField = fieldSplit.length > 1 ? true : false;
      if (!nestedField && data.hasOwnProperty(field) && matchedType === 'Object]') {
        return this.validateCondition(condition, data[fieldSplit[0]], conditionValue, field);
      } else if (nestedField && data[fieldSplit[0]].hasOwnProperty(fieldSplit[1])) {
        return this.validateCondition(condition, data[fieldSplit[0]][fieldSplit[1]], conditionValue, field);
      } else if (data.hasOwnProperty(field) && matchedType === 'String]') {
        return this.validateCondition(condition, data[field], conditionValue, field);
      } else if (data.hasOwnProperty(field) && matchedType === 'Array]') {
        return this.validateCondition(condition, data[field], conditionValue, field)
      } else {
        return this.failureResponse(`field ${field} is missing from data.`, null);
      }
    } catch (error) {
      return this.serviceErrorHandler(error, metaData);
    }
  };

  private validateCondition = async (condition, fieldVal, conditionVal, field): Promise<IResponse> => {
    const validateData = {
      eq: fieldVal === conditionVal,
      neq: fieldVal !== conditionVal,
      gt: fieldVal > conditionVal,
      gte: fieldVal >= conditionVal
    };
    if (condition === 'contains') validateData[condition] = fieldVal.includes(conditionVal);

    if (validateData[condition])
      return this.successResponse(
        `field ${field} successfully validated.`,
        await this.dataPortion(false, field, fieldVal, condition, conditionVal)
      );
    return this.failureResponse(
      `field ${field} failed validation.`,
      await this.dataPortion(true, field, fieldVal, condition, conditionVal)
    );
  };
}
