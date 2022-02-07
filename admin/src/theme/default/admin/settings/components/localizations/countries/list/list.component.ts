/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CountrySandbox } from '../../../../../../../../core/admin/settings/localizations/country/country.sandbox';
import { CountryService } from '../../../../../../../../core/admin/settings/localizations/country/country.service';

@Component({
  selector: 'app-country-list',
  templateUrl: 'list.component.html',
  styles: [`
  .settings-right-wrapper {
    margin-top: 0px !important;
}`]
})
export class CountriesListComponent implements OnInit {
  // VARIABLES
  public pageSize = '10';
  public keyword = '';
  public id = '';
  public offset: number;
  public page: any;
  public currentPage: string;
  public index: number;
  private pagenationcount = true;
  private popoverContent: string;

  constructor(
    private router: Router,
    public countrySandbox: CountrySandbox,
    public service: CountryService
  ) {
    this.regSubscribeEvents();
  }

  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.getCountryList(this.offset);
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  /**
   * Handles form 'list' event. Calls sandbox get CountryList values.
   *
   * @param params entire form value
   */
  getCountryList(offset: number = 0) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    this.countrySandbox.getcountrieslist(params);
    if (this.pagenationcount) {
      params.count = true;
      this.countrySandbox.getCountryCount(params);
    }
  }

  // Add New Country Navigate to Add Form
  addNewCountry() {
    this.service.setcountrylistdata('');
    this.router.navigate(['/settings/local/countries/add']);
  }

  // Edit Navigate to Add Form
  editCountry(list) {
    this.service.setcountrylistdata(list);
    this.router.navigate(['/settings/local/countries/edit', list.countryId]);
  }

  // Pagination event
  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.getCountryList(this.offset);
  }

  /**
   * Handles form 'delete' event. Calls sandbox delete the perticular country.
   *
   */
  deleteCountry(countryId, deletePop) {
    event.stopPropagation();
    this.popoverContent = deletePop;
    this.countrySandbox.countryDelete({ countryId: countryId });
  }

  // delete event , subscripe status
  regSubscribeEvents() {
    this.countrySandbox.deleteCountry$.subscribe(_delete => {
      if (_delete && _delete.status === 1) {
        this.getCountryList(this.offset);
      }
    });
  }
}
