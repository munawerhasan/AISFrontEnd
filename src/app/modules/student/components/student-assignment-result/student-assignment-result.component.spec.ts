import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAssignmentResultComponent } from './student-assignment-result.component';

describe('StudentAssignmentResultComponent', () => {
  let component: StudentAssignmentResultComponent;
  let fixture: ComponentFixture<StudentAssignmentResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAssignmentResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAssignmentResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
