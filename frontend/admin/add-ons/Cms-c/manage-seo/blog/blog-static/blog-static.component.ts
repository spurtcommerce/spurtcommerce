import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-static',
  templateUrl: './blog-static.component.html',
  styleUrl: './blog-static.component.scss'
})
export class BlogStaticComponent {
// video
videoId: string = 'NOY6ILwN9K4'; // Replace with your video ID
videoUrl: SafeResourceUrl;
  constructor(
    public titleService: Title,
    private sanitizer: DomSanitizer
  ) { 
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
    titleService.setTitle('Blogs SEO');
  }
}
