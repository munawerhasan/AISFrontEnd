import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSectionMappingComponent } from './class-section-mapping.component';

describe('ClassSectionMappingComponent', () => {
  let component: ClassSectionMappingComponent;
  let fixture: ComponentFixture<ClassSectionMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassSectionMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassSectionMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
