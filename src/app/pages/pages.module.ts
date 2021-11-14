import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OvertimeFillingComponent } from './overtime-filling/overtime-filling.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { OvertimeManagementComponent } from './overtime-management/overtime-management.component';
import { MatTableModule } from '@angular/material/table';
import { PipesModule } from '../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    OvertimeFillingComponent,
    OvertimeManagementComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTableModule,
    PipesModule,
  ],
  exports: [
    OvertimeFillingComponent
  ]
})
export class PagesModule { }
