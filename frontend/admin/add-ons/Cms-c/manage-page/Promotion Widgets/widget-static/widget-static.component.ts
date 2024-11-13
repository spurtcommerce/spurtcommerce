import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-widget-static',
  templateUrl: './widget-static.component.html',
  styleUrl: './widget-static.component.scss'
})
export class WidgetStaticComponent {
// video
videoId: string = 'V1MDPulm3FQ'; // Replace with your video ID
videoUrl: SafeResourceUrl;
  constructor(
    public titleService: Title,
    private sanitizer: DomSanitizer
  ) { 
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
    titleService.setTitle('Promotion Widgets');
  }
}
