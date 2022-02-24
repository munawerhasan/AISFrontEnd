import { TestBed } from '@angular/core/testing';

import { BatchmasterService } from './batchmaster.service';

describe('BatchmasterService', () => {
  let service: BatchmasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchmasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
