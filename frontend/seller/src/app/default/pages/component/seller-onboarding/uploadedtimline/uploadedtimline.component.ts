import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { sellerOnBoardingSandbox } from '../../../../../core/seller-onBoarding/sellerOnBoarding.sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-uploadedtimline',
  templateUrl: './uploadedtimline.component.html',
  styleUrls: ['./uploadedtimline.component.scss']
})
export class UploadedtimlineComponent implements OnInit {
  // Subscriptions
  private subscriptions: Subscription = new Subscription();
  @Input() documentId: any;
  data: any;
  constructor(private activeModal: NgbActiveModal,
    public sandbox: sellerOnBoardingSandbox
  ) { }

  ngOnInit(): void {

    this.timeLineData();
    // this.data.vendorDocumentLog = this.data?.vendorDocumentLog.reverse();
  }

  timeLineData() {
    this.sandbox.documentDetail({ id: this.documentId });
    this.subscriptions.add(this.sandbox.documentDetail$.subscribe(res => {
      this.data = res;

    }));
  }

  public dismiss() {
    this.activeModal.close();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}
