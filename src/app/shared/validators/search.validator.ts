import {
    AbstractControl,
    AsyncValidatorFn,
    ValidationErrors
} from '@angular/forms';
import { UtilityService } from '../services/utility.service';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export function validateSearch(
    utilityService: UtilityService,
    table: string,
    field: string,
    origValue: string
): AsyncValidatorFn {
    return (
        control: AbstractControl
    ):
        | Promise<ValidationErrors | null>
        | Observable<ValidationErrors | null> => {
        return timer(500).pipe(
            switchMap((value, index) =>
                utilityService.checkForDupes(table, field, control.value).pipe(
                    map(e => {
                        return e && e.value !== origValue && !e.isValid
                            ? {
                                  taken: true,
                                  message: `${e.responseMessage} is already using this slug`
                              }
                            : null;
                    })
                )
            )
        );
    };
}
