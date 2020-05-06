import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitiser: DomSanitizer) {}
    transform(value) {
        // this.sanitiser.bypassSecurityTrustStyle(value);
        return this.sanitiser.bypassSecurityTrustHtml(value);
    }
}
