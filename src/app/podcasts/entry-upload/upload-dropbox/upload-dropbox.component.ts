import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Podcast, PodcastEntry } from '../../../core';
import { environment } from '../../../../environments/environment';
import { PodcastDataService } from '../../podcast-data.service';
declare var Dropbox: any;

@Component({
    selector: 'app-upload-dropbox',
    templateUrl: './upload-dropbox.component.html',
    styleUrls: ['./upload-dropbox.component.scss']
})
export class UploadDropboxComponent implements OnInit {
    loadDropboxAPI: Promise<any>;

    @Input() podcast: Podcast;
    @Output() entryCreateComplete: EventEmitter<any> = new EventEmitter();

    errorText: string;
    isPosting: boolean = false;

    constructor(private podcastDataService: PodcastDataService) {
        this.loadDropboxAPI = new Promise(resolve => {
            this.loadScript();
            resolve(true);
        });
    }
    public loadScript() {
        let isFound = false;
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; ++i) {
            if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes('dropins')) {
                isFound = true;
            }
        }

        if (!isFound) {
            const dynamicScripts = ['https://www.dropbox.com/static/api/2/dropins.js'];

            for (let i = 0; i < dynamicScripts.length; i++) {
                const node = document.createElement('script');
                node.setAttribute('data-app-key', environment.dropboxAppKey);
                node.src = dynamicScripts[i];
                node.id = 'dropboxjs';
                node.type = 'text/javascript';
                node.async = false;
                document.getElementsByTagName('head')[0].appendChild(node);
            }
        }
    }
    ngOnInit() {}

    browseDropbox() {
        const that = this;
        const options = {
            // Required. Called when a user selects an item in the Chooser.
            success: function(files) {
                that.isPosting = true;
                const urlToCheck = files[0].link;
                const entry = new PodcastEntry(that.podcast.id, urlToCheck);
                entry.title = files[0].name;
                that.podcastDataService.addEntry(entry).subscribe(
                    e => {
                        if (e) {
                            that.entryCreateComplete.emit(e);
                        }
                    },
                    err => {
                        that.isPosting = false;
                        if (err.status === 402) {
                            that.errorText =
                                'You have exceeded your allowable storage quota, please upgrade to a paid tier';
                        } else {
                            that.errorText = 'Unable to get file from Dropbox';
                        }
                    }
                );
            },
            linkType: 'direct', // or "direct"
            multiselect: false, // or true
            extensions: ['.mp3', '.wav'],
            folderselect: false // or true
        };

        Dropbox.choose(options);
    }
}
