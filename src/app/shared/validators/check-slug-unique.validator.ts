import { ProfileDataService } from 'app/profile/profile-data.service';
import { FormControl } from '@angular/forms';
import { timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export const checkSlugUniqueValidator = (
    profileDataService: ProfileDataService,
    time: number = 500
) => {
    return (input: FormControl) => {
        return timer(time).pipe(
            switchMap(() => profileDataService.checkSlug(input.value)),
            map(res => {
                return res ? null : { taken: true };
            })
        );
    };
};
