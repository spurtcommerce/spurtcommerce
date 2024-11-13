import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sellervideomodal',
  templateUrl: './sellervideomodal.component.html',
  styleUrls: ['./sellervideomodal.component.scss']
})
export class SellervideomodalComponent implements OnInit {

  video:any;
  FinalUrl: string;
  urlSafe: any;

  constructor(private activeModal: NgbActiveModal,public domSanitizer: DomSanitizer) { }

  ngOnInit(): void { 
    this.initialPlay();
  }
  
  initialPlay() {
    if (this.video?.url) {
      var dat = this.video?.url
      var urlsplit = dat.split(/^.*(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^\/]*?\/)*)\??v?=?([^#\&\?]*).*/);
      this.FinalUrl = "https://www.youtube.com/embed/" + urlsplit[3];
      this.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(this.FinalUrl);
    }
  }

  close(type = 'dismiss') {
    this.activeModal.close(type);
  }
  
}
