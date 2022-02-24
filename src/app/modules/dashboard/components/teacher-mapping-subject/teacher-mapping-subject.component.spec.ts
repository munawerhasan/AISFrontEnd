import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMappingSubjectComponent } from './teacher-mapping-subject.component';

describe('TeacherMappingSubjectComponent', () => {
  let component: TeacherMappingSubjectComponent;
  let fixture: ComponentFixture<TeacherMappingSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherMappingSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherMappingSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
