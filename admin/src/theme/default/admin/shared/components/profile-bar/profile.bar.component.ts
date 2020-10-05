/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { ConfigService } from '../../../../../../core/admin/service/config.service';
import { EditprofileComponent } from '../../../layout/editprofile/editprofile.component';
import { EditprofileService } from '../../../../../../core/admin/profile/editprofile/editprofile.service';

declare var $: any;

@Component({
  selector: 'app-profile-bar',
  templateUrl: './profile.bar.component.html'
})
export class ProfileBarComponent implements OnInit {
  // event emitter
  @Output() toggleSidebar = new EventEmitter<void>();
  @Input() userDetails: any;
  @Output() logout: EventEmitter<any> = new EventEmitter();
  message: string;
  @ViewChild(EditprofileComponent) child;

  // variable
  public Image: any;
  public imageUrls: any;
  public profileimage: any;

  constructor(
    public configService: ConfigService,
    public editProfileService: EditprofileService
  ) {
    // this.Image = this.imageUrls + '?width=160&height=150&path=' + `${this.profileData.avatarPath}` + '&name=' +
  }

  ngOnInit(): void {
    this.imageUrls = this.configService.getImageUrl();

    this.editProfileService.subject.subscribe(data => {
      this.profileimage = data.userdetails;
    });
  }
}
