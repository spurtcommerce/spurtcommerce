import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../../../../../../../src/environments/environment';

@Component({
  selector: 'app-sellerdetailimage',
  templateUrl: './sellerdetailimage.component.html',
  styleUrls: ['./sellerdetailimage.component.scss']
})
export class SellerdetailimageComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  image: any;
  imageUrl:any;

  ngOnInit(): void {
    this.imageUrl = environment.imageUrl;
   }

  close(type = 'dismiss') {
    this.activeModal.close(type);
  }

}
