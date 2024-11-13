import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-data-export',
  templateUrl: './data-export.component.html',
  styleUrls: ['./data-export.component.scss']
})
export class DataExportComponent implements OnInit {

  constructor(public titleService: Title
  ){
    this.titleService.setTitle('Settings | System');   }

  ngOnInit(): void {
  }

}
