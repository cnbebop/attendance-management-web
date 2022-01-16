import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    PagesModule,
    SharedModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'zh-CN'},
    {provide: MAT_DATE_FORMATS, useValue: {
      parse: {
        dateInput: 'YYYY-MM-DD',
      },
      display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'YYYY MMM',
        dateA11yLabel: 'LL',
        monthYearAllyLabel: 'YYY MMM',
      },
    }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
