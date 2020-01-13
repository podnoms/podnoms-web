import {
    Component,
    OnInit,
    Input,
    NgZone,
    ChangeDetectorRef
} from '@angular/core';
import {
    animate,
    state,
    style,
    transition,
    trigger
} from '@angular/animations';
import { ToastMessage, ToastType } from './toast-models';
import { ToastService } from './toast.service';
import { Observable } from 'rxjs';

@Component({
    animations: [
        trigger('enterLeave', [
            // Fade
            state('fade', style({ opacity: 1 })),
            transition('* => fade', [
                style({ opacity: 0 }),
                animate('400ms ease-in-out')
            ]),
            state('fadeOut', style({ opacity: 0 })),
            transition('fade => fadeOut', [
                style({ opacity: 1 }),
                animate('300ms ease-in-out')
            ]),

            // Enter from top
            state('fromTop', style({ opacity: 1, transform: 'translateY(0)' })),
            transition('* => fromTop', [
                style({ opacity: 0, transform: 'translateY(-5%)' }),
                animate('400ms ease-in-out')
            ]),
            state(
                'fromTopOut',
                style({ opacity: 0, transform: 'translateY(5%)' })
            ),
            transition('fromTop => fromTopOut', [
                style({ opacity: 1, transform: 'translateY(0)' }),
                animate('300ms ease-in-out')
            ]),

            // Enter from right
            state(
                'fromRight',
                style({ opacity: 1, transform: 'translateX(0)' })
            ),
            transition('* => fromRight', [
                style({ opacity: 0, transform: 'translateX(5%)' }),
                animate('400ms ease-in-out')
            ]),
            state(
                'fromRightOut',
                style({ opacity: 0, transform: 'translateX(-5%)' })
            ),
            transition('fromRight => fromRightOut', [
                style({ opacity: 1, transform: 'translateX(0)' }),
                animate('300ms ease-in-out')
            ]),

            // Enter from bottom
            state(
                'fromBottom',
                style({ opacity: 1, transform: 'translateY(0)' })
            ),
            transition('* => fromBottom', [
                style({ opacity: 0, transform: 'translateY(5%)' }),
                animate('400ms ease-in-out')
            ]),
            state(
                'fromBottomOut',
                style({ opacity: 0, transform: 'translateY(-5%)' })
            ),
            transition('fromBottom => fromBottomOut', [
                style({ opacity: 1, transform: 'translateY(0)' }),
                animate('300ms ease-in-out')
            ]),

            // Enter from left
            state(
                'fromLeft',
                style({ opacity: 1, transform: 'translateX(0)' })
            ),
            transition('* => fromLeft', [
                style({ opacity: 0, transform: 'translateX(-5%)' }),
                animate('400ms ease-in-out')
            ]),
            state(
                'fromLeftOut',
                style({ opacity: 0, transform: 'translateX(5%)' })
            ),
            transition('fromLeft => fromLeftOut', [
                style({ opacity: 1, transform: 'translateX(0)' }),
                animate('300ms ease-in-out')
            ]),

            // Rotate
            state('scale', style({ opacity: 1, transform: 'scale(1)' })),
            transition('* => scale', [
                style({ opacity: 0, transform: 'scale(0)' }),
                animate('400ms ease-in-out')
            ]),
            state('scaleOut', style({ opacity: 0, transform: 'scale(0)' })),
            transition('scale => scaleOut', [
                style({ opacity: 1, transform: 'scale(1)' }),
                animate('400ms ease-in-out')
            ]),

            // Scale
            state('rotate', style({ opacity: 1, transform: 'rotate(0deg)' })),
            transition('* => rotate', [
                style({ opacity: 0, transform: 'rotate(5deg)' }),
                animate('400ms ease-in-out')
            ]),
            state(
                'rotateOut',
                style({ opacity: 0, transform: 'rotate(-5deg)' })
            ),
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
export class ToastItemComponent implements OnInit {
    @Input() toast: ToastMessage;
    timerPercentageRemaining: number = 0;
    counter$: Observable<number>;

    private stopTime = false;
    private timer: any;
    private framesPerSecond = 40;
    private sleepTime: number;
    private startTime: number;
    private endTime: number;
    private timeOut: number;

    constructor(
        private toastService: ToastService,
        private zone: NgZone,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.timeOut = this.toast.timeOut || 5000;
        if (this.toast.timeOut !== 0 && this.toast.autoClose === true) {
            this.startTimeout();
        }
    }
    startTimeout() {
        this.sleepTime = 1000 / this.framesPerSecond /* ms */;
        this.startTime = new Date().getTime();
        this.endTime = this.startTime + this.timeOut;
        this.zone.runOutsideAngular(
            () => (this.timer = setTimeout(this.instance, this.sleepTime))
        );
    }
    private instance = () => {
        const now = new Date().getTime();

        if (this.endTime < now) {
            this.remove();
        } else if (!this.stopTime) {
            if (this.toast.timeOut) {
                this.timerPercentageRemaining = Math.min(
                    ((now -
                        this.startTime +
                        this
                            .sleepTime) /* We add this.sleepTime just to have 100% before close */ *
                        100) /
                        this.timeOut,
                    100
                );
                console.log(
                    'toast-item.component',
                    'percentage',
                    this.timerPercentageRemaining
                );
                console.log('toast-item.component', 'timeout', this.timeOut);

                if (this.timerPercentageRemaining >= 100) {
                    this.remove();
                    return;
                }
            }
            this.timer = setTimeout(this.instance, this.sleepTime);
        }
        this.zone.run(() => {
            if (!this.cdr['destroyed']) {
                this.cdr.detectChanges();
            }
        });
    };

    clickItem() {
        this.remove();
        if (this.toast.click) {
            this.toast.click.emit();
        }
    }
    private remove() {
        this.toast.state = this.toast.state + 'Out';
        this.toastService.set(this.toast, false);
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
