import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-variant-static',
  templateUrl: './product-variant-static.component.html',
  styleUrl: './product-variant-static.component.scss'
})
export class ProductVariantStaticComponent {

// video
videoId: string = '4vsHUroaerA'; // Replace with your video ID
videoUrl: SafeResourceUrl;


  constructor(
    public titleService: Title,
    private sanitizer: DomSanitizer
  ) { 
    titleService.setTitle('Product Variant');
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
  }
}
