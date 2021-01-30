import { UniversalsService } from "../../@core/common/universals.service"
import { IRule } from "../../util/interface/rule.interface"
import { IValidationResponse } from "../../util/interface/rule.interface"

export class BaseService extends UniversalsService {
    protected dataPortion = async (error, field, fieldValue, condition, conditionVal): Promise<IValidationResponse> => {
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


    protected setRule = async (rule): Promise<IRule> => {
        return { field: rule.field, condition: rule.condition, conditionValue: rule.condition_value };
    }
}