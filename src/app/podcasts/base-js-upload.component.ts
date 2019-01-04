import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { KeyValue } from '@angular/common';
import { PodcastEntry, Podcast } from '../core';
import { PodcastDataService } from './podcast-data.service';
import { Observable } from 'rxjs';

@Component({
    template: ''
})
export class BaseJsUploadComponent {
    @Input() podcast: Podcast;
    @Output() entryCreateComplete: EventEmitter<any> = new EventEmitter();

    errorText: string;
    isPosting: boolean = false;

    constructor(private podcastDataService: PodcastDataService) {}

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

    public processPodcast(name: string, url: string): Observable<string> {
        const entry = new PodcastEntry(this.podcast.id, url);
        entry.title = name;
        return Observable.create(observer => {
            this.podcastDataService.addEntry(entry).subscribe(
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
