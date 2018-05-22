import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ObservableInput, Observable } from 'rxjs';
import { Podcast } from '../../core';

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    constructor(private http: HttpClient, private auth: AuthService) {}
    upload(podcastSlug: string, image): Observable<Podcast> {
        const formData = new FormData();
        formData.append('file', image);
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.auth.getAuthToken());
        return this.http.post<Podcast>(
            `${environment.apiHost}/podcast/${podcastSlug}/imageupload`,
            formData
        );
    }
}
