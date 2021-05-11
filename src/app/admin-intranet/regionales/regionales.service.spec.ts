import { TestBed, inject } from '@angular/core/testing';

import { RegionalesService } from './regionales.service';

describe('RegionalesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegionalesService]
    });
  });

  it('should be created', inject([RegionalesService], (service: RegionalesService) => {
    expect(service).toBeTruthy();
  }));
});
