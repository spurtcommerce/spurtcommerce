import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-vendor-modal',
  templateUrl: './view-vendor-modal.component.html',
  styleUrls: ['./view-vendor-modal.component.scss']
})
export class ViewVendorModalComponent implements OnInit {
public details:any;
statusval:any;
  constructor(
    public activeModal:NgbActiveModal
  ) { }

  ngOnInit(): void {
      if(this.details){
        this.statusval=this.details.documentStatus== 1? this.statusval='1':this.details.documentStatus== 2? '2':'0';
      }
  }


  submit(){
    const params: any = {};
    params.documentStatus =this.statusval;
    params.id = this.details.customerDocumentId;
    this.activeModal.close(params);
  }

  close() {
    this.activeModal.close();
  }

}
