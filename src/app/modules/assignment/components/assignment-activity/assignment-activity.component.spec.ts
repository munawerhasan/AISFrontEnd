import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentActivityComponent } from './assignment-activity.component';

describe('AssignmentActivityComponent', () => {
  let component: AssignmentActivityComponent;
  let fixture: ComponentFixture<AssignmentActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
