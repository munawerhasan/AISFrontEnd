import { TestBed } from '@angular/core/testing';

import { SubjectmasterService } from './subjectmaster.service';

describe('SubjectmasterService', () => {
  let service: SubjectmasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectmasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
