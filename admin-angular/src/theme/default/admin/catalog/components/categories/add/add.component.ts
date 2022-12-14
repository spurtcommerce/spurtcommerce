/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy
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
import { ConfigService } from '../../../../../../../core/admin/service/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { CkeConfiqService } from 'src/core/admin/shared/ckeconfiq/ckeconfiq.service';



@Component({
  selector: 'app-spurt-catalog-category-add',
  templateUrl: 'add.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./add.component.scss']
})
export class CategoryAddComponent implements OnInit, OnDestroy {

  // reactive form
  public user: FormGroup;
  public categoryName: FormControl;
  public categoryTitle: FormControl;
  public categoryKeyword: FormControl;
  public categoryComponent: FormControl;
  public categorySortOrder: FormControl;
  public status: FormControl;
  public imageInput: FormControl;
  public categorySlug: FormControl;

  // popup
  public closeResult: string;
  public param: any = {};
  // validation condition
  public submittedValues = false;
  public postImageUrl: any;
  public ImageUrl: any = '';
  public imageUrl: string;
  public categoryId: any;
  private subscriptions: Array<Subscription> = [];
  @ViewChild('filePath') filePath: ElementRef;
  public imageTypeError = false;
  public imageSizeError = false;
  public queryDetails: any = {};
  new: any = {};
  item: any = {};
  public config: any;


  constructor(
    private modalService: NgbModal,
    public fb: FormBuilder,
    private configService: ConfigService,
    public sandbox: CategoriesSandbox,
    public route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    public router: Router,
    public ckeconfiqservice: CkeConfiqService,
  ) {
    const index = this.route.snapshot.queryParamMap.get('index');
    const offset = this.route.snapshot.queryParamMap.get('offset');

    this.config = this.ckeconfiqservice.getcategoryconfiq();

    this.queryDetails.index = index || 0;
    this.queryDetails.offset = offset || 0;

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

  ngOnInit() {
    this.postImageUrl = 'assets/upload-banner/upload.png';
    this.imageUrl = this.configService.getImageUrl();
    this.categoryList();
    this.categoryName = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(255)
    ]));
    this.categoryTitle = new FormControl('', Validators.compose([
      Validators.maxLength(70)
    ]));
    this.categoryKeyword = new FormControl('', Validators.compose([
      Validators.maxLength(255)
    ]));
    this.categoryComponent = new FormControl(null);
    this.categorySortOrder = new FormControl('', [Validators.required]);
    this.status = new FormControl(null, [Validators.required]);
    this.imageInput = new FormControl('');

    this.user = this.fb.group({
      categoryName: this.categoryName,
      categoryTitle: this.categoryTitle,
      categoryKeyword: this.categoryKeyword,
      categoryComponent: this.categoryComponent,
      categorySortOrder: this.categorySortOrder,
      categorySlug:this.categorySlug,
      status: this.status,
      imageInput: this.imageInput,
    });
    this.route.params.subscribe(data => {
      if (data) {
        this.categoryId = data.id;
      }
    });

  }

  categoryList() {
    const param: any = {};
    param.limit = '';
    param.offset = '';
    param.keyword = '';
    param.sortOrder = '';
    this.sandbox.categoryList(param);
    this.subscriptions.push(this.sandbox.categoriesListResponse$.subscribe(data => {
      if (data && data === true) {
        if (this.categoryId) {
          const params: any = {};
          params.categoryId = this.categoryId;
          this.sandbox.getCategoryDetails(params);
          this.editCategoryList();
        }
      }
    }));
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
    if (user.value.categoryComponent) {
      this.param.parentInt = user.value.categoryComponent;
    } else {
      this.param.parentInt = 0;
    }
    this.param.sortOrder = Number(user.value.categorySortOrder);
    this.param.metaTagTitle = user.value.categoryTitle;
    this.param.metaTagKeyword = user.value.categoryKeyword;
    this.param.categorySlug = user.value.categorySlug;
    this.param.status = user.value.status;
    this.param.image = this.ImageUrl;
    if (this.categoryId) {
      this.param.categoryId = this.categoryId;
      this.sandbox.updateCategories(this.param);
    } else {
      this.sandbox.addCategories(this.param);
    }
    this.subscribe();
  }

  public subscribe() {
    this.sandbox.getAddCategories$.subscribe(data => {
      if (data && data.status === 1) {
        this.router.navigate(['/catalog/categories'], { queryParams: this.queryDetails });
      }
    });

    this.sandbox.getUpdateCategoriesData$.subscribe(data => {
      if (data && data.status === 1) {
        this.router.navigate(['/catalog/categories'], { queryParams: this.queryDetails });
      }
    });

  }

  editCategoryList() {
    this.subscriptions.push(this.sandbox.categoryDetails$.subscribe(data => {
      if (data && Object.keys(data).length) {
        this.setCategory(data);
        this.new = data
      }
    }));
  }

  setCategory(details) {
    this.user.controls['categoryName'].setValue(details.name);
    this.user.controls['categoryTitle'].setValue(
      details.metaTagTitle
    );

    this.user.controls['categoryKeyword'].setValue(
      details.metaTagKeyword
    );
    this.user.controls['categoryComponent'].setValue(
      details.parentInt
    );
    this.user.controls['categorySortOrder'].setValue(
      details.sortOrder
    );
 
    this.user.controls['categorySlug'].setValue(
      details.categorySlug
    );
    this.status.setValue(details.isActive);
    this.user.controls['imageInput'].setValue(details.image);

    this.postImageUrl =
      details.imagePath !== ''
        ? this.imageUrl + '?path=' +
        `${details.imagePath}` + '&name=' +
        `${details.image}` +
        '&width=160&height=150'
        : 'assets/upload-banner/upload.png';

    this.cd.detectChanges();
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

  // validation for reactive form
  get f() {
    return this.user.controls;
  }

  // Upload Image
  uploadButtonClick() {
    const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
    el.click();
  }

  uploadChange($event): void {
    this.convertBase64($event.target);
    this.item = $event.target.files[0].name
  }

  convertBase64(inputValue: any) {
    this.imageTypeError = false;
    this.imageSizeError = false;

    if (inputValue.files && inputValue.files[0]) {
      const allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];

      if (!_.includes(allowed_types, inputValue.files[0].type)) {
        this.imageTypeError = true;
        this.ImageUrl = '';
        this.postImageUrl = './assets/upload-banner/upload.png';
        this.filePath.nativeElement.value = '';
        this.user.controls['imageInput'].setValue('');
        return false;
      }
      const size = Math.round(inputValue.files[0].size / 1024);
      if (size > 2048) {
        this.imageSizeError = true;
        this.ImageUrl = '';
        this.postImageUrl = './assets/upload-banner/upload.png';
        this.filePath.nativeElement.value = '';
        this.user.controls['imageInput'].setValue('');
        return;
      }
      this.imageTypeError = false;
      this.imageSizeError = false;
      const file: File = inputValue.files[0];
      this.user.controls['imageInput'].setValue(file ? file.name : '');
      const myReader: FileReader = new FileReader();
      myReader.onloadend = e => {
        this.postImageUrl = myReader.result;
        this.ImageUrl = myReader.result;
        this.cd.detectChanges();
      };
      myReader.readAsDataURL(file);
    }
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


  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
