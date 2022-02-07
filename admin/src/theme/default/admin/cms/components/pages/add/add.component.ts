/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { PagesApiclientService } from '../../../../../../../core/admin/cms/pages/pages.ApiclientService';
import { PagesSandbox } from '../../../../../../../core/admin/cms/pages/pages.sandbox';

@Component({
  selector: 'app-cms-pages-add',
  templateUrl: 'add.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #009efb;
        color: white;
      }

      .dark-modal .close {
        color: white;
      }

      .light-blue-backdrop {
        background-color: #5cb3fd;
      }

      .image-manager .modal-dialog {
        max-width: 70%;
      }
    `
  ]
})
export class PagesAddComponent implements OnInit {
  // Variables
  private closeResult: string;
  public submitted = false;
  public pagesForm: FormGroup;
  public pageTitle: FormControl;
  public pageContent: FormControl;
  public active: FormControl;
  public metaTitle: FormControl;
  public metaKeyword: FormControl;
  public metaContent: FormControl;
  public pagesInfo: any = [];
  public editPagesId: string;
  public id: any = '';

  constructor(
    private modalService: NgbModal,
    public appSandbox: PagesSandbox,
    public service: PagesApiclientService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private modalService2: NgbModal,
    private router: Router
  ) {}

  // initially calls initForm,editPages
  ngOnInit() {
    this.initForm();
    this.editPages();
    this.editPagesId = this.route.snapshot.paramMap.get('id');
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

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

  open(content) {
    this.modalService2.open(content, {
      windowClass: 'dark-modal,image-manager'
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // Cancel It Navigate  to add page to List page
  pagesCancel() {
    this.router.navigate(['/cms/pages']);
  }

  // Form  Initialization
  initForm() {
    this.pageTitle = new FormControl('', [Validators.required]);
    this.pageContent = new FormControl('', [Validators.required]);
    this.active = new FormControl('', [Validators.required]);
    this.metaTitle = new FormControl('');
    this.metaKeyword = new FormControl('');
    this.metaContent = new FormControl('');
    this.pagesForm = this.fb.group({
      pageTitle: this.pageTitle,
      pageContent: this.pageContent,
      active: this.active,
      metaTitle: this.metaTitle,
      metaKeyword: this.metaKeyword,
      metaContent: this.metaContent
    });
  }

  /**
   * Handles form 'submit' event. Calls sandbox pages  function if form is valid.
   *
   * @param event form event
   * @param form entire form value
   */
  onSubmit() {
    this.submitted = true;
    if (!this.pagesForm.valid) {
      this.validateAllFormFields(this.pagesForm);
      return;
    }
    if (
      this.pagesForm.value.pageTitle !== '' &&
      this.pagesForm.value.pageContent !== ''
    ) {
      const params: any = {};
      params.title = this.pagesForm.value.pageTitle;
      params.content = this.pagesForm.value.pageContent;
      params.active = this.pagesForm.value.active;
      params.metaTagTitle = this.pagesForm.value.metaTitle;
      params.metaTagKeyword = this.pagesForm.value.metaKeyword;
      params.metaTagContent = this.pagesForm.value.metaContent;
      if (this.pagesInfo[0]) {
        if (this.pagesInfo[0].pageId) {
          params.pageId = this.pagesInfo[0].pageId;
          this.appSandbox.updatePagesList(params);
        }
      } else {
        this.appSandbox.getAddpages(params);
      }
    }
  }

  // edit function for pages
  editPages() {
    this.pagesInfo.push(this.service.pagesGetData());
    if (this.pagesInfo[0] !== null) {
      if (this.pagesInfo[0] && this.pagesInfo[0].title) {
        this.pageTitle = this.pagesInfo[0].title;
        this.pageContent = this.pagesInfo[0].content;
        this.active = this.pagesInfo[0].isActive;
        this.metaTitle = this.pagesInfo[0].metaTagTitle;
        this.metaContent = this.pagesInfo[0].metaTagContent;
        this.metaKeyword = this.pagesInfo[0].metaTagKeyword;

        this.pagesForm.controls['pageTitle'].setValue(this.pagesInfo[0].title);
        this.pagesForm.controls['pageContent'].setValue(
          this.pagesInfo[0].content
        );
        this.pagesForm.controls['active'].setValue(this.pagesInfo[0].isActive);
        this.pagesForm.controls['metaTitle'].setValue(
          this.pagesInfo[0].metaTagTitle
        );
        this.pagesForm.controls['metaContent'].setValue(
          this.pagesInfo[0].metaTagContent
        );
        this.pagesForm.controls['metaKeyword'].setValue(
          this.pagesInfo[0].metaTagKeyword
        );
      }
    } else {
      this.pagesInfo = null;
    }
  }

  // Form  Controls Using  in Add Pages  html
  get f() {
    return this.pagesForm.controls;
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
}
