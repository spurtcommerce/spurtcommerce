// Angular Imports
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  FormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
// Third Party Imports
import { Subscription } from 'rxjs';
// Sandbox Imports
import { SettlementOrderSandbox } from '../../../../../../../../../../core/admin/vendor/vendor-settlements/settlement-order/settlement-order.sandbox';


@Component({
  selector: 'app-settlement-modal',
  templateUrl: 'settlement-modal.component.html',
  styleUrls: ['settlement-modal.component.scss']
})
export class SettlementOrderModalComponent implements OnInit, OnDestroy {
  @ViewChild('closeBtn') closeAddExpenseModal: ElementRef;
  // Form
  public SettleForm : UntypedFormGroup
  public currency: any;
  public settlementArray: any;
  public settlementAmount: any;
  public title = '';
  
  public submitted = false;
  public subscriptions: Array<Subscription> = [];
  public orderId = [];
  isSubmitted =false;
  
  public settlTitle = AbstractControl
  constructor(
    public fb: UntypedFormBuilder,
    private router: Router,
    public modalService: NgbModal,
    public sandbox: SettlementOrderSandbox,
    public modal: NgbActiveModal
  ) {}

  // Form
  get f() {
    return this.SettleForm.controls;
  }

  ngOnInit(): void {
    this.currency = sessionStorage.getItem('adminCurrency') ? JSON.parse(sessionStorage.getItem('adminCurrency')) : '';
    if (this.settlementArray.length > 0) {
      this.calculateSettlement();
    }
  }

  // Initial Form
  public _formGroup():void{
    this.SettleForm=this.fb.group({
      settlTitle: ['',Validators.required]

    })
  }

  // Calculation
  calculateSettlement() {
    let total = 0;
    this.settlementAmount = 0;
    this.settlementArray.forEach(data => {
      this.orderId.push(data.vendorOrderId);
      total += (+data.NetAmount);
      this.settlementAmount = total;
    });
    this.settlementAmount = this.settlementAmount ? this.settlementAmount.toFixed(2) : 0;
  }

  // Settlement
  makeSettlement() {
    this.isSubmitted = true;
    // if(!this.SettleForm.controls.valid)
    if (this.title !='') {
      const params: any = {};
      params.title = this.title;
      params.vendorOrderId = this.orderId;
      this.sandbox.makeSettlement(params);
      this.sandbox.makeSettlement$.subscribe(data => {
        if (data && data.status === 1) {
          this.title = ''
          this.modal.close('success');
          this.subscribe();
        }
      });
    }
    
  }

  // Remove Item
  removeSettlementItem(list) {
    this.orderId = [];
    this.settlementArray = this.settlementArray.filter(data => {
      if (data.vendorOrderId === list.vendorOrderId) {
        return false;
      } else {
        return true;
      }
    });
    this.calculateSettlement();
  }

  // Close Panel
  close() {
    this.modal.close();
  }

  // Subscribe
  subscribe() {
    this.subscriptions.push(this.sandbox.makeSettlement$.subscribe(data => {
         if (data && Object.keys(data).length && data.status === 1) {
           this.modal.close('success');
         }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(each => each.unsubscribe());
    this.settlementArray = [];
    this.orderId = [];
  }
}
