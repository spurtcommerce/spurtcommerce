/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';

import { ConfigService } from './../../../../../../../core/admin/service/config.service';
import { BrandSandbox } from '../../../../../../../core/admin/catalog/brand/brand.sandbox';
import { BrandApiClient } from '../../../../../../../core/admin/catalog/brand/brandApiClientservice';

@Component({
  selector: 'app-catalog-brand-add',
  templateUrl: 'add.component.html',
  styleUrls: ['./add.component.scss']
})
export class BrandAddComponent implements OnInit {
  @ViewChild('filePath') filePath: ElementRef;

  // VARIABLES
  public brandForm: FormGroup;
  private name: FormControl;
  private image: FormControl;
  private sortOrder: FormControl;
  private status: FormControl;

  public closeResult: string;
  public params: any = {};
  public manufacturerEditedValue: any;
  public imageUrl: string;
  public imageCaptureUrl: any;
  public captureUrl: any;
  public updateManufacturerId: number;
  public submitted = false;

  constructor(
    private modalService: NgbModal,
    private modalService2: NgbModal,
    private fb: FormBuilder,
    private sandBox: BrandSandbox,
    private brandApi: BrandApiClient,
    private router: Router,
    private configService: ConfigService,
    private changeDetectRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.imageUrl = this.configService.getImageUrl();
    this.loadForm();
    this.editManufacturerForm();
  }

  // STYLE PURPOSE

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  // STYLE PURPOSE
  open2(content) {
    this.modalService
      .open(content, { windowClass: 'image-manager' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  // STYLE PURPOSE
  open(content) {
    this.modalService2.open(content, {
      windowClass: 'dark-modal,image-manager'
    });
  }

  // STYLE PURPOSE
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // initial form created  with Validation
  loadForm() {
    this.name = new FormControl('', Validators.required);
    this.image = new FormControl('', Validators.required);
    this.sortOrder = new FormControl('', Validators.required);
    this.status = new FormControl('', Validators.required);
    this.brandForm = this.fb.group({
      name: this.name,
      image: this.image,
      sortOrder: this.sortOrder,
      status: this.status
    });
  }

  /**
   * Handles form 'onSubmit' event . Calls sandbox function addManufacturer updateManufactuer if form is valid.
   * @param brandForm entire form value
   * @param params storing entire form value
   */
  onSubmits() {
    this.submitted = true;
    if (!this.brandForm.valid) {
      this.validateAllFormFields(this.brandForm);
      return;
    } else {
      this.params.name = this.brandForm.value.name;
      if (this.imageCaptureUrl != null && this.imageCaptureUrl !== undefined) {
        const fileExtension = this.imageCaptureUrl.replace(/^.*\./, '');
        if (
          fileExtension === 'jpeg' ||
          fileExtension === 'png' ||
          fileExtension === 'jpg'
        ) {
          this.params.image = '';
          this.brandForm.controls['image'].clearValidators();
          this.brandForm.controls['image'].updateValueAndValidity();
        } else {
          this.params.image = this.imageCaptureUrl;
        }
      }

      this.params.sortOrder = this.brandForm.value.sortOrder;
      this.params.status = this.brandForm.value.status;
      if (this.manufacturerEditedValue) {
        this.params.manufacturerId = this.manufacturerEditedValue.manufacturerId;
        this.sandBox.updateManufactuer(this.params);
      } else {
        this.sandBox.addManufacturer(this.params);
        this.imageCaptureUrl = '';
        this.brandForm.reset();
      }
    }
  }

  /**
   * A function 'editManufacturerForm' for update and add manufacturer list
   * @param manufacturerEditedValue getting the manufacturer list data
   */
  editManufacturerForm() {
    this.manufacturerEditedValue = this.brandApi.getManufacturerEditeValue();
    if (
      this.manufacturerEditedValue != null &&
      this.manufacturerEditedValue !== undefined &&
      this.manufacturerEditedValue
    ) {
      this.updateManufacturerId = this.manufacturerEditedValue.manufacturerId;
      this.name.setValue(this.manufacturerEditedValue.name);
      // tslint:disable-next-line:max-line-length
      this.captureUrl =
        this.imageUrl + '?path=' +
        `${this.manufacturerEditedValue.imagePath}` + '&name=' +
        `${this.manufacturerEditedValue.image}` +
        '&width=160&height=150';
      if (
        this.manufacturerEditedValue.image ||
        this.manufacturerEditedValue.image === ''
      ) {
        this.brandForm.controls['image'].clearValidators();
        this.brandForm.controls['image'].updateValueAndValidity();
      }
      this.sortOrder.setValue(this.manufacturerEditedValue.sortOrder);
      this.status.setValue(this.manufacturerEditedValue.isActive);
    }
  }

  // cancel add brand form and navigate to brandList Page
  cancel() {
    this.brandForm.reset();
    this.imageCaptureUrl = '';
    this.updateManufacturerId = null;
    this.router.navigate(['/catalog/brand/list']);
  }

  // show all validation at when invalid form
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  // image upload and base64 convert section
  uploadButtonClick() {
    const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
    el.click();
  }

  // A Function 'onUpload' getting upload file
  onUpload(event): void {
    this.convertBase64(event.target);
  }

  /**
   * A function 'convertBase64' for converting image file into base64
   * @param imageFile getting image file from input
   */
  convertBase64(imageFile: any) {
    const file: File = imageFile.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = e => {
      this.imageCaptureUrl = myReader.result;
      this.captureUrl = myReader.result;
      // this.image = this.imageCaptureUrl;
      this.brandForm.controls['image'].setErrors(null);
      this.changeDetectRef.detectChanges();
    };
    myReader.readAsDataURL(file);
  }
}
