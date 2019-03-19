import { Component, OnInit, Input } from '@angular/core';
import { MasterDetailCommands, Podcast, PodcastEntry } from '../../../core';
import { LocalStorage } from 'ngx-store';
import { PodcastLocalStateService } from '../../../shared/services/podcast-local-state.service';
import { EntryDataService } from '../../../podcasts/entry-data.service';
import { PodcastStoreService } from '../../../podcasts/podcast-store.service';
import { DragDropService } from '../../../shared/services/drag-drop.service';
import { EntriesStoreService } from '../../../podcasts/entries-store.service';

@Component({
    selector: 'app-sidebar-podcast-item',
    templateUrl: './sidebar-podcast-item.component.html',
    styleUrls: ['./sidebar-podcast-item.component.scss']
})
export class SidebarPodcastItemComponent implements OnInit {
    @Input()
    podcast: Podcast;

    newEpisodes: boolean = false;
    constructor(
        private dragDropService: DragDropService,
        private entryDataService: EntryDataService,
        private podcastStoreService: PodcastStoreService
    ) {}

    ngOnInit() {}
    dragover($event: DragEvent) {
        $event.preventDefault();
    }
    drop($event: DragEvent) {
        console.log('sidebar.component.ts', 'drop', $event);
        const entry: PodcastEntry = JSON.parse($event.dataTransfer.getData('text/plain'));
        console.log('sidebar.component.ts', 'data:entry:id', entry);
        this.podcastStoreService.getByKey(entry.podcastId).subscribe(p => {
            p.podcastEntries = p.podcastEntries.filter(obj => obj.id !== entry.id);
            this.podcast.podcastEntries.push(entry);
            this.podcastStoreService.updateOneInCache(p);
            this.podcastStoreService.updateOneInCache(this.podcast);
        });
    }
}
