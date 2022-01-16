import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingApplicationComponent } from './scheduling-application.component';

describe('SchedulingApplicationComponent', () => {
  let component: SchedulingApplicationComponent;
  let fixture: ComponentFixture<SchedulingApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulingApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
