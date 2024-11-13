import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-posts-static',
  templateUrl: './posts-static.component.html',
  styleUrl: './posts-static.component.scss'
})
export class PostsStaticComponent {
// video
videoId: string = 'IeldjVHOLys'; // Replace with your video ID
videoUrl: SafeResourceUrl;
  constructor(
    public titleService: Title,
    private sanitizer: DomSanitizer
  ) { 
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
    titleService.setTitle('Blogs');
  }
}
