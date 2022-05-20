import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { UtilityService } from '../services/utility.service';
import { Observable, timer, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export function validateDomain(
  utilityService: UtilityService,
  requiredDomain: string
): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return !control.dirty
      ? of(null)
      : timer(500).pipe(
          switchMap(() => {
            return utilityService
              .checkDomain(control.value, requiredDomain)
              .pipe(
                map((e) => {
                  return e
                    ? null
                    : {
                        message: `This is not a valid CNAME domain`,
                      };
                })
              );
          })
        );
  };
}
