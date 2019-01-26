import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { throwIfAlreadyLoaded } from './module-import-check';
import { AudioService } from './audio.service';
import { AuthService } from '../auth/auth.service';
import { AlertService } from './alert.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule // because we use <router-outlet> and routerLink
    ],
    providers: [AudioService, AuthService, AlertService]
})
export class CoreModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: CoreModule
    ) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
