import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-quotation-static',
  templateUrl: './quotation-static.component.html',
  styleUrl: './quotation-static.component.scss'
})
export class QuotationStaticComponent {
  // video
  videoId: string = 'Z2d3CfOfeV0'; // Replace with your video ID
  videoUrl: SafeResourceUrl;
  
  
  
    constructor(
      public titleService: Title,
      private sanitizer: DomSanitizer
    ) { 
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
      titleService.setTitle('Quotation Request');
    }
}
