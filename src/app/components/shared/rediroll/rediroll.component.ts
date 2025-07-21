import { Component, OnInit, Inject, DOCUMENT } from '@angular/core';


@Component({
    selector: 'app-rediroll',
    templateUrl: './rediroll.component.html',
    styleUrls: ['./rediroll.component.scss'],
    standalone: false
})
export class RedirollComponent implements OnInit {
    constructor(@Inject(DOCUMENT) private document: Document) {}

    ngOnInit() {
        this.document.location.href =
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }
}
