import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OvertimeFillingComponent } from './pages/overtime-filling/overtime-filling.component';
import { OvertimeManagementComponent } from './pages/overtime-management/overtime-management.component';

const routes: Routes = [
  {
    path: 'application',
    component: OvertimeFillingComponent,
  },
  {
    path: 'management',
    component: OvertimeManagementComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
