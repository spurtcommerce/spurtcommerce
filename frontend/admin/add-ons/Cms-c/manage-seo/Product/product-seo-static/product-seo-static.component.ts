import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-product-seo-static',
  templateUrl: './product-seo-static.component.html',
  styleUrl: './product-seo-static.component.scss'
})
export class ProductSeoStaticComponent {
// video
videoId: string = 'NOY6ILwN9K4'; // Replace with your video ID
videoUrl: SafeResourceUrl;
  constructor(
    public titleService: Title,
    private sanitizer: DomSanitizer
  ) { 
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
    titleService.setTitle('Product SEO');
  }
}
