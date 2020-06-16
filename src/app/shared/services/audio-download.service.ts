import { Injectable } from '@angular/core';
import { EntryDataService } from '../../podcasts/entry-data.service';
import { saveAs } from 'file-saver';
import { Observable, of } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class AudioDownloadService {
    constructor(private entryService: EntryDataService) {}

    downloadAudio(id: string): Observable<boolean> {
        const downloadUrl = this.entryService.getDownloadUrl(id);
        saveAs(downloadUrl);
        return of(true);
    }
}
