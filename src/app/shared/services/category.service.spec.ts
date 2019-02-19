import { TestBed, inject } from '@angular/core/testing';

import { CategoryService } from './category.service';

describe('CategoryServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryService]
    });
  });

  it('should be created', inject([CategoryService], (service: CategoryService) => {
    expect(service).toBeTruthy();
  }));
});
