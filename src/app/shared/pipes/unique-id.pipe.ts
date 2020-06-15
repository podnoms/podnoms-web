import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { NGXLogger } from 'ngx-logger';

@Pipe({
    name: 'uniqueId',
    pure: false,
})
export class UniqueIdPipe implements PipeTransform {
    transform(value: unknown, ...args: unknown[]): unknown {
        if (value !== undefined && value !== null) {
            const filtered = _.uniqBy(value, 'id');
            return filtered;
        }
        return value;
    }
}
