import { param } from 'jquery';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { Config } from 'protractor/built/config';
import { MyProfileSandbox } from "../../../../../core/myProfile/myProfile.sandbox";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {

  // Subscriptions
  private subscriptions: Subscription = new Subscription();
  @Input() changeMailDetails: any;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  otp: string;
  config: any = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };

  constructor(
    private activeModal: NgbActiveModal,
    public profileSandbox: MyProfileSandbox
  ) { }

  ngOnInit(): void {
  }

  onOtpChange(event) {
    this.otp = event;
  }

  verifyOTP() {
    if (this.otp?.length !== 6) {
      return
    }
    const params: any = {
      emailId: this.changeMailDetails?.emailId,
      otp: this.otp
    }
    this.profileSandbox.changeMailVerification(params);
    this.subscriptions.add(this.profileSandbox.changeMailVerification$.subscribe(res => {
      if (res.status == 1) {
        this.activeModal.close();
      }
    }));
  }

  resendOTP() {
    this.ngOtpInput.setValue("");
    const params: any = {
      emailId: this.changeMailDetails?.emailId,
      password: this.changeMailDetails?.password
    }
    this.profileSandbox.changeEmail(params);
  }

  close() {
    this.activeModal.close();
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}
