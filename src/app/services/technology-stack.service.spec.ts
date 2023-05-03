import { TestBed } from '@angular/core/testing';

import { TechnologyStackService } from './technology-stack.service';

describe('TechnologyStackService', () => {
  let service: TechnologyStackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnologyStackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
