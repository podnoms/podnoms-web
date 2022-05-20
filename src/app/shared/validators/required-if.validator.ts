import {
  Validators,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable, timer } from 'rxjs';

export class RequiredIfValidator {
  static createValidator = (predicate: string): ValidatorFn => {
    return (input: FormControl): ValidationErrors => {
      if (!input.parent) {
        return null;
      }
      if (predicate) {
        return Validators.required(input.value);
      }
      return null;
    };
  };
}
