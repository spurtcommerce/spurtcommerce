import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-site-map-static',
  templateUrl: './site-map-static.component.html',
  styleUrl: './site-map-static.component.scss'
})
export class SiteMapStaticComponent {
// video
videoId: string = 'NOY6ILwN9K4'; // Replace with your video ID
videoUrl: SafeResourceUrl;
  constructor(
    public titleService: Title,
    private sanitizer: DomSanitizer
  ) { 
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
    titleService.setTitle('Site Map');
  }
}
