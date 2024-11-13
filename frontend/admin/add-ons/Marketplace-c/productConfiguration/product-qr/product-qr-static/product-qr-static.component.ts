import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-qr-static',
  templateUrl: './product-qr-static.component.html',
  styleUrl: './product-qr-static.component.scss'
})
export class ProductQrStaticComponent {
// video
videoId: string = 'rlZuev7kNEY'; // Replace with your video ID
videoUrl: SafeResourceUrl;
  constructor(
    public titleService: Title,
    private sanitizer: DomSanitizer
  ) { 
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
    titleService.setTitle('Product QR');
  }
}
