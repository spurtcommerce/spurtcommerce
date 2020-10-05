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
  // FormGroup Variable
  public stockStatusform: FormGroup;
  public name: FormControl;
  public status: FormControl;
  // Varibale
  private params: any = {};
  public submitted = false;
  public editedStockValue: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sandbox: StockSandbox,
    private stockService: StockService
  ) {}

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  // initially calls loadForm,editStockStatus function
  ngOnInit() {
    this.loadForm();
    this.editStockStatus();
  }

  // FormGroup
  loadForm() {
    this.name = new FormControl('', Validators.required);
    this.status = new FormControl('', Validators.required);
    this.stockStatusform = this.fb.group({
      name: this.name,
      status: this.status
    });
  }

  /**
   * Handles form 'submit' event. Calls sandbox StockStatus updateStock and addStock function .
   *
   * @param stockStatusform entire form value
   * @param params storing entire value
   */
  onSubmit() {
    this.submitted = true;
    if (!this.stockStatusform.valid) {
      this.validateAllFormFields(this.stockStatusform);
      return;
    } else {
      this.params.name = this.stockStatusform.value.name;
      this.params.status = this.stockStatusform.value.status;
      if (this.editedStockValue) {
        this.params.stockStatusId = this.editedStockValue.stockStatusId;
        this.sandbox.updateStock(this.params);
        this.sandbox.getstockUpdate$.subscribe(val => {
          if (val) {
            this.router.navigate(['/settings/local/stock-status']);
          }
        });
      } else {
        this.sandbox.addStock(this.params);
        this.sandbox.getNewStock$.subscribe(val => {
          if (val) {
            this.router.navigate(['/settings/local/stock-status']);
          }
        });
      }
    }
  }

  // Cancle Navigate to StockStatus List Page
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

  // Edit StockStatus Navigate to Add Form
  editStockStatus() {
    this.editedStockValue = this.stockService.getStockEditedValue();
    if (this.editedStockValue) {
      this.name.setValue(this.editedStockValue.name);
      this.status.setValue(this.editedStockValue.isActive);
    }
  }
}
