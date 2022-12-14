/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { CkeConfiqService } from 'src/core/admin/shared/ckeconfiq/ckeconfiq.service';

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

  private closeResult: string;
  public submitted = false;
  public pagesForm: FormGroup;
  public pageTitle: FormControl;
  public pageContent: FormControl;
  public active: FormControl;
  public metaTitle: FormControl;
  public metaKeyword: FormControl; 
  public pageSlug: FormControl;
  public metaContent: FormControl;
  public groupId: FormControl;
  public pagesInfo: any = [];
  public editPagesId: string;
  public id: any = '';
  public config: any;
  private subscriptions: Array<Subscription> = [];
  public queryDetails: any = {};

  constructor(
    private modalService: NgbModal,
    public appSandbox: PagesSandbox,
    public service: PagesApiclientService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private modalService2: NgbModal,
    private router: Router,
    private ckeconfiqservice: CkeConfiqService
  ) {
    this.config = this.ckeconfiqservice.getckeconfig();

    const pageOffset = this.route.snapshot.queryParamMap.get('offset');
    const index = this.route.snapshot.queryParamMap.get('index');

    this.queryDetails.offset = pageOffset || 0;
    this.queryDetails.index = index || 0;
  }

  ngOnInit() {
    this.initForm();
    this.editPagesId = this.route.snapshot.paramMap.get('id');
    if (this.editPagesId) {
      const params: any = {};
      params.pageId = this.editPagesId;
      this.appSandbox.getPageDetails(params);
      this.editPages();
    }
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

  pagesCancel() {
    this.router.navigate(['/cms/pages'], { queryParams: this.queryDetails });
  }

  initForm() {
    this.pageTitle = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(255)
    ]));
    this.pageSlug = new FormControl('');
    this.pageContent = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    this.active = new FormControl(null, [Validators.required]);
    this.groupId = new FormControl(null, [Validators.required]);
    this.metaTitle = new FormControl('', Validators.compose([
      Validators.maxLength(70)
    ]));
    this.metaKeyword = new FormControl('', Validators.compose([
      Validators.maxLength(255)
    ]));
    this.metaContent = new FormControl('', Validators.compose([
      Validators.maxLength(160)
    ]));
    this.pagesForm = this.fb.group({
      pageTitle: this.pageTitle,
      pageSlug: this.pageSlug,
      pageContent: this.pageContent,
      active: this.active,
      metaTitle: this.metaTitle,
      metaKeyword: this.metaKeyword,
      metaContent: this.metaContent,
      groupId: this.groupId
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
      params.pageSlug = this.pagesForm.value.pageSlug;
      params.active = this.pagesForm.value.active;
      params.metaTagTitle = this.pagesForm.value.metaTitle;
      params.metaTagKeyword = this.pagesForm.value.metaKeyword;
      params.metaTagContent = this.pagesForm.value.metaContent;
      if (this.editPagesId) {
        params.pageId = this.editPagesId;
        this.appSandbox.updatePagesList(params);
      } else {
        this.appSandbox.getAddpages(params);
      }
    }
    this.subscribe();
  }
  public subscribe() {
    this.subscriptions.push(
      this.appSandbox.addPagesStatus$.subscribe(data => {
        if (data && data.message) {
          if (data.status === 1) {
            this.router.navigate(['/cms/pages/list'], { queryParams: this.queryDetails });
          }
        }
      })
    );

    this.subscriptions.push(
      this.appSandbox.updatePages$.subscribe(data => {
        if (data && data.message) {
          if (data.status === 1) {
            this.router.navigate(['/cms/pages/list'], { queryParams: this.queryDetails });
          }
        }
      })
    );
  }

  // edit function for pages
  editPages() {
    this.subscriptions.push(this.appSandbox.pageDetails$.subscribe(data => {
      if (data && Object.keys(data).length) {
        this.setPage(data);
      }
    }));
  }

  setPage(details) {
    this.pagesForm.controls['pageTitle'].setValue(details.title);
    this.pagesForm.controls['pageContent'].setValue(this.htmlTagConversion(details.content));
    this.pagesForm.controls['active'].setValue(details.isActive);
    this.pagesForm.controls['pageSlug'].setValue(details.slugName);
    this.pagesForm.controls['metaTitle'].setValue(details.metaTagTitle);
    this.pagesForm.controls['metaKeyword'].setValue(details.metaTagKeyword);
    this.pagesForm.controls['metaContent'].setValue(details.metaTagContent);
  }

  get f() {
    return this.pagesForm.controls;
  }

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


  htmlTagConversion(data){
    const val = data
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;','"')
    .replaceAll('&#39;',"'")
    .replaceAll('&sbquo;','‚')
    .replaceAll('&#61;','=')
    .replaceAll('&#45;','-')
    .replaceAll('&hellip;','…')
    .replaceAll('&commat;','@')
    .replaceAll('&copy;','©')
    .replaceAll('&#35;','#')
    .replaceAll('&ldquo;','“')
    .replaceAll('&rsquo;','’')
    .replaceAll('&lsquo;','‘')
    .replaceAll('&trade;','™')
    .replaceAll('&reg;','®')
    .replaceAll('&ndash;','–')
    .replaceAll('&eacute;','é')
    .replaceAll('&euro;','€')
    .replaceAll('&pound;','£');
     return  val ;
  }
}
