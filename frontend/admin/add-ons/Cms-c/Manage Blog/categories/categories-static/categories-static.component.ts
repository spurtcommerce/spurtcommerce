import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-categories-static',
  templateUrl: './categories-static.component.html',
  styleUrl: './categories-static.component.scss'
})
export class CategoriesStaticComponent {
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
