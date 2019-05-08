import { TestBed, inject } from '@angular/core/testing';

import { PodcastDataService } from './podcast-data.service';

describe('PodcastDataService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PodcastDataService]
        });
    });

    it(
        'should be created',
        inject([PodcastDataService], (service: PodcastDataService) => {
            expect(service).toBeTruthy();
        })
    );
});
