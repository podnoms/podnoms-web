import { AbstractControl } from '@angular/forms';

export function urlIsValidValidator(control: AbstractControl) {
    const URL_REGEXP = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
    const url = control.value;
    if (!url || URL_REGEXP.test(url)) {
        return null;
    }
    return { message: 'Url is invalid' };
}
