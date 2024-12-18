import {
  Component,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
    selector: 'img[appImgFallback]',
    standalone: false
})
export class ImgFallbackDirective {
  @Input() appImageFallback: string;
  constructor(private ref: ElementRef) {}

  @HostListener('error')
  loadFallbackOnError() {
    const el: HTMLImageElement = <HTMLImageElement>this.ref.nativeElement;
    el.src = this.appImageFallback || 'https://picsum.photos/64/64';
  }
}
