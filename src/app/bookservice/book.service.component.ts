import { Component, OnInit, HostListener } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormControl } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};
@Component({
  selector: 'book.service',
  templateUrl: './book.service.component.html',
  styleUrls: ['./book.service.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class BookServiceComponent implements OnInit {
  public innerHeight: any;
  private exportTime = { hour: 9, minute: 0, meriden: 'AM', format: 24 };
  selectedCategory: string = 'US';
  selectedType: string = 'US';
  date = new FormControl(moment());
  price = 0;
  onChangeHour(event: any) {
    console.log('event', event);
  }
  ngOnInit() {
    this.innerHeight = window.innerHeight;
  }
  getHeight() {
    console.log(this.innerHeight);
    return this.innerHeight - 150;
  }
}
