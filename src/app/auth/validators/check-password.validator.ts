import { AbstractControl } from '@angular/forms';

export class PasswordValidation {
    static matchPassword(AC: AbstractControl) {
        const passwordControl = AC.get('password');
        const confirmPasswordControl = AC.get('confirmPassword');
        if (passwordControl && confirmPasswordControl) {
            const password = passwordControl.value;
            const confirmPassword = confirmPasswordControl.value;
            if (password !== confirmPassword) {
                return { matchPassword: true };
            } else {
                return null;
            }
        }
        return null;
    }
}
