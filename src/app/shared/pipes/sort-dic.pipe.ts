import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'reverse'
})
export class SortDicPipe implements PipeTransform {
    transform(value): unknown {
        return value.slice().reverse();
    }
}
