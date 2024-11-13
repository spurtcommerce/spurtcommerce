// Angular Imports
import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
// Third Party Imports
import { Subscription } from 'rxjs';
// Sandbox Imports
import { SettlementHistorySandbox } from '../../../../../../../../../../core/admin/vendor/vendor-settlements/settlement-history/settlement-history.sandbox';


@Component({
  selector: 'app-settlement-history-modal',
  templateUrl: 'settlement-history-modal.component.html',
  styleUrls: ['settlement-history-modal.component.scss']
})
export class SettlementHistoryModalComponent implements OnInit, OnDestroy {

  public currency: any;
  public title: any = '';
  public submitted = false;
  public subscriptions: Array<Subscription> = [];
  public details: any = {};
  public id: any;

  constructor(
    public modalService: NgbModal,
    public sandbox: SettlementHistorySandbox,
    public modal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    // Detail
    if (this.details) {
        this.id = this.details.id;
        const params: any = {};
        params.id = this.id;
        this.sandbox.getSettlementDetails(params);
    }
    this.currency = JSON.parse(sessionStorage.getItem('adminCurrency'));
  }

  close(): void {
    this.modal.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
