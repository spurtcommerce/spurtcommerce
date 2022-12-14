/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
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
import { LayoutSandbox } from '../../../../../../core/admin/layout/layout.sandbox';
import { environment } from '../../../../../../environments/environment';
import { EditprofileSandbox } from 'src/core/admin/profile/editprofile/editprofile.sandbox';

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
  public imageUrls: any;
  role: any = {};

  constructor(
    public configService: ConfigService,
    public layoutSandbox: LayoutSandbox,
    public editProfileSandbox: EditprofileSandbox
  ) {
  }

  ngOnInit(): void {
    this.editProfileSandbox.getProfile({});
    this.imageUrls = this.configService.getImageUrl();
    this.role = sessionStorage.getItem('adminUser')
      ? JSON.parse(sessionStorage.getItem('adminUser'))
      : {};
  }

}
