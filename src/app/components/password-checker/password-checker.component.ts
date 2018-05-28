import {
    Component,
    SimpleChange,
    OnChanges,
    Input,
    Output,
    EventEmitter,
    OnInit
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { UtilityService } from '../../shared/services/utility.service';
@Component({
    selector: 'app-password-checker',
    templateUrl: './password-checker.component.html',
    styleUrls: ['./password-checker.component.scss']
})
export class PasswordCheckerComponent implements OnInit, OnChanges {
    private _repeatPassword: string;
    private _password: string;

    @Input() password: string;
    @Input() repeatPassword: string;
    @Output() errors: EventEmitter<string> = new EventEmitter<string>();

    error: string;
    strength: number = -1;
    strengthMessage: string;
    strengthPercentage: number;
    password$ = new Subject<string>();

    private defaultMessages = [
        'Not even nearly secure.',
        'You can do better',
        'Ok, I guess',
        // tslint:disable-next-line:quotemark
        'Excellent',
        'Perfection!!!'
    ];

    constructor(private utilityService: UtilityService) {
        this._password = this.password;
        this._repeatPassword = this.repeatPassword;
    }
    ngOnInit() {
        this.password$
            .pipe(
                debounceTime(400),
                distinctUntilChanged(),
                filter(term => term.length > 3),
                switchMap(term => this.utilityService.checkPassword(term))
            )
            .subscribe(r => {
                this._processStrength(r);
            });
    }
    private _processStrength(strength: number) {
        this.strength = strength;
        this.strengthMessage = this.defaultMessages[this.strength];

        this.strengthPercentage = (this.strength + 1) / this.defaultMessages.length * 100;
        console.log(
            'Strength',
            this.strength,
            this.strengthMessage,
            `${this.strengthPercentage}%`
        );
    }
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes && changes.password && changes.password.currentValue) {
            this._password = changes.password.currentValue;
            if (changes.password.currentValue.length > 3) {
                this.password$.next(changes.password.currentValue);
            } else {
                this._processStrength(0);
            }
        }
        if (changes.repeatPassword) {
            this._repeatPassword = changes.repeatPassword.currentValue;
        }
        if (this._password && this._repeatPassword && this._password !== this._repeatPassword) {
            this.error = 'Passwords do not match';
            if (this.errors) {
                this.errors.emit(this.error);
            }
        } else if (
            this._password &&
            this._repeatPassword &&
            this._password === this._repeatPassword
        ) {
            this.error = '';
            if (this.errors) {
                this.errors.emit('');
            }
        }
    }
}
