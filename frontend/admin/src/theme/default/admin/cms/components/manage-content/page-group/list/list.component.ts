//Angular Imports
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
//Third Party Imports
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
//Component Imports
import { DeleteConfirmationDialogComponent } from '../../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
//SandBox Imports
import { PageGroupSandbox } from '../../../../../../../../core/admin/cms/page-group/page-group.sandbox';
//Constant Imports
import { customTable, filterFields } from './list.constant';
import { getFormControlsFields, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';

@Component({
  selector: 'app-spurt-cms-page-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
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
export class PageGroupListComponent implements OnInit {
  @ViewChild('myInput') myInput: ElementRef;
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  //Pagination
  public offset: any;
  public currentPage: number = 1;
  limit:number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;
  //Query Params
  public queryData: any = {};
  //Browser Title
  title='Page Group';
  //Count
  count: any;
  //Dynamic columns
  customTable: any = customTable;
  // Arrow functions
  trackByIndex = (index: number): number => index;
  // Reusable form 
  formObjFormGroup: any;
  dynamicObjControls: any = {};
  backupFormValue = {};
  formValueExists = false;
  // Common
  _Object = Object;
  empty = [null, '', undefined];
  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  constructor(
    private toastr: ToastrService,
    public appSandbox: PageGroupSandbox,
    private router: Router,
    public modalService: NgbModal,
    public route: ActivatedRoute,
    public fb: UntypedFormBuilder,
    public translate:TranslateService,
    public titleService : Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.buildForm()
    this.routeSubscribe();
  }
  
  //Form
  buildForm():void{
    const formObjModel = filterFields;
    const formGroupField = getFormControlsFields(formObjModel);
    this.formObjFormGroup = this.fb.group(formGroupField);
    Object.keys(formObjModel).forEach((element: any) => {
      this.dynamicObjControls[element] = getTypes(formObjModel[element], this.formObjFormGroup);
    });
    this.filterValueUpdate();
  }
  
  //Apply Filter
  applyFilter(){
    this.filterValueUpdate();
    this.resetAll();
  }
  
  //List api
  getPageGroupList() {
    this.offset = (this.currentPage - 1) * this.limit;
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    params.keyword = this.backupFormValue['search'] ?? '';
    this.appSandbox.getPageGroupList(params);
    this.queryData.offset = this.offset;
    this.queryData.limit = this.limit;
    this.queryData.keyword = this.backupFormValue['search'] ?? '';
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.queryData,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
    this.filterValueUpdate();  
  }
  
  //Count api
  getPagesPagination() {
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    params.keyword = this.backupFormValue['search'] ?? '';
    params.count = true;
    this.appSandbox.getPagePagination(params);
    this.appSandbox.pageGroupListCount$.subscribe((val )=> {
      this.count = val;
    } )
  }

  //Page On Change
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.getPageGroupList();  
  }
  
  //Table Button Action
  buttonAction(e:any):void{
    switch (e.key) {
      case "threeDotMenu":
        if (e.actionType == 'Edit') {
          this.editPageGroup(e);
        }
        else{
          this.deletePageGroup(e.groupId)
        }
        break;
    }
  }
  
  //Edit Page Group
  editPageGroup(pagesList) {
    this.router.navigate(['/cms/manage-content/page-group/edit', pagesList.groupId], { queryParams: this.queryData });
  }
  
  //Add Page Group
  addPageGroup() {
    this.router.navigate(['/cms/manage-content/page-group/add'], { queryParams: this.queryData });
  }
  
  //Add Localization
  addLocalization(){
    this.router.navigate(['/cms/manage-content/page-group/list-localization']);
  }
  
  //Delete Page Group
  deletePageGroup(pageId) {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass:'modal-dialog-centered' , backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.componentInstance.deleteMessage = 'Page Group'
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.appSandbox.deletePageGroupList({ id: pageId });
        this.appSandbox.getPageGroupCount();
        this.regSubscriptionEvents();
      }
    });
  }

  //Delete Final Method
  regSubscriptionEvents() {
    this.appSandbox.pageGroupDelete$.subscribe(_delete => {
      if (_delete && _delete.status && _delete.status === 1) {
        this.getPageGroupList();
        this.getPagesPagination();
      }
    });
  }
  
  //Focus
  focusInput() {
    this.myInput.nativeElement.focus();
  }
  
  // Remove Filter
  removeFilter(remove): void {
    this.formObjFormGroup.controls[remove.key].reset();
    this.filterValueUpdate();
    this.resetAll();
  }

  //Filter Value Update
  private filterValueUpdate(): void {
    this.backupFormValue = structuredClone(this.formObjFormGroup?.value);
    this.formValueExists = Object.values(this.backupFormValue).some((val: any) => !this.empty.includes(val));
  }

  // Query param route value subscribe
  private routeSubscribe(): void {
    let paramsValue: any = {};
    this.subscriptions.add(this.route.queryParams.subscribe(params => {
      paramsValue = params;
      this.limit = paramsValue.limit ? Number(paramsValue.limit) : this.limit;
      this.offset = paramsValue.offset ? Number(paramsValue.offset) : 0;
      this.currentPage = (paramsValue.offset && paramsValue.limit) ? Math.floor(paramsValue.offset / paramsValue.limit) + 1 : 1;
      this.formObjFormGroup.patchValue({
        'search': paramsValue.keyword ?? ""
      });
      this.filterValueUpdate();
    }))
    this.getPageGroupList();
    this.getPagesPagination();
  }

  //Reset All
  private resetAll(): void {
    this.onPageChange({ limit: this.limit, offset: 0 });
    this.getPageGroupList();
    this.getPagesPagination();
    this.dropDownClose('myDropdown');
  }

  // Dropdown Close
  private dropDownClose(dropDownName): void {
    if (this.hasOwnProperty(dropDownName)) {
      this[dropDownName]?.close();
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
