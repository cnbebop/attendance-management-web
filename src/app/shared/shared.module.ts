import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { PipesModule } from '../shared/pipes/pipes.module';

const materialModules = [
  MatTableModule,
  MatSliderModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatDialogModule,
  MatSnackBarModule,
  MatButtonToggleModule,
  MatMomentDateModule,
];

const thirdModules = [
  NgxMatTimepickerModule,
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    PipesModule,
    ReactiveFormsModule,
    ...materialModules,
    ...thirdModules,
  ],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    PipesModule,
    ReactiveFormsModule,
    ...materialModules,
    ...thirdModules,
  ]
})
export class SharedModule { }
