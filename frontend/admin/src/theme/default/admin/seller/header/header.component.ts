import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.checked = false;
  }

  checked: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onclick(e){
    this.checked = true
  }

}
