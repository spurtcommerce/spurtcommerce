import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-common-product-static',
  templateUrl: './common-product-static.component.html',
  styleUrl: './common-product-static.component.scss'
})
export class CommonProductStaticComponent {
// video
videoId: string = 'VFwo1ozpxxI'; // Replace with your video ID
videoUrl: SafeResourceUrl;
  constructor(
    public titleService: Title,
    private sanitizer: DomSanitizer
  ) { 
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
    titleService.setTitle('Common Products');
  }
}
