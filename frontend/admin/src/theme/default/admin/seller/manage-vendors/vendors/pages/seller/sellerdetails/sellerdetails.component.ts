import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellervideomodalComponent } from '../sellervideomodal/sellervideomodal.component';
import { SellerdetailimageComponent } from '../sellerdetailimage/sellerdetailimage.component';
import { SellerSandbox } from '../../../../../../../../../../src/core/admin/vendor/pages/seller/seller.sandbox';
import { environment } from '../../../../../../../../../../src/environments/environment';
import { DocumentSandbox } from 'src/core/admin/vendor/pages/documents/document.sandbox';

@Component({
  selector: 'app-sellerdetails',
  templateUrl: './sellerdetails.component.html',
  styleUrls: ['./sellerdetails.component.scss']
})
export class SellerdetailsComponent implements OnInit {

  id: any;
  details: any;
  imageUrl: any;
  currencySymbol: any = JSON.parse(sessionStorage.getItem('adminCurrency'));
  
  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    public sellerSandbox: SellerSandbox,
    public documentSandbox: DocumentSandbox,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.imageUrl = environment.imageUrl;
    this.sellerDetails();
  }

  sellerDetails(): void {
    const params: any = {};
    params.id = this.id;
    this.sellerSandbox.pageDetails(params);
    this.sellerSandbox.pageDetails$.subscribe((val) => {
      if (val) {
        val.myShop.vendorMedia.forEach(element => {
          if (element.mediaType == 2) {
            element.youtubeImage = this.getThumNailIMage(element.url);
          }
        });
        this.details = val;
        this.ref.detectChanges();
      }
    });
  }

  // seller youtube video 
  opensellervideo(video): void {
    const modelRef = this.modalService.open(SellervideomodalComponent, {
      windowClass: 'd-block sellervideomodal', keyboard: false, backdrop: 'static', centered: true, animation: false,
    });
    modelRef.componentInstance.video = video;
  }

  getThumNailIMage(url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    if (match && match[2].length === 11) {
      return `https://img.youtube.com/vi/${match[2]}/0.jpg`;
    } else {
      const matches = url?.match(/vimeo.com\/(\d+)/)
      if (matches == null) {
        return url
      } else {
        return `https://vumbnail.com/${matches[1]}.jpg `
      }
    }
  }

  // seller image 
  opensellerimage(image): void {
    const modelRef = this.modalService.open(SellerdetailimageComponent, {
      windowClass: 'd-block sellerimagemodal', keyboard: false, backdrop: 'static', centered: true, animation: false,
    });
    modelRef.componentInstance.image = image;
  }

  // certificate download
  download(documents): void {
    const params: any = {}
    params.key = documents.filePath + documents.fileName;
    this.documentSandbox.downloadDocument(params);
  }

  close(type = 'dismiss'): void {
    this.activeModal.close(type);
  }

}
