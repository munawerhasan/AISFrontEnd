import { TestBed } from '@angular/core/testing';

import { OccpationmasterService } from './occpationmaster.service';

describe('OccpationmasterService', () => {
  let service: OccpationmasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OccpationmasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
