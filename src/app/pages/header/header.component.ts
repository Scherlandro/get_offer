import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] ,
  encapsulation:ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  title = 'scheduler';

  ngOnInit(): void {
  }



}
