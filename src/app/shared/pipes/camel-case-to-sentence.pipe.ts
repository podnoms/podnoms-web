import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'camelCaseToSentence'
})
export class CamelCaseToSentencePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        const result = value.replace(/([A-Z])/g, ' $1');
        return result.charAt(0).toUpperCase() + result.slice(1);
    }
}
