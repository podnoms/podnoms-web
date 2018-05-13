import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
    selector: 'app-boilerplate',
    templateUrl: './boilerplate.component.html',
    styleUrls: ['./boilerplate.component.css']
})
export class BoilerplateComponent extends BasePageComponent {
    title: string;
    content: string;
    constructor(route: ActivatedRoute, private _http: HttpClient) {
        super();
        route.params.subscribe((params) => {
            const key = params['key'];
            if (key !== undefined) {
                this.title = this.__toTitleCase(key);
            }
            this._http
                .get(`${environment.API_HOST}/boilerplate?key=${key}`, {
                    responseType: 'text'
                })
                .map((r) => {
                    console.log('boilerplate.component', r);
                    return r;
                })
                .subscribe((r) => (this.content = r));
        });
    }

    private __toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
}
