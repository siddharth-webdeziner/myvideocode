import { TestBed, inject } from '@angular/core/testing';

import { PopulatenewsService } from './populatenews.service';

describe('PopulatenewsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PopulatenewsService]
    });
  });

  it('should be created', inject([PopulatenewsService], (service: PopulatenewsService) => {
    expect(service).toBeTruthy();
  }));
});
