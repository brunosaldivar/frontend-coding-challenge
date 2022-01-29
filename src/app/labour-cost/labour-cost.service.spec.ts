import { TestBed } from '@angular/core/testing';

import { LabourCostService } from './labour-cost.service';

describe('LabourCostService', () => {
  let service: LabourCostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabourCostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
