import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-static',
  templateUrl: './contact-static.component.html',
  styleUrl: './contact-static.component.scss'
})
export class ContactStaticComponent {
  // video
  videoId: string = 'BcILQoHfBzs'; // Replace with your video ID
  videoUrl: SafeResourceUrl;
  
  
  
    constructor(
      public titleService: Title,
      private sanitizer: DomSanitizer
    ) { 
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
      titleService.setTitle('Contact');
    }
}
