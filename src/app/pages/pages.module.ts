import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OvertimeFillingComponent } from './overtime-filling/overtime-filling.component';
import { OvertimeManagementComponent } from './overtime-management/overtime-management.component';
import { SchedulingApplicationComponent } from './scheduling-application/scheduling-application.component';
import { SchedulingManagementComponent } from './scheduling-management/scheduling-management.component';


@NgModule({
  declarations: [
    OvertimeFillingComponent,
    OvertimeManagementComponent,
    SchedulingApplicationComponent,
    SchedulingManagementComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    OvertimeFillingComponent,
    OvertimeManagementComponent,
    SchedulingApplicationComponent,
    SchedulingManagementComponent
  ]
})
export class PagesModule { }
