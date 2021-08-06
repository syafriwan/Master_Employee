import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'book.service',
  templateUrl: './book.service.component.html',
  styleUrls: ['./book.service.component.scss']
})
export class BookServiceComponent implements OnInit {
  public innerWidth: any;
  private exportTime = { hour: 9, minute: 0, meriden: 'AM', format: 24 };
  selectedCategory: string = 'US';
  onChangeHour(event: any) {
    console.log('event', event);
  }
  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }
  getHeight() {
    return this.innerWidth + 60;
  }
}
