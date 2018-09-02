import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { UtilityService } from '../services/utility.service';
import { Observable, timer, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export function validateDomain(utilityService: UtilityService): AsyncValidatorFn {
    return (
        control: AbstractControl
    ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        // tslint:disable-next-line:max-line-length
        const url = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (!control.value) {
            return of(null);
        }

        return timer(500).pipe(
            switchMap(() => {
                if (!url.test(control.value)) {
                    return of({
                        message: 'Invalid domain name'
                    });
                }
                return utilityService.checkDomain(control.value).pipe(
                    map(e => {
                        return e
                            ? null
                            : {
                                  message: `This is not a valid CNAME domain`
                              };
                    })
                );
            })
        );
    };
}
