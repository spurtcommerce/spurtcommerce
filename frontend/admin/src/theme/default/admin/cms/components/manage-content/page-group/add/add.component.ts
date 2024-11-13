// Angular Imports
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Validators,
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormBuilder
} from '@angular/forms';
// Third Party Imports
import { Subscription } from 'rxjs';
// Sandbox Imports
import { PageGroupSandbox } from '../../../../../../../../core/admin/cms/page-group/page-group.sandbox';

@Component({
  selector: 'app-cms-pages-add',
  templateUrl: 'add.component.html',
  styleUrls: ['./add.component.scss'],
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
export class PageGroupAddComponent implements OnInit {
  // Form
  public pageGroupForm: UntypedFormGroup;
  public submitted = false;
  public pagesInfo: any = [];
  public editPagesId: string;
  public id: any = '';
  private subscriptions: Array<Subscription> = [];
  public queryDetails: any = {};

  constructor(
    private modalService: NgbModal,
    public appSandbox: PageGroupSandbox,
    public fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private modalService2: NgbModal,
    private router: Router
  ) {
    const pageOffset = this.route.snapshot.queryParamMap.get('offset');
    const index = this.route.snapshot.queryParamMap.get('index');

    this.queryDetails.offset = pageOffset || 0;
    this.queryDetails.index = index || 0;
  }

  ngOnInit() {
    // Form
    this.initForm();
    this.editPagesId = this.route.snapshot.paramMap.get('id');
    // Detail
    if (this.editPagesId) {
      const params: any = {};
      params.id = this.editPagesId;
      this.appSandbox.getPageDetails(params);
      this.editPages();
    }
  }

  public noWhitespaceValidator(control: UntypedFormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  // Cancel It Navigate  to add page to List page
  pagesCancel() {
    this.router.navigate(['/cms/manage-content/page-group'], { queryParams: this.queryDetails });
  }

  // Form  Initialization
  initForm(): void {
    this.pageGroupForm = this.fb.group({
      groupName: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/),
        Validators.maxLength(255),
        this.noWhitespaceValidator
      ])],
      status: [null, Validators.required]
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
    if (!this.pageGroupForm.valid) {
      this.validateAllFormFields(this.pageGroupForm);
      return;
    }
    const params: any = {};
    params.pageGroupName = this.pageGroupForm.value.groupName;
    params.status = +this.pageGroupForm.value.status;
    if (this.editPagesId) {
      params.id = this.editPagesId;
      this.appSandbox.updatePageGroupList(params);
    } else {
      this.appSandbox.addPageGroup(params);
    }
    this.subscribe();
  }

  // Subscribe
  public subscribe(): void {
    this.appSandbox.pageGroupListCount$.subscribe(data => { });
    this.subscriptions.push(
      this.appSandbox.addPagesStatus$.subscribe(data => {
        if (data && data.message) {
          if (data.status === 1) {
            this.router.navigate(['/cms/manage-content/page-group/list'], { queryParams: this.queryDetails });
          }
        }
      })
    );

    this.subscriptions.push(
      this.appSandbox.updatePages$.subscribe(data => {
        if (data && data.message) {
          if (data.status === 1) {
            this.router.navigate(['/cms/manage-content/page-group/list'], { queryParams: this.queryDetails });
          }
        }
      })
    );
    this.subscriptions.push(
      this.appSandbox.pageGroupDelete$.subscribe(data => {
        if (data && data.message) {
          if (data.status === 1) {
            this.router.navigate(['/cms/manage-content/page-group/list'], { queryParams: this.queryDetails });
          }
        }
      })
    );
  }


  // edit function for pages
  editPages(): void {
    this.subscriptions.push(this.appSandbox.pageDetails$.subscribe(data => {
      if (data && Object.keys(data).length) {
        this.setPage(data);
      }
    }));
  }

  // Set Value
  setPage(details): void {
    this.pageGroupForm.controls['groupName'].setValue(details.groupName);
    this.pageGroupForm.controls['status'].setValue(details.isActive);
  }

  // show all validation at when invalid form
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

}
