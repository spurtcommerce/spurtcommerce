// Angular Imports
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  Validators,
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormBuilder
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
// Third Party Imports
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
// Sandbox Imports
import { CategoriesSandbox } from '../../../../../../../../core/admin/catalog/category/categories.sandbox';
// Service Imports
import { ConfigService } from '../../../../../../../../core/admin/service/config.service';
import Adapter, { CkeConfiqService } from 'src/core/admin/shared/ckeconfiq/ckeconfiq.service';

@Component({
  selector: 'app-spurt-catalog-category-add',
  templateUrl: 'add.component.html',
  styleUrls: ['./add.component.scss']
})
export class CategoryAddComponent implements OnInit, OnDestroy {

  // reactive form
  public user: UntypedFormGroup;
  public categoryName: UntypedFormControl;
  public categoryTitle: UntypedFormControl;
  public categoryDescription: UntypedFormControl;
  public categoryKeyword: UntypedFormControl;
  public categoryComponent: UntypedFormControl;
  public categorySortOrder: UntypedFormControl;
  public status: UntypedFormControl;
  public imageInput: UntypedFormControl;
  public categorySlug: UntypedFormControl;
  public categoryDescriptions: UntypedFormControl;

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
  // cke5 
  editor = ClassicEditor;

  //  validation 
  imageType: any;
  imageTypeSupport: any;
  imageSize: number;
  imageSizeSupport: any;

  active;
  categoriesList: any = [];
  support: string;


  constructor(
    private modalService: NgbModal,
    public fb: UntypedFormBuilder,
    public sandbox: CategoriesSandbox,
    public route: ActivatedRoute,
    public router: Router,
    public ckeconfiqservice: CkeConfiqService,
    public titleService: Title,
    private toastr: ToastrService,
    private configService: ConfigService,
    private cd: ChangeDetectorRef,

  ) {
    this.titleService.setTitle('Categories');
    const index = this.route.snapshot.queryParamMap.get('index');
    const offset = this.route.snapshot.queryParamMap.get('offset');
    this.config = this.ckeconfiqservice.getEditorConfig();

    this.queryDetails.index = index || 0;
    this.queryDetails.offset = offset || 0;

  }

  // Open Panel
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

  public noWhitespaceValidator(control: UntypedFormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
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

  ngOnInit(): void {
    // Get Image
    this.imageUrl = this.configService.getImageUrl();
    this.imageType = this.configService.getImageType();
    this.imageSize = this.configService.getFileSize();
    this.imageTypeSupport = this.configService.getimageTypeSupport();
    this.imageSizeSupport = this.configService.getimageSizeSupport();
    this.support = this.configService.getFileSupport();

    // List
    this.categoryList();
    // Form
    this.categoryName = new UntypedFormControl('', Validators.compose([
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9\s-_]*$/),
      Validators.maxLength(255),
      this.noWhitespaceValidator
    ]));
    this.categoryTitle = new UntypedFormControl('', Validators.compose([
      Validators.maxLength(70)
    ]));
    this.categoryDescription = new UntypedFormControl('');
    this.categoryKeyword = new UntypedFormControl('', Validators.compose([Validators.maxLength(255)]));
    this.categoryComponent = new UntypedFormControl(null);
    this.categorySortOrder = new UntypedFormControl('', [Validators.required]);
    this.status = new UntypedFormControl(null, [Validators.required]);
    // this.imageInput = new UntypedFormControl('', [Validators.required]);
    this.categoryDescriptions = new UntypedFormControl('');
    // Initial Form
    this.user = this.fb.group({
      categoryName: this.categoryName,
      categoryTitle: this.categoryTitle,
      categoryDescription: this.categoryDescription,
      categoryKeyword: this.categoryKeyword,
      categoryComponent: this.categoryComponent,
      categorySortOrder: this.categorySortOrder,
      categorySlug: this.categorySlug,
      status: this.status,
      // imageInput: this.imageInput,
    });
    this.route.params.subscribe(data => {
      if (data) {
        this.categoryId = data.id;
      }
    });
  }

  // cke5 image upload
  ulpoadAdapterDrop(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = ((loader: any, data: any) => {
      return new Adapter(loader, data);
    });
  }

  // Get List
  categoryList(): void {
    const param: any = {};
    param.limit = '';
    param.offset = '';
    param.keyword = '';
    param.sortOrder = '';
    this.sandbox.categoryList(param);
    this.subscriptions.push(this.sandbox.categoriesListResponse$.subscribe(data => {
      if (data && data === true) {

      if(!['',null,undefined].includes(this.categoryId)) {
        this.editCategoryList();

      }
      }
    }));
    this.subscriptions.push(this.sandbox.getCategoriesList$.subscribe(data => {
      if (data) {
        this.categoriesList = data;
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
  // Submit
  onSubmits(user): void {
    this.submittedValues = true;
    if (this.user.invalid) {
      if (this.user.controls.categorySortOrder.invalid || this.user.controls.status.invalid) {
        this.active = 1;
        this.scrollToError();
        this.validateAllFormFields(this.user);
        return;
      }
      // else {
      //   this.active = 2;
      //   this.scrollToError();
      //   this.validateAllFormFields(this.user);
      //   return;
      // }
    }

    if (['', null, undefined].includes(this.postImageUrl)) {
      this.active = 2;
      this.scrollToError();
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
    this.param.categorySlug = user.value.categorySlug;
    this.param.status = user.value.status;
    this.param.image = this.ImageUrl;
    this.param.categoryDescription = user.value.categoryDescription
    if (this.categoryId) {
      this.param.categoryId = this.categoryId;
      this.sandbox.updateCategories(this.param);
    } else {
      this.sandbox.addCategories(this.param);
    }
    this.subscribe();
  }

  scrollToError(): void {
    const firstElementWithError = document.querySelector('.ng-invalid[formControlName]');

    this.scrollTo(firstElementWithError);
  }

  scrollTo(el: Element): void {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }


  // Subscribe Value
  public subscribe(): void {
    this.sandbox.getAddCategories$.subscribe(data => {
      if (data && data.status === 1) {
        this.router.navigate(['/vendors/product-config/categories/list'], { queryParams: this.queryDetails });
      }
    });
    this.sandbox.getUpdateCategoriesData$.subscribe(data => {
      if (data && data.status === 1) {
        this.router.navigate(['/vendors/product-config/categories/list'], { queryParams: this.queryDetails });
      }
    });
  }

  // Detail 
  editCategoryList(): void {
   
    const params: any = {};
    params.categoryId = this.categoryId;
    this.sandbox.categoryDetailsRemove({})
    this.sandbox.getCategoryDetails(params);
    this.subscriptions.push(this.sandbox.categoryDetails$.subscribe(data => {
      if (data && Object.keys(data).length) {
        this.setCategory(data);
        this.new = data;
      }
    }));
  }

  // Set value of Edit Page
  setCategory(details) {
    this.user.controls['status'].setValue(details.isActive);
    this.user.controls['categoryName'].setValue(details.name);
    this.user.controls['categoryComponent'].setValue(
      details.parentInt
    );
    this.user.controls['categorySortOrder'].setValue(
      details.sortOrder
    );
    this.user.controls['categorySlug'].setValue(
      details.categorySlug
    );

    if (details.image !== null) {
      this.postImageUrl = this.imageUrl + '?path=' + details?.imagePath + '&name=' + details?.image +
        '&width=160&height=150';
    }
    if (details.categoryDescription !== '') {
      this.user.controls.categoryDescription.setValue(
        this.htmlTagConversion(details.categoryDescription)
      );
    } else {
      this.user.controls.categoryDescription.setValue(details.categoryDescription);
    }
    this.cd.detectChanges();
  }

  validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls)?.forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
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
    if ($event.target.files && $event.target.files.length > 0) {
      this.item = $event.target.files[0].name
    }
  }


  // Convert base64
  convertBase64(inputValue: any) {
    this.imageTypeError = false;
    this.imageSizeError = false;

    if (inputValue.files && inputValue.files[0]) {

      if (!this.imageType.exec(inputValue.files[0].name)) {
        this.imageTypeError = true;
        this.ImageUrl = '';
        this.postImageUrl = '';
        this.filePath.nativeElement.value = '';
        // this.user.controls['imageInput'].setValue('');
        this.toastr.error(this.imageTypeSupport);
        return;
      }
      this.imageTypeError = false;

      const size = Math.round(inputValue.files[0].size / 1024);
      if (size > this.imageSize) {
        this.imageSizeError = true;
        this.ImageUrl = '';
        this.postImageUrl = '';
        this.filePath.nativeElement.value = '';
        // this.user.controls['imageInput'].setValue('');
        this.toastr.error(this.imageSizeSupport);
        return;
      }
      this.imageSizeError = false;

      const file: File = inputValue.files[0];
      // this.user.controls['imageInput'].setValue(file ? file.name : '');
      const myReader: FileReader = new FileReader();
      myReader.onloadend = e => {
        this.postImageUrl = myReader.result;
        this.ImageUrl = myReader.result;
        this.cd.detectChanges();
      };
      myReader.readAsDataURL(file);
    }
  }


  // Html Conversion
  htmlTagConversion(data) {
    if (data) {
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
  }

  // Destory the component
  ngOnDestroy(): void {
    this.subscriptions?.forEach(each => each.unsubscribe());
  }
}
