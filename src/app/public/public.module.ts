import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharingComponent } from './sharing/sharing.component';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
    declarations: [SharingComponent],
    imports: [CommonModule, PublicRoutingModule]
})
export class PublicModule {}
