/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CountrySandbox } from '../../../../../../../../core/admin/settings/localizations/country/country.sandbox';
import { CountryService } from '../../../../../../../../core/admin/settings/localizations/country/country.service';
import { CountriesAddComponent } from '../add/add.component';
import { DeleteConfirmationDialogComponent } from '../../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-country-list',
  templateUrl: 'list.component.html',
  styles: [`
  .settings-right-wrapper {
    margin-top: 0px !important;
}.coc{
  background: #f20a6d;
    border: solid thin #dddddd;
    color: white;
    padding: 4px 16px;
}`]
})
export class CountriesListComponent implements OnInit {
  public type = 'edit';
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
    public modal: NgbModal,
    private router: Router,
    public countrySandbox: CountrySandbox,
    public service: CountryService
  ) {
    this.regSubscribeEvents();
  }

  ngOnInit() {
    this.pageSize = sessionStorage.getItem('itemsPerPage')
      ? sessionStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.getCountryList(this.offset);

    this.countrySandbox.countryAddLoaded$.subscribe(data => {
      if (data === true) {
        this.getCountryList(this.offset);
      }
    });

    this.countrySandbox.updateCountryLoaded$.subscribe(data => {
      if (data === true) {
        this.getCountryList(this.offset);
      }
    });
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
    params.status = '';
    this.countrySandbox.getCountriesList(params);
    if (this.pagenationcount) {
      params.count = true;
      this.countrySandbox.getCountryCount(params);
    }
  }

  // Add New Country Navigate to Add Form
  addNewCountry(data, type) {
    const modalRef = this.modal.open(CountriesAddComponent, {
      windowClass: 'add-customers', keyboard: false, backdrop: 'static'
    });
    if (type === 'edit') {
      this.service.setcountrylistdata(data);
      modalRef.componentInstance.edit = this.type;
      modalRef.componentInstance.id = data.countryId;
    } else {
      this.service.setcountrylistdata('');
    }
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

  deleteCountry(countryId) {
    const modelRef = this.modal.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.countrySandbox.countryDelete({ countryId: countryId });
      }
    });
  }
  pageLength() {
    this.getCountryList();
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
