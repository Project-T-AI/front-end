import { TestBed } from '@angular/core/testing';

import { GeradorIaService } from './gerador-ia.service';

describe('GeradorIaService', () => {
  let service: GeradorIaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeradorIaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
