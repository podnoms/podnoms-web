import { ProfileDataService } from 'app/profile/profile-data.service';
import {
  AsyncValidatorFn,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export class CheckSlugUniqueValidator {
  static createValidator = (
    profileDataService: ProfileDataService,
    time: number = 500
  ): AsyncValidatorFn => {
    return (input: FormControl): Observable<ValidationErrors> => {
      return timer(time).pipe(
        switchMap(() => profileDataService.checkSlug(input.value)),
        map((res) => {
          return res ? null : { taken: true };
        })
      );
    };
  };
}
