import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DebugRoutingModule } from './debug-routing.module';
import { DebugComponent } from './debug.component';
import { SignalRComponent } from './signalr/signalr.component';
import { ComponentsModule } from 'app/components/components.module';
@NgModule({
    imports: [CommonModule, SharedModule, ComponentsModule, DebugRoutingModule],
    declarations: [DebugComponent, SignalRComponent]
})
export class DebugModule {}
