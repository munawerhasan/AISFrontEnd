import { TestBed } from '@angular/core/testing';

import { ClasssectionmappingService } from './classsectionmapping.service';

describe('ClasssectionmappingService', () => {
  let service: ClasssectionmappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasssectionmappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
