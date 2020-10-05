/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  ViewChild
} from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
// Store
import { CategoriesSandbox } from '../../../../../../../core/admin/catalog/category/categories.sandbox';
import { CategoriesService } from '../../../../../../../core/admin/catalog/category/categories.service';
import { ConfigService } from '../../../../../../../core/admin/service/config.service';

@Component({
  selector: 'app-spurt-catalog-category-add',
  templateUrl: 'add.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  // VARIABLES

  // reactive form
  public user: FormGroup;
  public categoryName: FormControl;
  public categoryTitle: FormControl;
  public categoryDescription: FormControl;
  public categoryKeyword: FormControl;
  public categorySortOrder: FormControl;
  public status: FormControl;
  private valids: boolean;
  // popup
  private closeResult: string;
  // Addcategories
  private param: any = {};
  // editing categories list datas
  private CategoryEditdata: any;
  // validation condition
  submittedValues = false;
  @ViewChild('filePath') filePath: ElementRef;
  constructor(
    private modalService: NgbModal,
    public fb: FormBuilder,
    private configService: ConfigService,
    public sandbox: CategoriesSandbox,
    private categoryservice: CategoriesService
  ) {
    this.valids = false;
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
    this.modalService.open(content, {
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

  // Reactive form

  ngOnInit() {
    this.apiFordropDownlist();
    this.categoryName = new FormControl('', [Validators.required]);
    this.categoryTitle = new FormControl('');
    this.categoryDescription = new FormControl('');
    this.categoryKeyword = new FormControl('');
    this.categorySortOrder = new FormControl('', [Validators.required]);
    this.status = new FormControl('', [Validators.required]);

    this.user = this.fb.group({
      categoryName: this.categoryName,
      categoryTitle: this.categoryTitle,
      categoryDescription: this.categoryDescription,
      categoryKeyword: this.categoryKeyword,
      categorySortOrder: this.categorySortOrder,
      status: this.status
    });

    this.CategoryEditdata = this.categoryservice.getEditcategories();
    if (this.CategoryEditdata && this.CategoryEditdata !== ' ') {
      this.editCategoryList();
    }
  }

  // calling sandbox categorylist for dropdown list with empty param values
  apiFordropDownlist() {
    const param: any = {};
    param.limit = '';
    param.offset = '';
    param.keyword = '';
    param.sortOrder = '';
    this.sandbox.categorylist(param);
  }

  /**
   * Handles  'onSubmits' event. Calls sandbox  updatecategories if ((this.CategoryEditdata!=undefined)&&(this.CategoryEditdata!=' ')),
   * else calls sandbox addcategories function,if the form is valid.
   *
   * @param user entire form value
   * @param param storing entire form value
   *
   */

  onSubmits(user) {
    this.submittedValues = true;
    if (!this.user.valid) {
      this.validateAllFormFields(this.user);
      return;
    }
    this.param.name = user.value.categoryName;
    this.param.parentInt = 0;
    this.param.sortOrder = user.value.categorySortOrder;
    this.param.metaTagTitle = user.value.categoryTitle;
    this.param.metaTagDescription = user.value.categoryDescription;
    this.param.metaTagKeyword = user.value.categoryKeyword;
    this.param.status = user.value.status;
    if (this.CategoryEditdata !== undefined && this.CategoryEditdata !== ' ') {
      this.param.categoryId = this.CategoryEditdata.categoryId;
      this.sandbox.updatecategories(this.param);
    } else {
      this.sandbox.addcategories(this.param);
    }
  }

  // editing categories list in the reactive form
  editCategoryList() {
    this.user.controls['categoryName'].setValue(this.CategoryEditdata.name);
    this.user.controls['categoryTitle'].setValue(
      this.CategoryEditdata.metaTagTitle
    );
    this.user.controls['categoryDescription'].setValue(
      this.CategoryEditdata.metaTagDescription
    );
    this.user.controls['categoryKeyword'].setValue(
      this.CategoryEditdata.metaTagKeyword
    );
    this.user.controls['categorySortOrder'].setValue(
      this.CategoryEditdata.sortOrder
    );
    this.status.setValue(this.CategoryEditdata.isActive);
  }

  // validation for formGroup
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

  // validation for reactive form
  get f() {
    return this.user.controls;
  }
}
