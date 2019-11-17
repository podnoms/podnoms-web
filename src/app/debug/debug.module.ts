import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DebugRoutingModule } from './debug-routing.module';
import { DebugComponent } from './debug.component';
import { SignalRComponent } from './signalr/signalr.component';
@NgModule({
    imports: [CommonModule, SharedModule, DebugRoutingModule],
    declarations: [DebugComponent, SignalRComponent]
})
export class DebugModule {}
