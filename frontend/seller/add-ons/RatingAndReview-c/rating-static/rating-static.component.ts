import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-rating-static',
  templateUrl: './rating-static.component.html',
  styleUrl: './rating-static.component.scss'
})
export class RatingStaticComponent {
  // video
  videoId: string = 'YP9N_J7QJpo'; // Replace with your video ID
  videoUrl: SafeResourceUrl;
  
  
  
    constructor(
      public titleService: Title,
      private sanitizer: DomSanitizer
    ) { 
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
      titleService.setTitle('Rating and Review');
    }
}
