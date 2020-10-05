/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ZoneService } from '../../../../../../../../core/admin/settings/localizations/zone/zone.service';
import { ZoneSandbox } from '../../../../../../../../core/admin/settings/localizations/zone/zone.sandbox';

@Component({
  selector: 'app-settings-zone-list',
  templateUrl: './list.component.html',
  styles: [`
  .settings-right-wrapper {
    margin-top: 0px !important;
}`]
})
export class ZoneListComponent implements OnInit {
  // STYLING PUROPOSE

  public pageSize = '5';
  private keyword = '';
  private offset: any;
  private isCount: boolean;
  public currentPage: any;
  public index: any;
  private popoverContent: any;

  constructor(
    private router: Router,
    public zoneSandbox: ZoneSandbox,
    public service: ZoneService
  ) {
    this.regSubscribeEvents();
  }

  // initially calls getZonesList with argument( offset)
  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.isCount = true;
    this.getZonesList(this.offset);
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
    this.zoneSandbox.getZoneList(params);
    if (this.isCount) {
      params.count = true;
      this.zoneSandbox.getzonepagination(params);
    }
  }

  // navigate to add component
  AddeNewZone() {
    this.service.setzonelistdata('');
    this.router.navigate(['/settings/local/zone/add']);
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
  deleteZone(zoneId, deletePop) {
    event.stopPropagation();
    this.popoverContent = deletePop;
    this.zoneSandbox.zoneDelete({ zoneId: zoneId });
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
