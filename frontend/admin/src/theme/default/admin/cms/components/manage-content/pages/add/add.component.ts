// Angular Imports
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Validators,
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormBuilder
} from '@angular/forms';
// Third Party Imports
import { Subscription } from 'rxjs';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// Sandbox Imports
import { PagesSandbox } from '../../../../../../../../core/admin/cms/pages/pages.sandbox';
// Service Imports
import { PagesApiclientService } from '../../../../../../../../core/admin/cms/pages/pages.ApiclientService';
import Adapter, { CkeConfiqService } from 'src/core/admin/shared/ckeconfiq/ckeconfiq.service';

@Component({
  selector: 'app-cms-pages-add',
  templateUrl: 'add.component.html',
  styleUrls: ['./add.component.scss'],
  // encapsulation: ViewEncapsulation.None,
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
  // Form
  private closeResult: string;
  public submitted = false;
  public pagesForm: UntypedFormGroup;
  public pageTitle: UntypedFormControl;
  public pageContent: UntypedFormControl;
  public active: UntypedFormControl;
  public metaTitle: UntypedFormControl;
  public metaKeyword: UntypedFormControl;
  public pageSlug: UntypedFormControl;
  public metaContent: UntypedFormControl;
  public groupId: UntypedFormControl;
  public pagesInfo: any = [];
  public editPagesId: string;
  public id: any = '';
  public config: any;
  private subscriptions: Array<Subscription> = [];
  public queryDetails: any = {};
  public statusvalue: any = false;
  public groupList: any = [];
  public getGroupId:any;
  // cke5 
  editor = ClassicEditor;


  constructor(
    private modalService: NgbModal,
    public appSandbox: PagesSandbox,
    public service: PagesApiclientService,
    public fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private modalService2: NgbModal,
    private router: Router,
    private ckeconfiqservice: CkeConfiqService,
    public changesDec: ChangeDetectorRef,
  ) {
    this.editPagesId = this.route.snapshot.paramMap.get('id');
    this.config = this.ckeconfiqservice.getEditorConfig();
    const pageOffset = this.route.snapshot.queryParamMap.get('offset');
    const index = this.route.snapshot.queryParamMap.get('index');

    this.queryDetails.offset = pageOffset || 0;
    this.queryDetails.index = index || 0;
    this.getPageGroup();
  }

  ngOnInit(): void {
    // Form
    this.initForm();
    // Edit Detail 
    if (this.editPagesId) {
      const params: any = {};
      params.pageId = this.editPagesId;
      this.appSandbox.getPageDetails(params);
      this.editPages();
    }
  }

  public noWhitespaceValidator(control: UntypedFormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
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

  // Routing
  pagesCancel() {
    this.router.navigate(['/cms/manage-content/pages'], { queryParams: this.queryDetails });
  }


  // Initial Form
  initForm(): void {
    this.pageTitle = new UntypedFormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(255),
      this.noWhitespaceValidator
    ]));
    this.pageSlug = new UntypedFormControl('');
    this.pageContent = new UntypedFormControl('', Validators.compose([
      Validators.required,
      this.noWhitespaceValidator
    ]));
    this.active = new UntypedFormControl(null);
    this.metaTitle = new UntypedFormControl('', Validators.compose([
      Validators.maxLength(70)
    ]));
    this.metaKeyword = new UntypedFormControl('', Validators.compose([
      Validators.maxLength(255)
    ]));
    this.metaContent = new UntypedFormControl('', Validators.compose([
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
    });
  }

  /**
   * Handles form 'submit' event. Calls sandbox pages  function if form is valid.
   *
   * @param event form event
   * @param form entire form value
   */

  // Submit 
  onSubmit(): void {
    this.submitted = true;
    if (!this.pagesForm.valid || ['', null, undefined].includes(this.getGroupId)) {
      this.validateAllFormFields(this.pagesForm);
      this.scrollToError();
      return;
    }
    else if (
      this.pagesForm.value.pageTitle !== '' &&
      this.pagesForm.value.pageContent !== ''
    ) {
      const params: any = {};
      params.title = this.pagesForm.value.pageTitle;
      params.content = this.pagesForm.value.pageContent;
      params.pageSlug = this.pagesForm.value.pageSlug;
      params.active = this.statusvalue == true ? 1 : 0;
      params.metaTagTitle = this.pagesForm.value.metaTitle;
      params.metaTagKeyword = this.pagesForm.value.metaKeyword;
      params.metaTagContent = this.pagesForm.value.metaContent;
      params.pageGroupId = this.getGroupId;
      if (this.editPagesId) {
        params.pageId = this.editPagesId;
        this.appSandbox.updatePagesList(params);
      } else {
        this.appSandbox.getAddpages(params);
      }
    }
    this.subscribe();
  }

  // Subscribe Value
  public subscribe(): void {
    this.subscriptions.push(
      this.appSandbox.addPagesStatus$.subscribe(data => {
        if (data && data.message) {
          if (data.status === 1) {
            this.router.navigate(['/cms/manage-content/pages/list'], { queryParams: this.queryDetails });
          }
        }
      })
    );

    this.subscriptions.push(
      this.appSandbox.updatePages$.subscribe(data => {
        if (data && data.message) {
          if (data.status === 1) {
            this.router.navigate(['/cms/manage-content/pages/list'], { queryParams: this.queryDetails });
          }
        }
      })
    );
  }

  // edit function for pages
  editPages(): void {
    this.appSandbox.pageDetails$.subscribe(data => {
      if (data) {
        this.setPage(data);
      }
    });
  }


  // Set value
  setPage(details) {
    if (this.groupList?.length > 0) {
      const pageGroup = this.groupList?.find((res: any) => res?.groupId == details?.pageGroupId);
      this.getGroupId = pageGroup?.groupId;
      this.getGroupId =this.getGroupId ;
      this.changesDec.detectChanges();
    }
    this.pagesForm.controls['pageTitle'].setValue(details.title);
    this.pagesForm.controls['pageContent'].setValue(this.htmlTagConversion(details.content));
    // this.pagesForm.controls['active'].setValue(details.isActive);
    this.statusvalue = details.isActive == 1 ? true : false;
    this.pagesForm.controls['active'].setValue(this.statusvalue == 1 ? true : false);
    this.pagesForm.controls['pageSlug'].setValue(details.slugName);
    this.pagesForm.controls['metaTitle'].setValue(details.metaTagTitle);
    this.pagesForm.controls['metaKeyword'].setValue(details.metaTagKeyword);
    this.pagesForm.controls['metaContent'].setValue(details.metaTagContent);

  }

  get f() {
    return this.pagesForm.controls;
  }

  validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  // Group List
  getPageGroup() {
    const params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.status = 1;
    this.service.groupList(params).subscribe(param => {
      if (param != undefined) {
        this.groupList = param.data;
      }
    })
  }

  // Html Conversion
  htmlTagConversion(data) {
    const val = data
      .replaceAll('&amp;', '&')
      .replaceAll('&lt;', '<')
      .replaceAll('&gt;', '>')
      .replaceAll('&quot;', '"')
      .replaceAll('&#39;', "'")
      .replaceAll('&sbquo;', '‚')
      .replaceAll('&#61;', '=')
      .replaceAll('&#45;', '-')
      .replaceAll('&hellip;', '…')
      .replaceAll('&commat;', '@')
      .replaceAll('&copy;', '©')
      .replaceAll('&#35;', '#')
      .replaceAll('&ldquo;', '“')
      .replaceAll('&rsquo;', '’')
      .replaceAll('&lsquo;', '‘')
      .replaceAll('&trade;', '™')
      .replaceAll('&reg;', '®')
      .replaceAll('&ndash;', '–')
      .replaceAll('&eacute;', 'é')
      .replaceAll('&euro;', '€')
      .replaceAll('&pound;', '£');
    return val;
  }
  statuschange(e) {
  }

    // cke5 image upload
    ulpoadAdapterDrop(editor: any) {
      editor.plugins.get('FileRepository').createUploadAdapter = ((loader: any, data: any) => {
        return new Adapter(loader, data);
      });
    }

  // Scroll
  scrollTo(el: Element): void {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  scrollToError(): void {
    const firstElementWithError = document.querySelector('.ng-invalid[formControlName]');

    this.scrollTo(firstElementWithError);
  }


}