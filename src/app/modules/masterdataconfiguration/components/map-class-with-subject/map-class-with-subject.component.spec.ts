import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapClassWithSubjectComponent } from './map-class-with-subject.component';

describe('MapClassWithSubjectComponent', () => {
  let component: MapClassWithSubjectComponent;
  let fixture: ComponentFixture<MapClassWithSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapClassWithSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapClassWithSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
