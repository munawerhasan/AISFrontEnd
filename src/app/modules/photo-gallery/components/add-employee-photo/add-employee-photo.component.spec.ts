import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeePhotoComponent } from './add-employee-photo.component';

describe('AddEmployeePhotoComponent', () => {
  let component: AddEmployeePhotoComponent;
  let fixture: ComponentFixture<AddEmployeePhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmployeePhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
