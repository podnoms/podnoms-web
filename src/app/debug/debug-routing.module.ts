import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { DebugComponent } from './debug.component';
import { SignalRComponent } from './signalr/signalr.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: DebugComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'signalr',
        pathMatch: 'full',
        component: SignalRComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DebugRoutingModule {}
