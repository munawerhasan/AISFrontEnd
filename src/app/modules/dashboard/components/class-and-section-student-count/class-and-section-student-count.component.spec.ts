import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAndSectionStudentCountComponent } from './class-and-section-student-count.component';

describe('ClassAndSectionStudentCountComponent', () => {
  let component: ClassAndSectionStudentCountComponent;
  let fixture: ComponentFixture<ClassAndSectionStudentCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassAndSectionStudentCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassAndSectionStudentCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
