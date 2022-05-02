import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export class PasswordValidation {
  static matchPassword(AC: FormGroup): ValidationErrors | null {
    const passwordControl = AC.get('password');
    const confirmPasswordControl = AC.get('confirmPassword');
    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;
      if (password !== confirmPassword) {
        confirmPasswordControl.setErrors({ matchPassword: true });
        return { matchPassword: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    }
    return null;
  }
}
