import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'uniqueId',
  pure: false,
  standalone: false,
})
export class UniqueIdPipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    if (value !== undefined && value !== null) {
      const filtered = _.uniqBy(value, 'id');
      return filtered;
    }
    return value;
  }
}
