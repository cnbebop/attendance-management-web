import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetDisplayedColumnsPipe } from './get-displayed-columns.pipe';



@NgModule({
  declarations: [
    GetDisplayedColumnsPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GetDisplayedColumnsPipe,
  ]
})
export class PipesModule { }
