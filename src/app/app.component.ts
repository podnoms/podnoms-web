import { Component, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    @HostBinding('class') public cssClass = 'app header-fixed aside-menu-fixed aside-menu-hidden pace-done sidebar-hidden';

    constructor() {
    }
}
