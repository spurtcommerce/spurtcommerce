import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-chat-statics',
  templateUrl: './chat-statics.component.html',
  styleUrl: './chat-statics.component.scss'
})
export class ChatStaticsComponent {
// video
videoId: string = 'uBPtpy80kig'; // Replace with your video ID
videoUrl: SafeResourceUrl;
  constructor(
    public titleService: Title,
    private sanitizer: DomSanitizer
  ) { 
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
    titleService.setTitle('Chat');
  }
}
