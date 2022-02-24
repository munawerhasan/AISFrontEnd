import { TestBed } from '@angular/core/testing';

import { MasterclassService } from './masterclass.service';

describe('MasterclassService', () => {
  let service: MasterclassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterclassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
