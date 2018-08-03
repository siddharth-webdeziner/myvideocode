import { TestBed, inject } from '@angular/core/testing';

import { VideodataService } from './videodata.service';

describe('VideodataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideodataService]
    });
  });

  it('should be created', inject([VideodataService], (service: VideodataService) => {
    expect(service).toBeTruthy();
  }));
});
