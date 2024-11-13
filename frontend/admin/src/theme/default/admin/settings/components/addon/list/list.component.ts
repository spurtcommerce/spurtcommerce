/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// angular common 
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

//component
import { PaymentAddComponent } from '../add/add.component';
// third party 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//Service
import { AddonService } from '../addon.service';
import { customTable } from './list.constant';

@Component({
  selector: 'app-settings-addon-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class PaymentListComponent implements OnInit {
  // Reusable common Table 
  dynamicColumnFields: any = structuredClone(customTable);

  // List 
  pluginList: any;
  pluginListLoading = false;

  constructor(
    public modal: NgbModal,
    public router: Router,
    private paymentService: AddonService,
    private cd: ChangeDetectorRef,
    public titleService: Title
  ) {
    this.titleService.setTitle('Settings | Addon');
    this.pluginListLoading = true;
  }

  ngOnInit() {
    // routeSubscribe 
    this.routeSubscribe()
  }
  

    /*Table Actions*/
    buttonAction(e: any): void {
      switch (e.key) {
        case "threeDotMenu":
          if (e.actionType == "Delete") {
          
          } else if (e.actionType == "Edit") {
            this.configurePlugin(e)
          }
          break;
  
      }
    }
  

  //configure plugin
  configurePlugin(data: any) {
    const modalRef = this.modal.open(PaymentAddComponent, {
      windowClass: 'add-local', keyboard: false, backdrop: 'static', centered: false, animation: false,
    });
    modalRef.componentInstance.pluginId = data.id;
    modalRef.componentInstance.pluginData = data;
    modalRef.result.then((result) => {
      if (result) {
      }
    });
  }

  onFilterChange(event: any, prodinfo) {
    const params: any = {};
    params.productId = prodinfo.productId;
    const addOnValue = event.target.checked;
    if (addOnValue === true) {
      this.paymentService.updatePluginStatus(prodinfo.id, { pluginStatus: '1' }).subscribe(
        {
          next: (result: any) => {
            this.cd.markForCheck();
            if (result) {
              sessionStorage.setItem('prodQrAddon', '')
              localStorage.setItem('prodQrAddon', '')
            }
          },
          error: (err: any) => {
          },
        });
    } else {
      this.paymentService.updatePluginStatus(prodinfo.id, { pluginStatus: '0' }).subscribe(
        {
          next: (result: any) => {
            this.cd.markForCheck();
            if (result) {
              sessionStorage.setItem('prodQrAddon', 'you dont have access for it, please enable addon');
              localStorage.setItem('prodQrAddon', 'you dont have access for it, please enable addon')
            }
          },
          error: (err: any) => {
          },
        });
    }
  }
  private routeSubscribe() {
    this.paymentService.pluginList({}).subscribe({
      next: (result: any) => {
        this.pluginListLoading = false;
        this.pluginList = result.data
        this.cd.markForCheck();
      },
      error: (err: any) => {
      },
    });
  }
}
