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
})
export class ImgFallbackDirective {
  @Input() appImageFallback: string;
  constructor(private ref: ElementRef) {}

  @HostListener('error')
  loadFallbackOnError() {
    const el: HTMLImageElement = <HTMLImageElement>this.ref.nativeElement;
    el.src = this.appImageFallback || 'https://placekitten.com/64/64';
  }
}
