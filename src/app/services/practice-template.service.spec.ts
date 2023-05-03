import { TestBed } from '@angular/core/testing';

import { PracticeTemplateService } from './practice-template.service';

describe('PracticeTemplateService', () => {
  let service: PracticeTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticeTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
