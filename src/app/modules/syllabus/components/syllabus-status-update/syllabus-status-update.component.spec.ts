import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyllabusStatusUpdateComponent } from './syllabus-status-update.component';

describe('SyllabusStatusUpdateComponent', () => {
  let component: SyllabusStatusUpdateComponent;
  let fixture: ComponentFixture<SyllabusStatusUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyllabusStatusUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyllabusStatusUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
