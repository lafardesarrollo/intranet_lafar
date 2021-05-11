import { TestBed, inject } from '@angular/core/testing';

import { CargosService } from './cargos.service';

describe('CargosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CargosService]
    });
  });

  it('should be created', inject([CargosService], (service: CargosService) => {
    expect(service).toBeTruthy();
  }));
});
