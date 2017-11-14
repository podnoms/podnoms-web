import { DropzoneDirective } from './dropzone.directive';
import { DropzoneComponent } from './dropzone.component';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    declarations: [DropzoneComponent, DropzoneDirective],
    exports: [CommonModule, DropzoneComponent, DropzoneDirective]
})
export class DropzoneModule {}
