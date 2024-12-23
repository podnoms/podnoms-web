import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'safeHtml',
    standalone: false
})
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitiser: DomSanitizer) {}
    transform(value) {
        // this.sanitiser.bypassSecurityTrustStyle(value);
        return this.sanitiser.bypassSecurityTrustHtml(value);
    }
}
