import { ChangeDetectorRef, Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductLocalizationSandbox } from '../../../../../../../../src/app/core/catalog/product-localization/product-loacalization.sandbox';
import { ConfigService } from '../../../../../../../../src/app/core/services/config.service';
import { CommonSandbox } from '../../../../../../../../src/app/core/common/common.sandbox';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { environment } from '../../../../../../../../src/environments/environment';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product-localization-add',
  templateUrl: './product-localization-add.component.html',
  styleUrls: ['./product-localization-add.component.scss']
})
export class ProductLocalizationAddComponent implements OnInit, OnDestroy {

  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  public productForms: UntypedFormGroup[];
  public languageList: any[] = [];
  public imageUrl: string;
  public receivedData: any;
  public productDetail: any;
  mycontent: string;
  productDescription: any;
  translation: any;

  // cke5 
  config: any;
  editor = ClassicEditor;

  private subscription: Array<Subscription> = [];
  queryData: any = {};

  constructor(
    public configService: ConfigService,
    public route: ActivatedRoute,
    public router: Router,
    private fb: UntypedFormBuilder,
    public productLocalizationSanbox: ProductLocalizationSandbox,
    public commonSandbox: CommonSandbox,
    private changeDetectRef: ChangeDetectorRef,
    private el: ElementRef,
  ) { }

  ngOnInit(): void {
    this.mycontent = `<p>My html content</p>`;
    this.config = this.configService.getEditorConfig();
    this.getLanguageList();
    this.imageUrl = environment.imageUrl;

    this.route.queryParams.subscribe(params => {
      this.receivedData = params;
      this.queryData.offset = params?.offset ? params.offset : 0;
      this.queryData.limit = params.limit ? params.limit : 10;
      this.queryData.currentPage = params.currentPage ? params.currentPage : 1;
    });
    this.productLocalizationDetail();
  }

  createProductForm(): UntypedFormGroup {
    return this.fb.group({
      languageId: [''],
      productName: [''],
      productDescription: ['']
    });
  }

  getLanguageList() {
    const params: any = {
      limit: 10,
      offset: 0,
      keyword: '',
      status: ''
    };
    this.commonSandbox.languageList1(params);
   this.subscriptions.add(this.commonSandbox.languageList1$.subscribe(val => {
      if (val) {
        this.languageList = val;
        this.productForms = this.languageList?.map(() => this.createProductForm());
        this.changeDetectRef.detectChanges();
      }
    }))
  }

  productLocalizationDetail() {
    const params: any = {};
    params.productId = this.receivedData?.productId;
    this.productLocalizationSanbox.productLocalizationDetail(params);
    this.subscriptions.add(this.productLocalizationSanbox.productLocalizationDetail$.subscribe(val => {
      this.productDetail = val;
      if (val) {
        const ids: any[] = [];
        this.languageList.forEach((language, index) => {
          this.translation = val.productTranslation.find(trans => trans.languageId === language.languageId);
          if (this.translation) {
            this.productForms[index].controls['productName'].setValue(this.translation.name);
            this.productForms[index].controls['productDescription'].setValue(this.translation.description);
            this.productForms[index].controls['languageId'].setValue(this.translation.id);
            ids.push(this.translation.id)
          }
        });
      }
    }));
  }

  save() {
    const filledDetails = this.productForms.map((form, index) => {
      let productTranslation: any = {
        languageId: this.languageList[index].languageId,
        name: this.languageList[index].languageId ? form.value.productName : '',
        description: this.languageList[index].languageId ? form.value.productDescription : ''
      };
      if (form.value.languageId) {
        productTranslation.id = form.value.languageId
      }
      return productTranslation;
    });

    const filterProductsWithNameAndDescription = (product: any) => {
      return product.name !== "" && product.description !== "";
    };

    const filteredProducts = filledDetails.filter(filterProductsWithNameAndDescription);

    const params: any = {
      data: {
        productTranslation: filteredProducts
      },
      id: this.receivedData.productId
    };
    this.productLocalizationSanbox.productLocalizationCreate(params);
    this.subscriptions.add(this.productLocalizationSanbox.productLocalizationCreate$.subscribe((val) => {
      if (val) {
        this.router.navigate(['/new-catalog/product-localizaton/list'], { queryParams: this.queryData});
       
      }
    }))
  }

  cancel() {
    this.router.navigate(['/new-catalog/product-localizaton/list'], { queryParams: this.queryData});
  }

  scrollToLanguage(language: string) {
    const element = this.el.nativeElement.querySelector(`#${language}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

}
