import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
@ValidatorConstraint({ name: 'name', async: false })
export class EscapeValidation implements ValidatorConstraintInterface {
    public validate(text: string, args: ValidationArguments): any {
        const result = /[*+?^${}()<>''|[\]\\]/g.test(text);
        return result === true ? false : true;
    }

  public defaultMessage(args: ValidationArguments): any {
    // here you can provide default error message if validation failed
    return 'Text ($value) is too short or too long!';
  }
}
