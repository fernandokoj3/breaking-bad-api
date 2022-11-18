import { buildMessage, ValidateBy, ValidationArguments, ValidationOptions} from "class-validator";
import matchesValidator from 'validator/lib/matches';

export const IS_BIGINT = 'isBigInt';
export const IS_REGION_NUMBER = 'IsRegionNumber';
export const HAS_AT_LEAST_ONE = 'HasAtLeastOne';
export const IS_VALID_NUMBER = 'IsValidNumber';

export function IsBigInt(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_BIGINT,
            validator: {
                validate: (value : number | string, _ ): boolean => {
                    let hasType = (typeof value === 'number' || typeof value === 'string' || typeof value === 'bigint');
                    if (hasType) {
                        return matchesValidator(`${value}`, /^(\-)?[0-9]+$/) || matchesValidator(`${value}`, /^(\-)[0-9]+n+$/);;
                    }
                    return false;
                },
                defaultMessage: buildMessage(
                    eachPrefix => eachPrefix + '$property must be a BigInt',
                    validationOptions
                ),
            },
        },
        validationOptions
    );
}


export function IsValidNumber(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy({
        name: IS_VALID_NUMBER,
        validator: {
            validate: (value: string | number, _): boolean => {
                return matchesValidator(`${value}`, /^[0-9]+$/)
            },
            defaultMessage: buildMessage(
                eachPrefix => eachPrefix + '$property must be a valid number',
                validationOptions
            ),
        }
    })
}
