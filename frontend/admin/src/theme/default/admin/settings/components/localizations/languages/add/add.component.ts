/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// angular common imports
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, Title } from '@angular/platform-browser';

// third party 
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

// Sandbox and services 
import { LanguagesSandbox } from '../../../../../../../../core/admin/settings/localizations/languages/languages.sandbox';
import { LanguagesService } from '../../../../../../../../core/admin/settings/localizations/languages/languages.service';
import { ConfigService } from '../../../../../../../../core/admin/service/config.service';
import { formFields } from './add.constant';
import { getFormControlsFieldsObj, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';

@Component({
  selector: 'app-settings-language-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class LanguageAddComponent implements OnInit {
  // Decorator 
  @ViewChild('filePath') filePath: ElementRef;

  // Reusable Form 
  _Object = Object;
  dynamicObjControls: any = {};
  private formObjFormGroup: UntypedFormGroup;
  backupFormValue: any = {};

  // list 
  public updateTitle: number;
  public ImageUrl: any = '';
  public languageInfo: any = [];
  private editLanguageId: any;

  // validation   
  public submitted = false;

  //image 
  public postImageUrl: any;
  image: any;
  public imageUrl: string;
  public imageTypeError = false;
  public imageSizeError = false;
  imageType: any;
  imageSize: number;
  imageTypeSupport: string;
  imageSizeSupport: string;

  // Arrow functions
  trackByIndex = (index: number): number => index;
  support: string;

  constructor(
    public modalService: NgbActiveModal,
    public fb: UntypedFormBuilder,
    private changeDetectRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    public Sandbox: LanguagesSandbox,
    public service: LanguagesService,
    private configService: ConfigService,
    public domsanitizer: DomSanitizer,
    public titleService: Title
  ) {
    this.titleService.setTitle('Settings | Localization');
    this.imageType = this.configService.getImageType();
    this.imageSize = this.configService.getFileSize();
    this.imageTypeSupport = this.configService.getimageTypeSupport();
    this.imageSizeSupport = this.configService.getimageSizeSupport();
    this.support = this.configService.getFileSupport();
  }

  ngOnInit() {
    // build form 
    this.buildForm();
    //intialization
    this.variableIntialize();
  }
  /**
   * Handles form 'submit' event. Calls sandbox Laguage UpdateLanguage and AddLanguage function if form is valid.
   *
   * @param language entire form value
   * @param params storing entire value
   */
  onSubmit() {
    this.submitted = true;
    if (this.formObjFormGroup.invalid || this.postImageUrl === './assets/upload-banner/upload.png') {
      this.validateAllFormFields(this.formObjFormGroup);
      return;
    }
    const params: any = {};
    params.code = this.formObjFormGroup.value.Code;
    params.name = this.formObjFormGroup.value.name;
    if (this.formObjFormGroup.value.status === 1) {
      params.status = '1';
    }
    if (this.formObjFormGroup.value.status === 0) {
      params.status = '0';
    }
    params.sortorder = Number(this.formObjFormGroup.value.sortorder);
    params.image = this.ImageUrl;
    if (this.languageInfo && this.languageInfo[0]) {
      params.languageId = this.languageInfo[0].languageId;
      this.Sandbox.updateLanguage(params);
      this.Sandbox.languageUpdateLoaded$.subscribe(val => {
        if (val === true) {
          this.close();
        }
      })
    } else {
      this.Sandbox.addLanguage(params);
      this.Sandbox.languageAddLoaded$.subscribe(val => {
        if (val === true) {
          this.close();
        }
      })
    }
    this.modalService.close('close');
  }

  // back to list
  close() {
    this.modalService.close('close');
  }

  // image upload
  uploadButtonClick() {
    const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
    el.click();
  }

  uploadChange($event): void {
    this.convertBase64($event.target);
    this.image = $event.target.files[0]?.name
  }

  private convertBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: any = new FileReader();

    if (!this.imageType.exec(inputValue.files[0]?.name)) {
      this.imageTypeError = true;
      this.ImageUrl = '';
      this.filePath.nativeElement.value = '';
      return;
    }
    this.imageTypeError = false;

    const size = Math.round(inputValue.files[0].size / 1024);
    if (size > this.imageSize) {
      this.imageSizeError = true;
      this.imageUrl = '';
      this.filePath.nativeElement.value = '';
      return;
    }
    this.imageSizeError = false;

    myReader.onloadend = e => {
      this.postImageUrl = this.domsanitizer.bypassSecurityTrustUrl(myReader.result);
      this.ImageUrl = myReader.result;
      this.changeDetectRef.detectChanges();
    };

    myReader.readAsDataURL(file);
  }


  private languageList() {
    this.languageInfo.push(this.service.languageGetData());
    if (this.languageInfo[0] !== null) {
      if (this.languageInfo[0] && this.languageInfo[0].name) {
        this.updateTitle = 1;
        if (!['',null,undefined].includes(this.postImageUrl)) {
          this.postImageUrl =
            this.imageUrl + '?path=' +
            `${this.languageInfo[0].imagePath}` + '&name=' +
            `${this.languageInfo[0].image}` +
            '&width=160&height=150';
        }else{
           this.postImageUrl = "/assets/img/add-image.svg"
        }
        this.changeDetectRef.detectChanges();
        this.formObjFormGroup.controls['name'].setValue(this.languageInfo[0].name);
        this.formObjFormGroup.controls['Code'].setValue(this.languageInfo[0].code);
        this.formObjFormGroup.controls['sortorder'].setValue(
          this.languageInfo[0].sortOrder
        );
        this.formObjFormGroup.controls['status'].setValue(
          this.languageInfo[0].isActive

        );
      }
    }
  }

  private validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  private variableIntialize() {
    this.imageUrl = this.configService.getImageUrl();
    this.editLanguageId = this.route.snapshot.paramMap.get('id');
    this.languageList();
  }

  // Intialize form
  private buildForm(): void {
    const formObjModel = formFields;
    const formGroupField = getFormControlsFieldsObj(formObjModel);
    this.formObjFormGroup = this.fb.group(formGroupField);
    Object.keys(formObjModel).forEach((element: any) => {
      this.dynamicObjControls[element] = getTypes(formObjModel[element], this.formObjFormGroup);
    });
  }

}
