import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapClassEmployeeSubjectComponent } from './map-class-employee-subject.component';

describe('MapClassEmployeeSubjectComponent', () => {
  let component: MapClassEmployeeSubjectComponent;
  let fixture: ComponentFixture<MapClassEmployeeSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapClassEmployeeSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapClassEmployeeSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
