import { Component, Input, input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../../../../../../../src/environments/environment';
import * as moment from 'moment';
@Component({
  selector: 'app-reject-reason',
  templateUrl: './reject-reason.component.html',
  styleUrl: './reject-reason.component.scss'
})
export class RejectReasonComponent implements OnInit{
  @Input() rejectReason;
  @Input() productImage; 
  @Input() productName;
  imageUrls:any
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.imageUrls = environment.imageUrl;
    this.rejectReason.forEach(val=>{
      val.rejectDate = moment(val.date, 'YYYY-MM-DD HH:mm:ss').add(5, 'hours').add(30, 'minutes').format('DD-MM-YYYY hh:mm A');
  })
  this.rejectReason.reverse();
}

  public dismiss() {
    this.activeModal.close();
  }
}
