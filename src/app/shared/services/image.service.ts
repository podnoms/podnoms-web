import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ObservableInput, Observable } from 'rxjs';
import { Podcast } from '../../core';

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    constructor(private http: HttpClient) {}
    upload(podcastSlug: string, image: File): Observable<string> {
        const formData = new FormData();
        const headers = new HttpHeaders({ enctype: 'multipart/form-data' });
        formData.append('image', image);
        console.log('image.service', 'upload', formData);
        return this.http.post<string>(
            `${environment.apiHost}/podcast/${podcastSlug}/imageupload`,
            formData,
            { headers: headers }
        );
    }
}
