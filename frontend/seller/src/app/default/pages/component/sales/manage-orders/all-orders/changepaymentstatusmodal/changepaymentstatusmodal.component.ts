import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderSandbox } from '../../../../../../../core/order/order.sandbox';

@Component({
  selector: 'app-changepaymentstatusmodal',
  templateUrl: './changepaymentstatusmodal.component.html',
  styleUrls: ['./changepaymentstatusmodal.component.scss']
})
export class ChangepaymentstatusmodalComponent implements OnInit {
  @Input() orderId: string;
  @Input() paymentStatus: string;

  constructor(private activeModal: NgbActiveModal, private orderSandbox: OrderSandbox) { }

  ngOnInit(): void {
  }

  public dismiss() {
    this.activeModal.close();
  }

  submit() {
    const params: any = {
      orderId: this.orderId,
      paymentStatusId: this.paymentStatus
    }
    this.orderSandbox.updatePaymentStatus(params);
    this.orderSandbox.updatePaymentStatus$.subscribe(res=> {
      if(res) {
        this.activeModal.close('success');
      }
    })
  }

}
