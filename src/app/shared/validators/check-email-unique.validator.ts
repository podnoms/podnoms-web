import { ProfileDataService } from 'app/profile/profile-data.service';
import { FormControl } from '@angular/forms';
import { timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export const checkEmailUniqueValidator = (
  profileDataService: ProfileDataService,
  time: number = 500
) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => profileDataService.checkEmail(input.value)),
      map((res) => {
        return res ? null : { taken: true };
      })
    );
  };
};
