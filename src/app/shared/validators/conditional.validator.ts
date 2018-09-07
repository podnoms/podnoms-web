import { distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

export class ConditionalValidator {
    static conditional(conditional, validator) {
        return function(control) {
            revalidateOnChanges(control);

            if (control && control._parent) {
                if (conditional(control._parent)) {
                    return validator(control);
                }
            }
        };
    }
}
function revalidateOnChanges(control: FormControl): void {
    if (control && control._parent && !control._revalidateOnChanges) {
        control._revalidateOnChanges = true;
        control._parent.valueChanges
            .map(
                distinctUntilChanged((a, b) => {
                    // These will always be plain objects coming from the form, do a simple comparison
                    if ((a && !b) || (!a && b)) {
                        return false;
                    } else if (a && b && Object.keys(a).length !== Object.keys(b).length) {
                        return false;
                    } else if (a && b) {
                        for (const i in a) {
                            if (a[i] !== b[i]) {
                                return false;
                            }
                        }
                    }
                    return true;
                })
            )
            .subscribe(() => {
                control.updateValueAndValidity();
            });

        control.updateValueAndValidity();
    }
    return;
}
