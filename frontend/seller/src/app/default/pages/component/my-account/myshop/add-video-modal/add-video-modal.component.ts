import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from "@angular/platform-browser";
import { YoutubeService } from '../company-details/youtube.service';
@Component({
  selector: 'app-add-video-modal',
  templateUrl: './add-video-modal.component.html',
  styleUrls: ['./add-video-modal.component.scss']
})
export class AddVideoModalComponent implements OnInit {
  public VideoForm: UntypedFormGroup;
  FinalUrl: string;
  urlSafe: any = "";
  submitted: Boolean = false;
  videoPlay: Boolean = false;
  @Input() editObj;
  videoDuration: string;
  videoUrl: string;
  name: any
  constructor(private activeModal: NgbActiveModal, private modalService: NgbModal,
    public formBuilder: UntypedFormBuilder, public domSanitizer: DomSanitizer, public youtubeService: YoutubeService
  ) { }

  ngOnInit(): void {
    this.VideoForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      url: ['', [Validators.required, this.youtubeUrlValidator()]],
      isActive: [false]
    });
    if (!['', null, undefined].includes(this.editObj)) {
      this.VideoForm.controls['title'].setValue(this.editObj.title);
      this.VideoForm.controls['url'].setValue(this.editObj.url);
      this.VideoForm.controls['isActive'].setValue(this.editObj.isActive);
    }
  }
  youtubeUrlValidator(): ValidatorFn {
    const youtubeUrlPattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = youtubeUrlPattern.test(control.value);
      return isValid ? null : { 'invalidYoutubeUrl': { value: control.value } };
    };
  }

  embed() {
    this.videoPlay = true
    var dat = this.VideoForm.value.url
    var urlsplit = dat.split(/^.*(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^\/]*?\/)*)\??v?=?([^#\&\?]*).*/);
    this.FinalUrl = "https://www.youtube.com/embed/" + urlsplit[3];
    this.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(this.FinalUrl);
  }

  getThumNailIMage(url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);


    if (match && match[2].length === 11) {
      return `https://img.youtube.com/vi/${match[2]}/0.jpg`;


    } else {
      const matches = url.match(/vimeo.com\/(\d+)/)
      if (matches == null) {
        return url
      } else {

        return `https://vumbnail.com/${matches[1]}.jpg `
      }

    }
  }

  save() {
    this.submitted = true;

    this.videoUrl = this.VideoForm.value.url
    if (this.VideoForm.valid) {
      if (!['', null, undefined].includes(this.editObj)) {
        this.activeModal.close({ ...this.VideoForm.value, modelStatus: 'edit', thumbNail: this.getThumNailIMage(this.VideoForm.value.url) });
      } else {

        this.activeModal.close({ ...this.VideoForm.value, modelStatus: 'save', thumbNail: this.getThumNailIMage(this.VideoForm.value.url) });
      }
    }
  }
  getDuration() {
    const videoId = this.extractVideoId(this.videoUrl);
    if (videoId) {
      this.youtubeService.getVideoDuration(videoId).subscribe(duration => {
        this.videoDuration = duration;
      });
    } else {
      this.videoDuration = 'Invalid URL';
    }
  }
  private extractVideoId(url: string): string | null {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  public dismiss() {
    this.activeModal.close('close');
  }

}
