import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-varientinventory-static',
  templateUrl: './varientinventory-static.component.html',
  styleUrl: './varientinventory-static.component.scss'
})
export class VarientinventoryStaticComponent {
// video
videoId: string = 'jyejQZ7hxQk'; // Replace with your video ID
videoUrl: SafeResourceUrl;


  constructor(
    public titleService: Title,
    private sanitizer: DomSanitizer
  ) { 
    titleService.setTitle('Variant Stock Update');
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
  }
}
