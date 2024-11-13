import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-assign-price-static',
  templateUrl: './assign-price-static.component.html',
  styleUrl: './assign-price-static.component.scss'
})
export class AssignPriceStaticComponent {
  // video
  videoId: string = '3H_vd_0MFCg'; // Replace with your video ID
  videoUrl: SafeResourceUrl;
  
  
  
    constructor(
      public titleService: Title,
      private sanitizer: DomSanitizer
    ) { 
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
      titleService.setTitle('Pricing');
    }
}
