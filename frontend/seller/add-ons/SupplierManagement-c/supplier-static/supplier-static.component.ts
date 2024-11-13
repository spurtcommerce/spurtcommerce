import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-supplier-static',
  templateUrl: './supplier-static.component.html',
  styleUrl: './supplier-static.component.scss'
})
export class SupplierStaticComponent {
  // video
  videoId: string = 'BcILQoHfBzs'; // Replace with your video ID
  videoUrl: SafeResourceUrl;
  
  
  
    constructor(
      public titleService: Title,
      private sanitizer: DomSanitizer
    ) { 
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
      titleService.setTitle('Supplier');
    }
}
