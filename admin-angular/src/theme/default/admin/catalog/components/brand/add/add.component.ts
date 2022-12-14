/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from './../../../../../../../core/admin/service/config.service';
import { BrandSandbox } from '../../../../../../../core/admin/catalog/brand/brand.sandbox';
import { BrandApiClient } from '../../../../../../../core/admin/catalog/brand/brandApiClientservice';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';


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
    public updateManufacturerId: number;
    public submitted = false;
    public imageTypeError = false;
    public imageSizeError = false;
    public postImageUrl: any = '';
    public queryDetails: any = {};
    public subscriptions: Array<Subscription> = [];
    array: any = {}


    constructor(private modalService: NgbModal,
        private modalService2: NgbModal,
        private fb: FormBuilder,
        public sandBox: BrandSandbox,
        private brandApi: BrandApiClient,
        private router: Router,
        private route: ActivatedRoute,
        private configService: ConfigService,
        private changeDetectRef: ChangeDetectorRef) {
        const pageOffset = this.route.snapshot.queryParamMap.get('offset');
        const index = this.route.snapshot.queryParamMap.get('index');



        this.queryDetails.offset = pageOffset || 0;
        this.queryDetails.index = index || 0;

    }

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
        this.modalService.open(content, { windowClass: 'image-manager' }).result.then(
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
        this.modalService2.open(content, { windowClass: 'dark-modal,image-manager' });
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

    loadForm() {
        this.name = new FormControl('', Validators.compose([
            Validators.required,
            Validators.maxLength(60)
        ]));
        this.image = new FormControl('', Validators.required);
        this.sortOrder = new FormControl('', Validators.required);
        this.status = new FormControl(null, Validators.required);
        this.brandForm = this.fb.group({
            name: this.name,
            image: this.image,
            sortOrder: this.sortOrder,
            status: this.status,
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
            this.params.sortOrder = Number(this.brandForm.value.sortOrder);
            this.params.status = this.brandForm.value.status;
            this.params.image = this.imageCaptureUrl;
            if (this.manufacturerEditedValue) {
                this.params.manufacturerId = this.manufacturerEditedValue.manufacturerId;
                this.sandBox.updateManufactuer(this.params);
            } else {
                this.sandBox.addManufacturer(this.params);
                this.imageCaptureUrl = '';
                this.postImageUrl = '';
                this.brandForm.reset();
            }
        }
        this.subscribeData();
    }

    public subscribeData() {

        this.subscriptions.push(this.sandBox.getManufacturerAdd$.subscribe((data) => {
            if (data) {
                if (data.name) {
                    this.router.navigate(['/catalog/brand/list'], { queryParams: this.queryDetails });
                }
            }
        }));

        this.subscriptions.push(this.sandBox.getManufacturerUpdate$.subscribe((data) => {
            if (data) {
                if (data.message) {
                    this.router.navigate(['/catalog/brand/list'], { queryParams: this.queryDetails });
                }
            }
        }));

    }

    /**
     * A function 'editManufacturerForm' for update and add manufacturer list
     * @param manufacturerEditedValue getting the manufacturer list data
     */
    editManufacturerForm() {
        this.manufacturerEditedValue = this.brandApi.getManufacturerEditeValue();

        if (this.manufacturerEditedValue != null && this.manufacturerEditedValue !== undefined && this.manufacturerEditedValue) {
            this.updateManufacturerId = this.manufacturerEditedValue.manufacturerId;
            this.name.setValue(this.manufacturerEditedValue.name);
            this.brandForm.controls['image'].setValue(this.manufacturerEditedValue.image);
            this.postImageUrl = this.imageUrl + '?width=160&height=150&path=' + `${this.manufacturerEditedValue.imagePath}` + '&name=' + `${this.manufacturerEditedValue.image}`;
            this.sortOrder.setValue(this.manufacturerEditedValue.sortOrder);
            this.status.setValue(this.manufacturerEditedValue.isActive);
        }
    }

    // cancel add brand form and navigate to brandList Page
    cancel() {
        this.brandForm.reset();
        this.imageCaptureUrl = '';
        this.updateManufacturerId = null;
        this.router.navigate(['/catalog/brand/list'], { queryParams: this.queryDetails });
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
        this.array = event.target.files[0].name
    }

    /**
     * A function 'convertBase64' for converting image file into base64
     * @param imageFile getting image file from input
     */

    convertBase64(inputValue: any) {
        this.imageTypeError = false;
        this.imageSizeError = false;

        if (inputValue.files && inputValue.files[0]) {
            const allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];

            if (!_.includes(allowed_types, inputValue.files[0].type)) {
                this.imageTypeError = true;
                this.imageCaptureUrl = '';
                this.postImageUrl = '';
                this.filePath.nativeElement.value = '';
                this.brandForm.controls['image'].setValue('');
                return false;
            }
            const size = Math.round(inputValue.files[0].size / 1024);
            if (size > 2048) {
                this.imageSizeError = true;
                this.imageCaptureUrl = '';
                this.postImageUrl = '';
                this.filePath.nativeElement.value = '';
                this.brandForm.controls['image'].setValue('');
                return;
            }
            this.imageTypeError = false;
            this.imageSizeError = false;
            const file: File = inputValue.files[0];
            this.brandForm.controls['image'].setValue(file ? file.name : '');
            const myReader: FileReader = new FileReader();
            myReader.onloadend = e => {
                this.imageCaptureUrl = myReader.result;
                this.postImageUrl = myReader.result;

                this.changeDetectRef.detectChanges();
            };
            myReader.readAsDataURL(file);
        }
    }
}

