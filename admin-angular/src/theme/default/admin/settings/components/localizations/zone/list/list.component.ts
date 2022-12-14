/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ZoneService } from '../../../../../../../../core/admin/settings/localizations/zone/zone.service';
import { ZoneSandbox } from '../../../../../../../../core/admin/settings/localizations/zone/zone.sandbox';
import { DeleteConfirmationDialogComponent } from '../../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ZoneAddComponent } from './../add/add.component';


@Component({
  selector: 'app-settings-zone-list',
  templateUrl: './list.component.html',
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
export class ZoneListComponent implements OnInit {
  public type = 'edit';
  public pageSize = '5';
  private keyword = '';
  private offset: any;
  private isCount: boolean;
  public currentPage: any;
  public index: any;
  private popoverContent: any;

  constructor(
    public modal: NgbModal,
    private router: Router,
    public zoneSandbox: ZoneSandbox,
    public service: ZoneService
  ) {
    this.regSubscribeEvents();
  }

  ngOnInit() {
    this.pageSize = sessionStorage.getItem('itemsPerPage')
      ? sessionStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.isCount = true;
    this.getZonesList(this.offset);
    this.zoneSandbox.zoneAddLoaded$.subscribe(data => {
      if (data === true) {
        this.getZonesList(this.offset);
      }
    });

    this.zoneSandbox.zoneUpdateLoaded$.subscribe(data => {
      if (data === true) {
        this.getZonesList(this.offset);
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
   * Handles  'getZonesList' event. Calls sandbox getZoneList  and getzonepagination function .
   *
   * @param offset from material paginator
   * @param params storing pagination value
   */
  getZonesList(offset: number = 0) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    params.status = '';
    this.zoneSandbox.getZoneList(params);
    if (this.isCount) {
      params.count = true;
      this.zoneSandbox.getZonePagination(params);
    }
  }

  // navigate to add component
  addeNewZone(data, type) {
    const modalRef = this.modal.open(ZoneAddComponent, {
      windowClass: 'add-customers', keyboard: false, backdrop: 'static'
    });
    if (type === 'edit') {
      this.service.setzonelistdata(data);
      modalRef.componentInstance.edit = this.type;
      modalRef.componentInstance.id = data.countryId;
    } else {
      this.service.setzonelistdata('');
    }
  }

  // calls service setzonelistdata with argument (list).And navigate to edit component.
  editzone(list) {
    this.service.setzonelistdata(list);
    this.router.navigate(['/settings/local/zone/edit', list.zoneId]);
  }

  // calls getZonesList with argument(offset)for pagination
  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.getZonesList(this.offset);
  }

  /**  calls zoneSandbox zoneDelete with argument (zoneId)
   * calls stopPropagation function
   * */

  deleteZone(zoneId) {
    const modelRef = this.modal.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.zoneSandbox.zoneDelete({ zoneId: zoneId });
        this.regSubscribeEvents();
      }
    });
  }
  pageLength() {
    this.getZonesList();
  }

  /**  calls zoneSandbox  deleteZone$ if success reponse gotted then
   * calls getZonesList function with argument(offset).
   * */
  regSubscribeEvents() {
    this.zoneSandbox.deleteZone$.subscribe(_delete => {
      if (_delete && _delete.status === 1) {
        this.getZonesList(this.offset);
      }
    });
  }
}
