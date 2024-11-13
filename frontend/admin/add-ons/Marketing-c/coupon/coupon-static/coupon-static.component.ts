import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-coupon-static',
  templateUrl: './coupon-static.component.html',
  styleUrl: './coupon-static.component.scss'
})
export class CouponStaticComponent {
// video
videoId: string = 'VfT7B271ON4'; // Replace with your video ID
videoUrl: SafeResourceUrl;
  constructor(
    public titleService: Title,
    private sanitizer: DomSanitizer
  ) { 
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
    titleService.setTitle('Coupon');
  }
}
