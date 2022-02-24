import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationMasterComponent } from './occupation-master.component';

describe('OccupationMasterComponent', () => {
  let component: OccupationMasterComponent;
  let fixture: ComponentFixture<OccupationMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupationMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
