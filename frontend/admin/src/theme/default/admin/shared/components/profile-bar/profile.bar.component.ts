/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
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
import { LayoutSandbox } from '../../../../../../core/admin/layout/layout.sandbox';
import { environment } from '../../../../../../environments/environment';
import { EditprofileSandbox } from 'src/core/admin/profile/editprofile/editprofile.sandbox';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { chatConversationComponentRoutes } from 'add-ons/add-ons.constant';

declare var $: any;

@Component({
  selector: 'app-profile-bar',
  templateUrl: './profile.bar.component.html',
  styleUrls: ['./profile.bar.component.scss']

})
export class ProfileBarComponent implements OnInit  {
  // event emitter
  @Output() toggleSidebar = new EventEmitter<void>();
  @Input() userDetails: any;
  @Output() logout: EventEmitter<any> = new EventEmitter();
  message: string;
  @ViewChild(EditprofileComponent) child;

  // variable
  public imageUrls: any;
  public image: any;
  role: any = {};
  isShowChat: boolean = true;


  public language: string;
  public imagePath: any;
  selectedLanguge: string;
  selectedImage: any;
  languageList:any=[];
  routerLinkCheck:any = {}
  

  constructor(
    public configService: ConfigService,
    public layoutSandbox: LayoutSandbox,
    public editProfileSandbox: EditprofileSandbox,
    public http:HttpClient,
    public translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.routerLinkCheck.chatConversation = chatConversationComponentRoutes
    this.editProfileSandbox.getProfile({});
    this.imageUrls = this.configService.getImageUrl();
    this.role = localStorage.getItem('adminUser')? JSON.parse(localStorage.getItem('adminUser')):JSON.parse(sessionStorage.getItem('adminUser'));
      this.vendorList();

      this.selectedLanguge = JSON.parse(localStorage.getItem('adminlanguage'));
    this.imagePath=environment.imageUrl;
  if(!this.selectedLanguge) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    localStorage.setItem('adminlanguage', JSON.stringify('en'));
    this.selectedLanguge = 'en';
  }else{
    this.translate.setDefaultLang(this.selectedLanguge);
    this.translate.use(this.selectedLanguge);
    localStorage.setItem('adminlanguage', JSON.stringify(this.selectedLanguge));
  }
  this.getLanguageList()
  }

  getImage(user) {
    return this.imageUrls + '?path=' +
    `${user.avatarPath}` + '&name=' +
    `${user.avatar}` +
    '&width=160&height=150';
  }

  getCount()
  {
    let val=JSON.parse(sessionStorage.getItem('msgCount'))
    return val??0;

  }
  vendorList(){
    
    }
  openPlugin() {
    window.open(environment.pluginUrl);
  }


  Event(e) {
    this.selectedLanguge = e;
    this.translate.setDefaultLang(e);
    this.translate.use(e);
    localStorage.setItem('adminlanguage', JSON.stringify(e));
    this.getLanguageImage()
  }


  getLanguageList() {
    const params = {
      limit: 0,
      offset: 0,
      keyword: '',
      count: 0,
    };
    this.layoutSandbox.languageList(params);
    this.layoutSandbox.languageList$.subscribe(val => {
      if (val) {
        this.languageList = val;
        this.getLanguageImage()
      }
    })
  }
  getLanguageImage() {
    this.selectedImage = this.languageList?.find(vals => vals.code == this.selectedLanguge);
  }



}
