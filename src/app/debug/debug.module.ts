import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DebugRoutingModule } from './debug-routing.module';
import { DebugComponent } from './debug.component';
import { SharingComponent } from '../components/sharing/sharing.component';
@NgModule({
    imports: [CommonModule, SharedModule, DebugRoutingModule],
    declarations: [DebugComponent, SharingComponent]
})
export class DebugModule {}
