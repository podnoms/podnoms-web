import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DebugRoutingModule } from './debug-routing.module';
import { DebugComponent } from './debug.component';
import { SignalRComponent } from './signalr/signalr.component';
import { RemotePageParserComponent } from 'app/podcasts/entry-upload/remote-page-parser/remote-page-parser.component';
@NgModule({
    imports: [CommonModule, SharedModule, DebugRoutingModule],
    declarations: [DebugComponent, SignalRComponent, RemotePageParserComponent]
})
export class DebugModule {}
