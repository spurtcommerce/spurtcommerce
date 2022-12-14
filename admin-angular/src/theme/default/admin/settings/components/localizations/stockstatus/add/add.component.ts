/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { StockSandbox } from '../../../../../../../../core/admin/settings/localizations/stockStatus/stock.sandbox';
import { StockService } from '../../../../../../../../core/admin/settings/localizations/stockStatus/stock.service';

@Component({
  selector: 'app-settings-stockstatus-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class StockStatusAddComponent implements OnInit {
  private pagecount = 1;
  public stockStatusForm: FormGroup;
  public name: FormControl;
  public status: FormControl;
  private params: any = {};
  public submitted = false;
  public editedStockValue: any;
  public pagesize = '5';
  private offset: number;

  constructor(

    public modalService: NgbActiveModal,
    private fb: FormBuilder,
    private router: Router,
    private sandbox: StockSandbox,
    private stockService: StockService
  ) { }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  ngOnInit() {
    this.loadForm();
    this.editStockStatus();
  }

  loadForm() {
    this.name = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]);
    this.status = new FormControl(null, Validators.required);
    this.stockStatusForm = this.fb.group({
      name: this.name,
      status: this.status
    });
  }

  /**
   * Handles form 'submit' event. Calls sandbox StockStatus updateStock and addStock function .
   *
   * @param stockStatusForm entire form value
   * @param params storing entire value
   */
  onSubmit() {
    this.submitted = true;
    if (!this.stockStatusForm.valid) {
      this.validateAllFormFields(this.stockStatusForm);
      return;
    } else {
      this.params.name = this.stockStatusForm.value.name;
      this.params.status = this.stockStatusForm.value.status;
      if (this.editedStockValue) {
        this.params.stockStatusId = this.editedStockValue.stockStatusId;
        this.sandbox.updateStock(this.params);

        this.sandbox.getstockUpdate$.subscribe(val => {
          if (val) {
            this.stockList(this.offset, this.pagesize);
            this.router.navigate(['/settings/local/stock-status']);
          }
        });
      } else {
        this.sandbox.addStock(this.params);

        this.sandbox.getNewStock$.subscribe(val => {
          if (val) {
            this.stockList(this.offset, this.pagesize);
            this.router.navigate(['/settings/local/stock-status']);
          }
        });
      }
    }
    this.modalService.close('close');
  }

  stockList(offset: any = 0, pageSize) {
    const params: any = {};
    params.limit = pageSize;
    params.offset = offset;
    params.keyword = '';
    this.sandbox.stockStatusList(params);
    if (this.pagecount) {
      params.count = 1;
      this.sandbox.paginationStockStatusCount(params);
    }
  }

  // Cancle Navigate to StockStatus List Page
  close() {
    this.modalService.close('close');
  }
  cancel() {
    this.router.navigate(['/settings/local/stock-status']);
  }

  // validation for reactive form
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  editStockStatus() {
    this.editedStockValue = this.stockService.getStockEditedValue();
    if (this.editedStockValue) {
      this.name.setValue(this.editedStockValue.name);
      this.status.setValue(this.editedStockValue.isActive);
    }
  }
}
