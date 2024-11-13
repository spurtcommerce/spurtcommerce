import { AuthSandbox } from './../../../../core/auth/auth.sandbox';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonSandbox } from '../../../../core/common/common.sandbox';
import { environment } from '../../../../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss']
})
export class CommonHeaderComponent implements OnInit {

  public userDetails = JSON.parse(localStorage.getItem('vendorUserDetails'));
  public userProfileDetails: any;
  public imageUrl = environment.imageUrl;
  token: any;
  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  constructor(public router: Router, public commonSandbox: CommonSandbox, public sandbox: AuthSandbox) { }

  ngOnInit() {


  }

  logout() {
    this.sandbox.doLogout({});
    localStorage.removeItem('vendorUserDetails');
    localStorage.removeItem('vendorUser');
    localStorage.removeItem('vendor-settings');
    localStorage.removeItem('vendorToken');
    this.router.navigate(['/auth/login']);
  }


  colorPalette(color) {
    localStorage.setItem('colorPalette', color);
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}
