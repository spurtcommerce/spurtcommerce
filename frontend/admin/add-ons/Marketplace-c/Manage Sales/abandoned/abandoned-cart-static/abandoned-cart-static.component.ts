import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-abandoned-cart-static',
  templateUrl: './abandoned-cart-static.component.html',
  styleUrl: './abandoned-cart-static.component.scss'
})
export class AbandonedCartStaticComponent {
// video
videoId: string = 'EDcTfrlYz_s'; // Replace with your video ID
videoUrl: SafeResourceUrl;
  constructor(
    public titleService: Title,
    private sanitizer: DomSanitizer
  ) { 
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
    titleService.setTitle('Abandoned Cart');
  }
}
