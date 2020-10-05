/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RoleSandbox } from '../../../../../../../core/admin/settings/role/role.sandbox';
import { RoleApiClientService } from '../../../../../../../core/admin/settings/role/role.ApiClientService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings-role-list',
  templateUrl: './list.component.html',
  styles: [
    `
      .settings-right-wrapper {
        margin-top: 0px !important;
      }

      .setting1-inner-header {
        margin-top: 40px !important;
      }
    `
  ]
})
export class RoleListComponent implements OnInit, OnDestroy {
  public Roledetails: any = {};
  public pageSize = '10';
  private keyword = '';
  private offset: number;
  private currentPage: any;
  private index: any;
  private popoverContent: any;
  private subscriptions: Array<Subscription> = [];

  constructor(
    private router: Router,
    public appSandbox: RoleSandbox,
    public service: RoleApiClientService
  ) {
    this.regSubscribeEvents();
  }

  // initially calls getRolelist,getpaginationRolelist with argument(offset)
  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage');
    this.getRolelist(this.offset, this.pageSize);
    this.getpaginationRolelist(this.offset, this.pageSize);
  }

  // Add New Role navigate to Add Form
  addNewrole() {
    this.Roledetails = null;
    this.service.rolesetdata(this.Roledetails);
    this.router.navigate(['/settings/role/add']);
  }

  /**
   * Handles form 'list' event. Calls sandbox Role getRolelist function .
   *
   * @param params storing entire value
   */
  getRolelist(offset: number = 0, pageSize) {
    const params: any = {};
    params.limit = pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    this.appSandbox.getRolelist(params);
  }

  /**
   * Handles form 'list' event. Calls sandbox Role getRolelistCount function .
   *
   * @param params storing entire value
   */
  getpaginationRolelist(offset: number = 0, pageSize) {
    const params: any = {};
    params.limit = pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    params.count = true;
    this.appSandbox.getpagination(params);
  }

  // Edit Role navigate to Add Form
  editRole(roleinfo) {
    this.Roledetails = roleinfo;
    this.service.rolesetdata(this.Roledetails);
    this.router.navigate(['/settings/role/edit', this.Roledetails.groupId]);
  }

  // Pagination Count
  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    const offset = event.pageSize * event.pageIndex;
    this.getRolelist(offset, this.pageSize);
  }

  /**
   * Handles form 'delete' event. Calls sandbox delete the perticular role.
   *
   */
  deleteRole(Id, deletePop) {
    this.popoverContent = deletePop;
    this.appSandbox.deleteRole({ groupId: Id });
  }
  // delete event , subscripe status
  regSubscribeEvents() {
    this.subscriptions.push(
      this.appSandbox.roleDelete$.subscribe(_delete => {
        if (_delete && _delete.status === 1) {
          this.getRolelist(this.offset, this.pageSize);
        }
      })
    );
  }
  ngOnDestroy() {
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
  }
}
