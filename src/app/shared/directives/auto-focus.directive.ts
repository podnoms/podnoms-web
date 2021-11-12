import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[appAutoFocus]'
})
export class AutofocusDirective implements AfterContentInit {
    @Input() public appAutoFocus: boolean;

    public constructor(private el: ElementRef) {}

    public ngAfterContentInit() {
        setTimeout(() => {
            this.el.nativeElement.focus();
        }, 500);
    }
}
