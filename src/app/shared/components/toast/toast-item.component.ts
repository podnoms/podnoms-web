import { Component, OnInit, Input, NgZone, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ToastMessage, ToastType } from './toast-models';
import { ToastService } from './toast.service';
import { Observable, timer, interval } from 'rxjs';
import { take, map, takeWhile, timeout } from 'rxjs/operators';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';

@Component({
    animations: [
        trigger('enterLeave', [
            // Fade
            state('fade', style({ opacity: 1 })),
            transition('* => fade', [style({ opacity: 0 }), animate('400ms ease-in-out')]),
            state('fadeOut', style({ opacity: 0 })),
            transition('fade => fadeOut', [style({ opacity: 1 }), animate('300ms ease-in-out')]),

            // Enter from top
            state('fromTop', style({ opacity: 1, transform: 'translateY(0)' })),
            transition('* => fromTop', [
                style({ opacity: 0, transform: 'translateY(-5%)' }),
                animate('400ms ease-in-out')
            ]),
            state('fromTopOut', style({ opacity: 0, transform: 'translateY(5%)' })),
            transition('fromTop => fromTopOut', [
                style({ opacity: 1, transform: 'translateY(0)' }),
                animate('300ms ease-in-out')
            ]),

            // Enter from right
            state('fromRight', style({ opacity: 1, transform: 'translateX(0)' })),
            transition('* => fromRight', [
                style({ opacity: 0, transform: 'translateX(5%)' }),
                animate('400ms ease-in-out')
            ]),
            state('fromRightOut', style({ opacity: 0, transform: 'translateX(-5%)' })),
            transition('fromRight => fromRightOut', [
                style({ opacity: 1, transform: 'translateX(0)' }),
                animate('300ms ease-in-out')
            ]),

            // Enter from bottom
            state('fromBottom', style({ opacity: 1, transform: 'translateY(0)' })),
            transition('* => fromBottom', [
                style({ opacity: 0, transform: 'translateY(5%)' }),
                animate('400ms ease-in-out')
            ]),
            state('fromBottomOut', style({ opacity: 0, transform: 'translateY(-5%)' })),
            transition('fromBottom => fromBottomOut', [
                style({ opacity: 1, transform: 'translateY(0)' }),
                animate('300ms ease-in-out')
            ]),

            // Enter from left
            state('fromLeft', style({ opacity: 1, transform: 'translateX(0)' })),
            transition('* => fromLeft', [
                style({ opacity: 0, transform: 'translateX(-5%)' }),
                animate('400ms ease-in-out')
            ]),
            state('fromLeftOut', style({ opacity: 0, transform: 'translateX(5%)' })),
            transition('fromLeft => fromLeftOut', [
                style({ opacity: 1, transform: 'translateX(0)' }),
                animate('300ms ease-in-out')
            ]),

            // Rotate
            state('scale', style({ opacity: 1, transform: 'scale(1)' })),
            transition('* => scale', [style({ opacity: 0, transform: 'scale(0)' }), animate('400ms ease-in-out')]),
            state('scaleOut', style({ opacity: 0, transform: 'scale(0)' })),
            transition('scale => scaleOut', [
                style({ opacity: 1, transform: 'scale(1)' }),
                animate('400ms ease-in-out')
            ]),

            // Scale
            state('rotate', style({ opacity: 1, transform: 'rotate(0deg)' })),
            transition('* => rotate', [style({ opacity: 0, transform: 'rotate(5deg)' }), animate('400ms ease-in-out')]),
            state('rotateOut', style({ opacity: 0, transform: 'rotate(-5deg)' })),
            transition('rotate => rotateOut', [
                style({ opacity: 1, transform: 'rotate(0deg)' }),
                animate('400ms ease-in-out')
            ])
        ])
    ],
    selector: 'app-toast-item',
    templateUrl: './toast-item.component.html',
    styleUrls: ['./toast-item.component.scss']
})
export class ToastItemComponent implements OnInit, OnDestroy {
    @Input() toast: ToastMessage;
    @Input() timeOut: number;
    timerPercentageRemaining: number = 100;
    intervalId: NodeJS.Timeout;
    timerSub: any;

    constructor(private toastService: ToastService, private zone: NgZone, private cdr: ChangeDetectorRef) {}

    ngOnInit() {
        if (this.toast.autoClose) {
            let count = 300;

            const counter = setInterval(() => {
                if (count <= 0) {
                    clearInterval(counter);
                    this.remove();
                    return;
                }
                this.timerPercentageRemaining = Math.round((count / 300) * 100);
                this.zone.run(() => this.cdr.detectChanges());
                count--;
            }, 10);
        }
    }
    ngOnDestroy() {
        if (this.timerSub) {
            this.timerSub.unsubscribe();
        }
    }

    clickItem() {
        this.remove();
        if (this.toast.click) {
            this.toast.click.emit();
        }
    }
    private remove() {
        this.toast.state = this.toast.state + 'Out';
        setTimeout(() => {
            this.toastService.set(this.toast, false);
        }, 310);
    }
    cssClass(toast: ToastMessage) {
        if (!toast) {
            return;
        }
        // return css class based on alert type
        switch (toast.type) {
            case ToastType.Success:
                return 'alert-success';
            case ToastType.Error:
                return 'alert-danger';
            case ToastType.Info:
                return 'alert-info';
            case ToastType.Warn:
                return 'alert-warning';
        }
    }
}
