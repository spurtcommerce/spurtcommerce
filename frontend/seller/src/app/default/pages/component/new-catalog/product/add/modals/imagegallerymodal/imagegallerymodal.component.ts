import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../../../../../../../src/environments/environment';

@Component({
  selector: 'app-imagegallerymodal',
  templateUrl: './imagegallerymodal.component.html',
  styleUrl: './imagegallerymodal.component.scss'
})
export class ImagegallerymodalComponent {
  primaryImage: any;
  imageGallery: any;
  video: any
  imageUrls: any;
  active: string
  index: number;
  primaryActice: string = 'active';
  image: any;
  productName: any;
  expandVideo: any;
  videoPlay: Boolean = false;
  primaryImageView:Boolean = true;
  @ViewChild('expandedVideoPlayer') expandedVideoPlayer!: ElementRef<HTMLVideoElement>;
  constructor(private activeModal: NgbActiveModal, private changeref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.imageUrls = environment.imageUrl;
    this.image = this.primaryImage[0];
  }

  imageactive(i, img): void {
    this.index = i
    this.primaryActice = ''
    this.image = img;
    this.videoPlay = false;
    this.primaryImageView = false;
    this.changeref.detectChanges();
    this.imageGallery = this.imageGallery
  }

  PrimaryImageChange(): void {
    this.videoPlay = false;
    this.primaryImageView = true;
    this.primaryActice = 'active';
    this.image = this.primaryImage[0]
  }
  expandVideosData(data: any): void {
    this.videoPlay = true;
    this.primaryImageView = false;
     this.primaryActice = 'active'
    this.expandVideo = data;
    setTimeout(() => {
      if (this.expandedVideoPlayer && this.expandedVideoPlayer.nativeElement) {
        this.expandedVideoPlayer.nativeElement.play();
      }
    }, 0);
  }

  public dismiss() {
    this.activeModal.close();
  }

}
