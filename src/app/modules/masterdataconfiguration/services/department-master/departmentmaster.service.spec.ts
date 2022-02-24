import { TestBed } from '@angular/core/testing';

import { DepartmentmasterService } from './departmentmaster.service';

describe('DepartmentmasterService', () => {
  let service: DepartmentmasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentmasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
