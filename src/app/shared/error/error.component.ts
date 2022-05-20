import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements AfterViewInit {
  @Input()
  control: any;

  object: string;
  ngAfterViewInit(): void {
    console.log('error.component', 'ngAfterInit', this.control);
    this.object = JSON.stringify(this.control.errors);
  }
}
