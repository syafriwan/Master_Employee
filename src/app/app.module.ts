import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { AppRoutingModule, rc } from './app.routing';
import { DemoMaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialTimePickerModule } from '@candidosales/material-time-picker';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
// import {DialogComponent} from './helpers/dialog/dialog.component'
import { LOCALE_ID } from '@angular/core';
const lang = 'en-US';
@NgModule({
  imports: [
    BrowserModule,
    DemoMaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialTimePickerModule,
    NgxMatTimepickerModule.setLocale(lang)
  ],
  declarations: [AppComponent, rc],
  bootstrap: [AppComponent],
  entryComponents: [],
  providers: [{ provide: LOCALE_ID, useValue: lang }]
})
export class AppModule {}
