import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WaveformService {
    constructor(private http: HttpClient) {}
    getForItem(id: string): Observable<string> {
        return this.http.get<any>(
            `${environment.apiHost}/waveform?entryId=${id}`
        ).pipe(map(r => r.peakDataJsonUrl));
    }
}
