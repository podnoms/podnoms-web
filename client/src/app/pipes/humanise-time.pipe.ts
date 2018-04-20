import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'humaniseTime'
})
export class HumaniseTimePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        var d, h, m, s;
        if (value) {
            d = Number(value);
            h = Math.floor(d / 3600);
            m = Math.floor(d % 3600 / 60);
            s = Math.floor(d % 3600 % 60);
            return (h > 0 ? h + ":" : "") + (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "00:") + (s < 10 ? "0" : "") + s;
        } else {
            return "00:00";
        }
    }

}
