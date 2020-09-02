import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppComponent } from "./app.component";
import { DemoMaterialModule } from "./material-module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
// import {DialogComponent} from './helpers/dialog/dialog.component'
@NgModule({
  imports: [
    BrowserModule,
    DemoMaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  entryComponents: [],
  providers: [
  ]
})
export class AppModule {}