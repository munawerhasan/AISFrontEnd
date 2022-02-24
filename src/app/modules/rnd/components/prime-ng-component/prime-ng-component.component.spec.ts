import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeNgComponentComponent } from './prime-ng-component.component';

describe('PrimeNgComponentComponent', () => {
  let component: PrimeNgComponentComponent;
  let fixture: ComponentFixture<PrimeNgComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeNgComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeNgComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
