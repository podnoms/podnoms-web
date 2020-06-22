import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterIf',
})
export class FilterIfPipe implements PipeTransform {
    transform(items: any, field: string, filter: string): unknown {
        if (!field || !filter || !items || !items[0][field]) {
            return items;
        }
        const filtered = items.filter((item) => {
            return (
                item[field].toLowerCase().indexOf(filter.toLowerCase()) !== -1
            );
        });
        return filtered;
    }
}
