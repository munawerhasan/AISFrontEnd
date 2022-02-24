import { TestBed } from '@angular/core/testing';

import { DocumentmasterService } from './documentmaster.service';

describe('DocumentmasterService', () => {
  let service: DocumentmasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentmasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
