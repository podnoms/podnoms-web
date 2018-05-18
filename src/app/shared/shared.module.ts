import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderByPipe } from './pipes/order-by.pipe';
import { HumaniseTimePipe } from './pipes/humanise-time.pipe';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [FormsModule, ReactiveFormsModule, OrderByPipe, HumaniseTimePipe],
    declarations: [OrderByPipe, HumaniseTimePipe]
})
export class SharedModule {}
