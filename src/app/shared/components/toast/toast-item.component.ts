import {
    Component,
    OnInit,
    Input,
    NgZone,
    ChangeDetectorRef,
    ElementRef,
} from '@angular/core';
import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import {
    ToastMessage,
    IToastPosition,
    ToastType,
    ToastPosition,
} from './toast-models';
import { ToastService } from './toast.service';
import { Observable } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

@Component({
    animations: [
        trigger('enterLeave', [
            // Fade
            state('fade', style({ opacity: 1 })),
            transition('* => fade', [
                style({ opacity: 0 }),
                animate('400ms ease-in-out'),
            ]),
            state('fadeOut', style({ opacity: 0 })),
            transition('fade => fadeOut', [
                style({ opacity: 1 }),
                animate('300ms ease-in-out'),
            ]),

            // Enter from top
            state('fromTop', style({ opacity: 1, transform: 'translateY(0)' })),
            transition('* => fromTop', [
                style({ opacity: 0, transform: 'translateY(-5%)' }),
                animate('400ms ease-in-out'),
            ]),
            state(
                'fromTopOut',
                style({ opacity: 0, transform: 'translateY(5%)' })
            ),
            transition('fromTop => fromTopOut', [
                style({ opacity: 1, transform: 'translateY(0)' }),
                animate('300ms ease-in-out'),
            ]),

            // Enter from right
            state(
                'fromRight',
                style({ opacity: 1, transform: 'translateX(0)' })
            ),
            transition('* => fromRight', [
                style({ opacity: 0, transform: 'translateX(5%)' }),
                animate('400ms ease-in-out'),
            ]),
            state(
                'fromRightOut',
                style({ opacity: 0, transform: 'translateX(-5%)' })
            ),
            transition('fromRight => fromRightOut', [
                style({ opacity: 1, transform: 'translateX(0)' }),
                animate('300ms ease-in-out'),
            ]),

            // Enter from bottom
            state(
                'fromBottom',
                style({ opacity: 1, transform: 'translateY(0)' })
            ),
            transition('* => fromBottom', [
                style({ opacity: 0, transform: 'translateY(5%)' }),
                animate('400ms ease-in-out'),
            ]),
            state(
                'fromBottomOut',
                style({ opacity: 0, transform: 'translateY(-5%)' })
            ),
            transition('fromBottom => fromBottomOut', [
                style({ opacity: 1, transform: 'translateY(0)' }),
                animate('300ms ease-in-out'),
            ]),

            // Enter from left
            state(
                'fromLeft',
                style({ opacity: 1, transform: 'translateX(0)' })
            ),
            transition('* => fromLeft', [
                style({ opacity: 0, transform: 'translateX(-5%)' }),
                animate('400ms ease-in-out'),
            ]),
            state(
                'fromLeftOut',
                style({ opacity: 0, transform: 'translateX(5%)' })
            ),
            transition('fromLeft => fromLeftOut', [
                style({ opacity: 1, transform: 'translateX(0)' }),
                animate('300ms ease-in-out'),
            ]),

            // Rotate
            state('scale', style({ opacity: 1, transform: 'scale(1)' })),
            transition('* => scale', [
                style({ opacity: 0, transform: 'scale(0)' }),
                animate('400ms ease-in-out'),
            ]),
            state('scaleOut', style({ opacity: 0, transform: 'scale(0)' })),
            transition('scale => scaleOut', [
                style({ opacity: 1, transform: 'scale(1)' }),
                animate('400ms ease-in-out'),
            ]),

            // Scale
            state('rotate', style({ opacity: 1, transform: 'rotate(0deg)' })),
            transition('* => rotate', [
                style({ opacity: 0, transform: 'rotate(5deg)' }),
                animate('400ms ease-in-out'),
            ]),
            state(
                'rotateOut',
                style({ opacity: 0, transform: 'rotate(-5deg)' })
            ),
            transition('rotate => rotateOut', [
                style({ opacity: 1, transform: 'rotate(0deg)' }),
                animate('400ms ease-in-out'),
            ]),
        ]),
    ],
    selector: 'app-toast-item',
    templateUrl: './toast-item.component.html',
    styleUrls: ['./toast-item.component.scss'],
})
export class ToastItemComponent implements OnInit {
    @Input() toast: ToastMessage;
    @Input() index: number;

    timerPercentageRemaining: number = 0;
    counter$: Observable<number>;

    state: string = 'open';

    private stopTime = false;
    private timer: any;
    private framesPerSecond = 40;
    private sleepTime: number;
    private startTime: number;
    private endTime: number;
    private timeOut: number;

    statusToClass = {
        [ToastType.Bare]: '',
        [ToastType.Info]: '#0067FF',
        [ToastType.Error]: '#FE355A',
        [ToastType.Alert]: '#FE355A',
        [ToastType.Success]: '#00CC69',
    };

    constructor(
        private toastService: ToastService,
        private element: ElementRef,
        private zone: NgZone,
        private cdr: ChangeDetectorRef,
        private logger: NGXLogger
    ) {}

    ngOnInit() {
        this.timeOut = this.toast.timeOut || 5000;
        if (this.toast.timeOut !== 0 && this.toast.autoClose === true) {
            this.startTimeout();
        }

        const className = this.statusToClass[this.toast.type];
        this.logger.debug(
            'toast-item.component',
            'ngOnInit',
            'Class is',
            className
        );
        if (!this.toast.position) {
            this.logger.debug(
                'toast-item.component',
                'ngOnInit',
                'setting default type',
                ToastPosition.Top
            );
            this.toast.position = ToastPosition.Top;
        }

        this.element.nativeElement.style.setProperty(
            '--ngx-notification-msg-color',
            this.statusToClass[this.toast.type]
        );
        this.element.nativeElement.style.setProperty(
            '--ngx-notification-msg-delay',
            `${this.toast.timeOut}ms`
        );
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
    getPosition(): IToastPosition {
        const pos = {
            ...this.getDefaultPosition(),
            ...this.getDynamicPosition(),
        };
        return pos;
    }
    private getDefaultPosition(): IToastPosition {
        switch (this.toast.position) {
            case ToastPosition.Top:
                return {
                    top: '0',
                    right: '50%',
                    transform: `translate(50%, -100%)`,
                };
            case ToastPosition.TopRight:
                return {
                    top: '0',
                    right: '20px',
                    transform: `translateY(-100%)`,
                };
            case ToastPosition.TopLeft:
                return {
                    top: '0',
                    left: '20px',
                    transform: `translateY(-100%)`,
                };
            case ToastPosition.Bottom:
                return {
                    bottom: '0',
                    right: '50%',
                    transform: `translateX(50%)`,
                };
            case ToastPosition.BottomRight:
                return {
                    bottom: '0',
                    right: '20px',
                    transform: `translateY(100%)`,
                };
            case ToastPosition.BottomLeft:
                return {
                    bottom: '0',
                    left: '20px',
                    transform: `translateY(100%)`,
                };
        }
    }

    private getDynamicPosition(): IToastPosition {
        const top = `calc(${100 * this.index}% + ${20 * (this.index + 1)}px)`;
        const bottom = `calc(${-100 * this.index}% + ${
            -20 * (this.index + 1)
        }px)`;

        switch (this.toast.position) {
            case ToastPosition.Top:
                return { transform: `translate(50%, ${top})` };
            case ToastPosition.TopRight:
                return { transform: `translateY(${top})` };
            case ToastPosition.TopLeft:
                return { transform: `translateY(${top})` };
            case ToastPosition.Bottom:
                return { transform: `translate(50%, ${bottom})` };
            case ToastPosition.BottomRight:
                return { transform: `translateY(${bottom})` };
            case ToastPosition.BottomLeft:
                return { transform: `translateY(${bottom})` };
        }
    }
    close() {
        this.remove();
    }
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
