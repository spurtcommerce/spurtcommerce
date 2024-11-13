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
  AfterViewInit,
  EventEmitter,
  Output,
  Input,
  OnInit
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutSandbox } from 'src/core/admin/layout/layout.sandbox';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements  OnInit {


  @Output() toggleSidebar = new EventEmitter<void>();
  @Input() userDetails: any;
  @Output() logout: EventEmitter<any> = new EventEmitter();
  public language: string;
  public imagePath: any;
  selectedLanguge: string;
  selectedImage: any;
  languageList:any=[];




  constructor(public translate: TranslateService,
    public layoutSandbox:LayoutSandbox,
    
    ) {
    

      // this.translate.setDefaultLang(JSON.parse(localStorage.getItem('language')));
  
    }

  
  openplugin() {
    window.open(environment.pluginUrl);
  }
  ngOnInit() {
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


  Event(e) {
    this.selectedLanguge = e;
    this.translate.setDefaultLang(e);
    this.translate.use(e);
    localStorage.setItem('adminlanguage', JSON.stringify(e));
    this.getLanguageImage()

  }


  getLanguageList() {
    const params= {
    limit: 0,    
    offset : 0,
    keyword : '',
    count : 0,
    };
    this.layoutSandbox.languageList(params);
    this.layoutSandbox.languageList$.subscribe(val=>{
      if(val){
        this.languageList = val;
        this.getLanguageImage()
      }
    })
  }
  getLanguageImage(){
    this.selectedImage = this.languageList?.find(vals=>vals.code==this.selectedLanguge);
  }




    }
  


