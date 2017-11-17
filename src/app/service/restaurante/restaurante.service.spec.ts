import { TestBed, inject } from '@angular/core/testing';

import { RestauranteService } from './restaurante.service';

describe('RestauranteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestauranteService]
    });
  });

  it('should be created', inject([RestauranteService], (service: RestauranteService) => {
    expect(service).toBeTruthy();
  }));
});
