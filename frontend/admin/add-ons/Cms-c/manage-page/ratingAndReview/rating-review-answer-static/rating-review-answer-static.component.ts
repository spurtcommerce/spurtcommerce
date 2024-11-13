import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-rating-review-answer-static',
  templateUrl: './rating-review-answer-static.component.html',
  styleUrl: './rating-review-answer-static.component.scss'
})
export class RatingReviewAnswerStaticComponent {
// video
videoId: string = 'YP9N_J7QJpo'; // Replace with your video ID
videoUrl: SafeResourceUrl;
  constructor(
    public titleService: Title,
    private sanitizer: DomSanitizer
  ) { 
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
    titleService.setTitle('Ratings and Review');
  }
}
