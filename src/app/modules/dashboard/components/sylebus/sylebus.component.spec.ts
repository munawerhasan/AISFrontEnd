import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SylebusComponent } from './sylebus.component';

describe('SylebusComponent', () => {
  let component: SylebusComponent;
  let fixture: ComponentFixture<SylebusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SylebusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SylebusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
