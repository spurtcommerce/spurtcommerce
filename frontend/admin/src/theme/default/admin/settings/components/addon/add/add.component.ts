/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
//  Amgular imports
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
// third party imports 
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

//Sandbox and service
import { ConfigService } from '../../../../../../../core/admin/service/config.service';
import { AddonService } from '../addon.service';
import * as _ from 'lodash';
interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}
interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}

interface JsonFormControls {
  name: string;
  label: string;
  value: string;
  type: string;
  options?: JsonFormControlOptions;
  required: boolean;
  validators: JsonFormValidators;
}

export interface JsonFormData {
  controls: JsonFormControls[];
}

@Component({
  selector: 'app-addon-config-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class PaymentAddComponent implements OnInit {
  // Decocrators 
  @ViewChild('filePath') filePath: ElementRef;
  @Input() pluginData: any;

  // Form 
  public myForm: UntypedFormGroup = this.fb.group({});
  public myForms: UntypedFormGroup = this.fb.group({});
  private pluginFormControl: any;

  // list 
  pluginId: number = 0;
  Simple: any;
  Advance: any;
  getdetails: any;
  // Json Format Interface 
  jsonFormData: JsonFormData
  image: any;
  // Validation 
  public imageTypeError = false;
  public imageSizeError = false;
  imageType: any;
  imageSize: number;
  imageSizeSupport: string;
  imageTypeSupport: string;
  public ImageUrl: any = '';
  public postImageUrl: any;
  public imageUrl: string;
  public submitted: boolean;
  public imageUploaded = false
  pluginStatus: any;
  support: string;

  constructor(
    public modalService: NgbActiveModal,
    public fb: UntypedFormBuilder,
    private changeDetectRef: ChangeDetectorRef,
    private configService: ConfigService,
    private paymentService: AddonService,
    public domsanitizer: DomSanitizer,
    public modal: NgbModal,
  ) { 
    this.imageUrl = this.configService.getImageUrl();
    this.imageType = this.configService.getImageType();
    this.imageSize = this.configService.getFileSize();
    this.imageTypeSupport = this.configService.getimageTypeSupport();
    this.imageSizeSupport = this.configService.getimageSizeSupport();
    this.support = this.configService.getFileSupport();

  }


  /**
   * Handles form 'ngOnInit' event. Calls initForm, languageList.
   *
   * get image url from configService.
   */
  ngOnInit() {
 
  if(this.pluginData.pluginName == 'ProductAttribute')
  {
       //Intialize Form
       this.initializeForm();
      // Specification enabler  
      this.simpleandAdvance();
  }
  else{
 
    //methods intialized here 
    this.FuntionIntializer()
  }
  }

  //Oncheckboxchange 
  onCheckboxChange(controlName: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.myForms.get(controlName)?.setValue(isChecked ? 1 : 0);
    if(controlName == "simple"){
  
          this.updatePluginDetail(1);
          this.myForms.get('advance')?.setValue(0, { emitEvent: false });
    }else{ 
         this.updatePluginDetail(0);
          this.myForms.get('simple')?.setValue(0, { emitEvent: false });
        
      }
    }
  


  //logo updated here
  updateLogo() {
    if (this.imageUploaded) {
      const params: any = {}
      params.image = this.postImageUrl
      this.paymentService.updatePluginLogo(this.pluginData.id, params).subscribe(res => {
        this.modalService.dismiss(true);
      })
    }
    else {
      this.modalService.dismiss(true);
    }
  }
  //Submit
  onSubmit() {
    this.submitted = true
    if (this.pluginId != 2) {
      if (!this.myForm.valid) {
        this.validateAllFormFields(this.myForm);
        return;
      }
      if (this.pluginData.pluginType == 'Payment' && !this.postImageUrl) {
        return
      }
      if (this.pluginId != 1) {
        this.updateLogo();
        this.modalService.dismiss(true);
      }
      this.paymentService.updatePluginSetting(this.pluginFormControl.postRoute, this.myForm.value).subscribe({
        next: (result: any) => {
          this.submitted = false
          if (this.pluginData.pluginType == 'Payment') {
            this.updateLogo();
          }
          this.modalService.dismiss(true);
        },
        error: (err: any) => {
        },
      });
    }
    else {
      if (!this.postImageUrl) {
        return
      }
      else {
        if (this.pluginData.pluginType == 'Payment') {
          this.updateLogo();
        }
        this.submitted = false;
        this.modalService.dismiss(true);
      }
    }
  }
  //close
  close() {
    this.modalService.close('close');
  }
  //CreateForm
  private createForm(controls: JsonFormControls[]) {
    if (controls) {
      this.jsonFormData = {
        controls
      };
      for (const control of controls) {
        const validatorsToAdd = [];
        if (control.validators) {
          for (const [key, value] of Object.entries(control.validators)) {
            switch (key) {
              case 'min':
                validatorsToAdd.push(Validators.min(value));
                break;
              case 'max':
                validatorsToAdd.push(Validators.max(value));
                break;
              case 'required':
                if (value) {
                  validatorsToAdd.push(Validators.required);
                }
                break;
              case 'requiredTrue':
                if (value) {
                  validatorsToAdd.push(Validators.requiredTrue);
                }
                break;
              case 'email':
                if (value) {
                  validatorsToAdd.push(Validators.email);
                }
                break;
              case 'minLength':
                validatorsToAdd.push(Validators.minLength(value));
                break;
              case 'maxLength':
                validatorsToAdd.push(Validators.maxLength(value));
                break;
              case 'pattern':
                validatorsToAdd.push(Validators.pattern(value));
                break;
              case 'nullValidator':
                if (value) {
                  validatorsToAdd.push(Validators.nullValidator);
                }
                break;
              default:
                break;
            }
          }
        }
        this.myForm.addControl(
          control.name,
          this.fb.control(control.value, validatorsToAdd)
        );
      }
    }
  }

  private simpleandAdvance() {
    this.paymentService.pluginDetail({ id: this.pluginId }).subscribe(result => {
      this.getdetails = JSON.parse(result.data.pluginAdditionalInfo);
      this.pluginStatus=result.data.pluginStatus
      const isSimplified = this.getdetails?.isSimplified;

      this.myForms.get('simple')?.setValue(isSimplified === 1 ? 1 : 0);
      this.myForms.get('advance')?.setValue(isSimplified === 0 ? 1 : 0);
    this.changeDetectRef.detectChanges()
    })
  }

  private updatePluginDetail(isSimplified: number) {
    const updatedData ={pluginStatus:this.pluginStatus,pluginAdditionalInfo:{ isSimplified: isSimplified}};
    this.paymentService.updatePluginSpecification(this.pluginId, updatedData).subscribe();
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
    const myReader: FileReader = new FileReader();

    if (!this.imageType.exec(inputValue.files[0].name)) {
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
      this.postImageUrl = myReader.result;
      this.ImageUrl = myReader.result;
      this.imageUploaded = true;
      this.changeDetectRef.detectChanges();
    };
    myReader.readAsDataURL(file);
  }


  private FuntionIntializer() {
    if (this.pluginId != 2) {
      this.paymentService.pluginDetail({
        id: this.pluginId,
      }).subscribe({
        next: (result: any) => {
          this.pluginFormControl = result.data
          this.createForm(this.pluginFormControl.controls)
        },
        error: (err: any) => {
        },
      });
    }
    if (this.pluginData) {
      this.postImageUrl = this.imageUrl + '?path=' + `${this.pluginData?.pluginAvatarPath}` + '&name=' + `${this.pluginData.pluginAvatar}` + '&width=160&height=150';
    }
  }

  private initializeForm() {
    this.myForms = this.fb.group({
      simple: [0],
      advance: [0]
    });
  }
}
