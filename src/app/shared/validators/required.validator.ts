import { Validators, FormGroup, AbstractControl } from '@angular/forms';

export function requiredIfValidator(predicate) {
  return (formControl) => {
    if (!formControl.parent) {
      return null;
    }
    if (predicate()) {
      return Validators.required(formControl);
    }
    return null;
  };
}
