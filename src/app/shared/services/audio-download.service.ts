import { Injectable } from '@angular/core';
import { EntryDataService } from '../../podcasts/entry-data.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AudioDownloadService {
    constructor(private entryService: EntryDataService) {}

    downloadAudio(id: string) {
    return this.entryService.getDownloadUrl(id).pipe(
            map(result => {
                if (result) {
                    this._sendDownloadXHR(result['url'], result['title']);
                }
            })
        );
    }
    _sendDownloadXHR(url: string, title: string): any {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';

        xhr.onload = function(e) {
            if (this['status'] === 200) {
                const downloadUrl = window.URL.createObjectURL(
                    new Blob([this['response']], {
                        type: 'application/audio'
                    })
                );
                const link = document.createElement('A');
                link.setAttribute('href', downloadUrl);
                link.setAttribute('download', `${title}.mp3`);
                link.appendChild(document.createTextNode('Download'));
                document.getElementsByTagName('body')[0].appendChild(link);

                link.click();
            }
        };
        xhr.send();
    }
}
