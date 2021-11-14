import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeManagementComponent } from './overtime-management.component';

describe('OvertimeManagementComponent', () => {
  let component: OvertimeManagementComponent;
  let fixture: ComponentFixture<OvertimeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvertimeManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
