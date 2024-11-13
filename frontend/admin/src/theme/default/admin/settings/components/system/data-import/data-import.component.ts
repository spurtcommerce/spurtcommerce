import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-data-import',
  templateUrl: './data-import.component.html',
  styleUrls: ['./data-import.component.scss']
})
export class DataImportComponent implements OnInit {

  constructor(public titleService: Title
  ){
    this.titleService.setTitle('Settings | System');   
  }

  ngOnInit(): void {
  }

}
