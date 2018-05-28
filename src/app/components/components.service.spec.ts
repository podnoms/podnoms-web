import { TestBed, inject } from '@angular/core/testing';

import { ComponentsService } from './components.service';

describe('ComponentsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ComponentsService]
        });
    });

    it(
        'should be created',
        inject([ComponentsService], (service: ComponentsService) => {
            expect(service).toBeTruthy();
        })
    );
});
