import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PodcastEntry, Podcast } from '../core';
import { Observable } from 'rxjs';
import { BasePageComponent } from '../shared/components/base-page/base-page.component';
import { EntryDataService } from './entry-data.service';

@Component({
    template: ''
})
export class BaseJsUploadComponent extends BasePageComponent {
    @Input() podcast: Podcast;
    @Output() entryCreateComplete: EventEmitter<any> = new EventEmitter();

    errorText: string;
    isPosting: boolean = false;
    extensionLists = {
        video: ['m4v', 'avi', 'mpg', 'mp4', 'webm'],
        audio: ['mp3', 'ogg', 'flac', 'aiff', 'm4a', 'wav'],
        image: ['jpg', 'gif', 'bmp', 'png']
    };
    mimeLists = {
        video: ['m4v', 'avi', 'mpg', 'mp4', 'webm'],
        audio: ['audio/mpeg', 'audio/mp4', 'audio/x-aiff', 'audio/ogg', 'audio/vorbis', 'audio/vnd.wav'],
        image: ['jpg', 'gif', 'bmp', 'png']
    };

    constructor(private podcastEntryDataService: EntryDataService) {
        super();
    }
    protected getMimeTypes(type: string) {
        return this.mimeLists[type];
    }
    protected getSupportedFileTypes(type: string): string[] {
        return this.extensionLists[type];
    }
    // One validation function for all file types
    protected isValidFileType(name: string, type: string) {
        return this.extensionLists[type].indexOf(name.split('.').pop()) > -1;
    }
    public cancelUpload() {
        this.entryCreateComplete.emit(null);
    }
    public loadScript(scriptUrl: string, nodeId: string, attributes: any) {
        let isFound = false;
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; ++i) {
            if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src') === scriptUrl) {
                isFound = true;
            }
        }

        if (!isFound) {
            const node = document.createElement('script');
            for (const key in attributes) {
                if (attributes.hasOwnProperty(key)) {
                    node.setAttribute(key, attributes[key]);
                }
            }
            node.src = scriptUrl;
            node.id = nodeId;
            node.type = 'text/javascript';
            node.async = false;
            document.getElementsByTagName('head')[0].appendChild(node);
        }
    }

    protected parseFileList(files: Array<any>) {
        this.isPosting = true;
        const that = this;
        files.forEach(file => {
            if (file && file.name && file.link) {
                that.processPodcast(file.name, file.link).subscribe(e => this.entryCreateComplete.emit(e));
            }
        });
    }
    public processPodcast(name: string, url: string): Observable<string> {
        const entry = new PodcastEntry(this.podcast.id, url);
        entry.title = name;
        return Observable.create(observer => {
            this.podcastEntryDataService.addEntry(entry).subscribe(
                e => {
                    if (e) {
                        observer.next(e);
                    }
                },
                err => {
                    this.isPosting = false;
                    if (err.status === 402) {
                        this.errorText =
                            'You have exceeded your allowable storage quota, please upgrade to a paid tier';
                    } else {
                        this.errorText = 'Unable to get file from Dropbox';
                    }
                }
            );
        });
    }
}
