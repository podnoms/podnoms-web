import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent extends BasePageComponent implements OnInit {
    constructor() {
        super();
    }

    ngOnInit() {}
}
