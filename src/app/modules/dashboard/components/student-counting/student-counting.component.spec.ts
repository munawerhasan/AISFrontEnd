import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCountingComponent } from './student-counting.component';

describe('StudentCountingComponent', () => {
  let component: StudentCountingComponent;
  let fixture: ComponentFixture<StudentCountingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCountingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
