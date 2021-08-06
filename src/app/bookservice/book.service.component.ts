import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'book.service',
  templateUrl: './book.service.component.html',
  styleUrls: ['./book.service.component.scss']
})
export class BookServiceComponent implements OnInit {
  public innerWidth: any;
  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  getHeight(){
    console.log(this.innerWidth)
    return this.innerWidth
  }
}
