import { Component, Input } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Podcast, PodcastEntry } from '../../../core';
import { AlertService } from '../../../core/alerts/alert.service';
import { EntryDataService } from '../../../podcasts/entry-data.service';
import { PodcastStoreService } from '../../../podcasts/podcast-store.service';
import { UiStateService } from './../../../core/ui-state.service';

@Component({
    selector: 'app-sidebar-podcast-item',
    templateUrl: './sidebar-podcast-item.component.html',
    styleUrls: ['./sidebar-podcast-item.component.scss'],
})
export class SidebarPodcastItemComponent {
    @Input()
    podcast: Podcast;

    newEpisodes: boolean = false;
    constructor(
        private alertService: AlertService,
        private uiStateService: UiStateService,
        private entryDataService: EntryDataService,
        private podcastStoreService: PodcastStoreService,
        protected logger: NGXLogger
    ) {}

    dragover($event: DragEvent) {
        $event.preventDefault();
    }
    drop($event: DragEvent) {
        this.logger.debug('sidebar.component.ts', 'drop', $event);
        const entry: PodcastEntry = JSON.parse(
            $event.dataTransfer.getData('text/plain')
        );
        this.logger.debug('sidebar.component.ts', 'data:entry:id', entry);
        this.podcastStoreService.getByKey(entry.podcastId).subscribe((p) => {
            p.podcastEntries = p.podcastEntries.filter(
                (obj) => obj.id !== entry.id
            );
            this.podcast.podcastEntries.push(entry);
            this.podcastStoreService.updateOneInCache(p);
            this.podcastStoreService.updateOneInCache(this.podcast);
            entry.podcastId = this.podcast.id;
            this.entryDataService.updateEntry(entry).subscribe(() => {
                this.alertService.success('Success', 'Entry moved');
            });
        });
    }
    closeSidebar() {
        this.uiStateService.closeMobileSidebar();
    }
}
