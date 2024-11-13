import { ChangeDetectorRef, Component, OnInit, ElementRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../../../../../../../core/admin/service/config.service';
import { ProductLocalizationSandbox } from '../../../../../../../../core/admin/catalog/product-localization/product-loacalization.sandbox';
import { LanguagesSandbox } from '../../../../../../../../core/admin/settings/localizations/languages/languages.sandbox';

@Component({
  selector: 'app-product-localization-add',
  templateUrl: './product-localization-add.component.html',
  styleUrls: ['./product-localization-add.component.scss']
})
export class ProductLocalizationAddComponent implements OnInit {

  public config: any;
  public productForms: UntypedFormGroup[];
  public languageList: any[] = [];
  public imageUrl: string;
  public receivedData: any;
  public productDetail: any;
  mycontent: string;
  productDescription: any;
  translation: any;

  constructor(
    public configService: ConfigService,
    public route: ActivatedRoute,
    public router: Router,
    private fb: UntypedFormBuilder,
    public productLocalizationSanbox: ProductLocalizationSandbox,
    public languageSandbox: LanguagesSandbox,
    private changeDetectRef: ChangeDetectorRef,
    private el: ElementRef,
  ) { }

  ngOnInit(): void {
    this.mycontent = `<p>My html content</p>`;
    this.config = this.configService.getckeconfig();
    this.getLanguageList();
    this.imageUrl = this.configService.getImageUrl();

    this.route.queryParams.subscribe(params => {
      this.receivedData = params;
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
    this.languageSandbox.languageList(params);
    this.languageSandbox.languageList$.subscribe((val) => {
      this.languageList = val;
      this.productForms = this.languageList?.map(() => this.createProductForm());
      this.changeDetectRef.detectChanges();
    });
  }

  productLocalizationDetail() {
    const params: any = {};
    params.productId = this.receivedData?.productId;
    this.productLocalizationSanbox.productLocalizationDetail(params);
    this.productLocalizationSanbox.productLocalizationDetail$.subscribe(val => {
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
    });
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
    // console.log(this.productDetail, params, 'param')
    this.productLocalizationSanbox.productLocalizationCreate(params);
    this.router.navigate(['/catalog/manage-products/localization/list']);
  }

  cancel() {
    this.router.navigate(['/catalog/manage-products/localization/list']);
  }

  scrollToLanguage(language: string) {
    const element = this.el.nativeElement.querySelector(`#${language}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center',inline: 'nearest'});
    } 
  }
  
}
