import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ToastService } from './toast.service';
import { throwIfAlreadyLoaded } from './module-import-check';
import { NavbarComponent } from './navbar/navbar.component';
import { AudioService } from './audio.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule // because we use <router-outlet> and routerLink
    ],
    declarations: [NavbarComponent],
    exports: [NavbarComponent],
    providers: [ToastService, AudioService]
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
