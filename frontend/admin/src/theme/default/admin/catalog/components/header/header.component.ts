/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, ChangeDetectionStrategy, OnInit, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-catalog-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogHeaderComponent implements OnInit {
  checked: boolean;
  quotationchecked: boolean;
  importChecked: boolean;
  constructor(public titleService: Title) {}

  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.checked = false;
    this.quotationchecked = false;
    this.importChecked = false;
  } 

  ngOnInit() {
    this.titleService.setTitle('Catalog');
  
    sessionStorage.removeItem('myKey');

  }
  onClick(e) {
    this.checked = true;
    this.quotationchecked = false;
    this.importChecked = false;
    sessionStorage.removeItem('myKey');
   
  }

  onImportClick(e) {
    this.checked = false;
    this.quotationchecked = false;
    this.importChecked = true;
    sessionStorage.removeItem('myKey');
  }

  quotation(e){
    this.quotationchecked = true;
    this.checked = false;
    this.importChecked = false;

  }
}
