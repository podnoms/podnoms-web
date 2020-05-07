import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ObservableInput, Observable } from 'rxjs';
import { Podcast } from '../../core';
import { NgxFancyLoggerService } from 'ngx-fancy-logger';

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    constructor(
        private http: HttpClient,
        private logger: NgxFancyLoggerService
    ) {}
    upload(type: string, id: string, image: File): Observable<any> {
        const formData = new FormData();
        const headers = new HttpHeaders({ enctype: 'multipart/form-data' });
        formData.append('image', image);
        this.logger.debug('image.service', 'upload', formData);
        return this.http.post<string>(
            `${environment.apiHost}/${type}/${id}/imageupload?ngsw-bypass`,
            formData,
            { headers: headers }
        );
    }
    getRandom(): Observable<string> {
        return this.http.get(`${environment.apiHost}/utility/randomimage`, {
            responseType: 'text'
        });
    }
}
