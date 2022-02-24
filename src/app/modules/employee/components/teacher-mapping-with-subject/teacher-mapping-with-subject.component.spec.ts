import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMappingWithSubjectComponent } from './teacher-mapping-with-subject.component';

describe('TeacherMappingWithSubjectComponent', () => {
  let component: TeacherMappingWithSubjectComponent;
  let fixture: ComponentFixture<TeacherMappingWithSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherMappingWithSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherMappingWithSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
