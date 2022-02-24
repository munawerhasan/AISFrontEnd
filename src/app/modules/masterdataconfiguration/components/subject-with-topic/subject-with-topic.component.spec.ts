import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectWithTopicComponent } from './subject-with-topic.component';

describe('SubjectWithTopicComponent', () => {
  let component: SubjectWithTopicComponent;
  let fixture: ComponentFixture<SubjectWithTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectWithTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectWithTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
