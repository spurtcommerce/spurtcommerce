import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-chat-static',
  templateUrl: './chat-static.component.html',
  styleUrl: './chat-static.component.scss'
})
export class ChatStaticComponent {

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
