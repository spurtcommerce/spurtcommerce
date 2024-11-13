import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../../../../src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class YoutubeService {
  private apiKey = 'AIzaSyCB0i6xz37S3LzY8-STMCnUhqrcaEL5eYk';
  private apiUrl = 'https://www.googleapis.com/youtube/v3/videos';

  constructor(private http: HttpClient) {}

  getVideoDuration(videoId: string): Observable<string> {
    const url = `${this.apiUrl}?part=contentDetails&id=${videoId}&key=${this.apiKey}`;

    return this.http.get<any>(url).pipe(
      map(response => {
        if (response.items && response.items.length > 0) {
          const duration = response.items[0].contentDetails.duration;
          return this.formatDuration(duration);
        }
        return '';
      })
    );
  }

  private formatDuration(duration: string): string {
    return duration.replace('PT', '').replace('H', ' hours ').replace('M', ' minutes ').replace('S', ' seconds');
  }
}