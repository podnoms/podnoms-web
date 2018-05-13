import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'bytesToHuman'
})
export class BytesToHumanPipe implements PipeTransform {
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    transform(bytes: number, args?: any): any {
        if (bytes == 0) return '0 Bytes';
        const k = 1024,
            dm = 0,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return (
            parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
        );
    }
}
