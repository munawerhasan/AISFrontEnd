import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassWithSubjectComponent } from './class-with-subject.component';

describe('ClassWithSubjectComponent', () => {
  let component: ClassWithSubjectComponent;
  let fixture: ComponentFixture<ClassWithSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassWithSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassWithSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
