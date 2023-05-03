import { TestBed } from '@angular/core/testing';

import { DeliveryManagerService } from './delivery-manager.service';

describe('DeliveryManagerService', () => {
  let service: DeliveryManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
