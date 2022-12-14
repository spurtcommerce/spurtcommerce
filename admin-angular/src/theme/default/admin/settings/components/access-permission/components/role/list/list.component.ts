/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RoleSandbox } from '../../../../../../../../../core/admin/settings/role/role.sandbox';
import { RoleApiClientService } from '../../../../../../../../../core/admin/settings/role/role.ApiClientService';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleAddComponent } from '../add/add.component';
import { DeleteConfirmationDialogComponent } from 'src/theme/default/admin/shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';

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
      .coc{
        background: #f20a6d;
    border: solid thin #dddddd;
    color: white;
    padding: 4px 16px;
    }
    `
  ]
})
export class RoleListComponent implements OnInit, OnDestroy {

  public roledetails: any = {};
  public pageSize = '10';
  private keyword = '';
  private offset: number;
  private currentPage: any;
  private index: any;
  private popoverContent: any;
  private subscriptions: Array<Subscription> = [];

  public type = 'edit';

  constructor(
    private router: Router,
    public appSandbox: RoleSandbox,
    public service: RoleApiClientService,
    public modalService: NgbModal,
  ) {
    this.regSubscribeEvents();
  }

  ngOnInit() {
    this.pageSize = sessionStorage.getItem('itemsPerPage');
    this.getRolelist(this.offset, this.pageSize);
    this.getRoleListCount(this.offset, this.pageSize);

    this.appSandbox.roleUpdateLoaded$.subscribe(data => {
      if (data === true) {
        this.getRolelist(this.offset, this.pageSize);
        this.getRoleListCount(this.offset, this.pageSize);
      }
    });

    this.appSandbox.roleAddLoaded$.subscribe(data => {
      if (data === true) {
        this.getRolelist(this.offset, this.pageSize);
        this.getRoleListCount(this.offset, this.pageSize);
      }
    });

  }

  addNewRole(data, type) {
    this.roledetails = null;
    this.service.rolesetdata(this.roledetails);
    const modalRef2 = this.modalService.open(RoleAddComponent, {
      windowClass: 'roles', backdrop: 'static', centered: true
    });
    if (type === 'edit') {
      this.roledetails = data;
      this.service.rolesetdata(this.roledetails);

      modalRef2.componentInstance.edit = this.type;
      modalRef2.componentInstance.id = data;
    }
    modalRef2.result.then(result => {
      if (result === 'close') {

      }
    });
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
    this.appSandbox.getRoleList(params);
  }



  /**
   * Handles form 'list' event. Calls sandbox Role getRolelistCount function .
   *
   * @param params storing entire value
   */
  getRoleListCount(offset: number = 0, pageSize) {
    const params: any = {};
    params.limit = pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    params.count = true;
    this.appSandbox.getpagination(params);
  }


  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    const offset = event.pageSize * event.pageIndex;
    this.getRolelist(offset, this.pageSize);
  }

  goToPermission(user) {
    const userDetail = JSON.parse(sessionStorage.getItem('adminUserdetail'))
      .userdetails;
    const details = { id: user.groupId, type: 'role', role: user.name };
    this.router.navigate(['/settings/access-and-permission/permission'], { queryParams: { user: JSON.stringify(details) } });
  }

  /**
   * Handles form 'delete' event. Calls sandbox delete the perticular role.
   *
   */
  deleteRole(Id) {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        const param: any = {};
        param.groupId = Id;
        this.appSandbox.deleteRole(param);
        this.appSandbox.roleDelete$.subscribe(_delete => {
          if (_delete) {
            if (_delete['status'] === 1) {
              this.getRolelist(0, this.pageSize);
              this.getRoleListCount(0, this.pageSize);
            }
          }
        });
      }
    });
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
