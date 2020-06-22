import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
    transform(value: any[], field: string, direction: string): any {
        if (direction === 'descending') {
            const sorted = value.sort((a, b) => {
                return a[field] - b[field];
            });
            return sorted;
        }
    }
}
