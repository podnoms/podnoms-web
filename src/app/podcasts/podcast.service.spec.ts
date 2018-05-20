import { TestBed, inject } from '@angular/core/testing';

import { PodcastStoreService } from './podcast-store.service';

describe('PodcastService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PodcastStoreService]
        });
    });

    it(
        'should be created',
        inject([PodcastStoreService], (service: PodcastStoreService) => {
            expect(service).toBeTruthy();
        })
    );
});
