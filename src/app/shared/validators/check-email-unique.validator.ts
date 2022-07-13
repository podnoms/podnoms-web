import { ProfileDataService } from 'app/profile/profile-data.service';
import {
  AsyncValidatorFn,
  UntypedFormControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export class CheckEmailUniqueValidator {
  static createValidator = (
    profileDataService: ProfileDataService,
    time: number = 500
  ): AsyncValidatorFn => {
    return (input: UntypedFormControl): Observable<ValidationErrors> => {
      return timer(time).pipe(
        switchMap(() => profileDataService.checkEmail(input.value)),
        map((res) => {
          return res ? null : { taken: true };
        })
      );
    };
  };
}
