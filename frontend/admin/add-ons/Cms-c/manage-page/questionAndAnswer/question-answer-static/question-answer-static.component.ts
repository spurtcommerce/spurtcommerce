import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-question-answer-static',
  templateUrl: './question-answer-static.component.html',
  styleUrl: './question-answer-static.component.scss'
})
export class QuestionAnswerStaticComponent {
// video
videoId: string = 'QgsIUGi9Z1A'; // Replace with your video ID
videoUrl: SafeResourceUrl;
  constructor(
    public titleService: Title,
    private sanitizer: DomSanitizer
  ) { 
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
    titleService.setTitle('Question and Answer');
  }
}
