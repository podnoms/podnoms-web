import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DebugRoutingModule } from './debug-routing.module';
import { DebugComponent } from './debug.component';
@NgModule({
    imports: [CommonModule, SharedModule, DebugRoutingModule],
    declarations: [
        DebugComponent
    ]
})
export class DebugModule {}
