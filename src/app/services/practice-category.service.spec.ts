import { TestBed } from '@angular/core/testing';

import { PracticeCategoryService } from './practice-category.service';

describe('PracticeCategoryService', () => {
  let service: PracticeCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticeCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
