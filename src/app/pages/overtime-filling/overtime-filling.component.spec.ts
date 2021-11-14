import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeFillingComponent } from './overtime-filling.component';

describe('OvertimeFillingComponent', () => {
  let component: OvertimeFillingComponent;
  let fixture: ComponentFixture<OvertimeFillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvertimeFillingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeFillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
