// Angular
import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

// third party
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// sandbox and service
import { ConfigService } from '../../../../../../../../core/admin/service/config.service';
import { CategoriesSandbox } from '../../../../../../../../core/admin/catalog/category/categories.sandbox';
import { LanguagesSandbox } from '../../../../../../../../core/admin/settings/localizations/languages/languages.sandbox';
import { CkeConfiqService } from 'src/core/admin/shared/ckeconfiq/ckeconfiq.service';

@Component({
  selector: 'app-localization-add',
  templateUrl: './localization-add.component.html',
  styleUrls: ['./localization-add.component.scss']
})
export class CategoryLocalizationAddComponent implements OnInit {
  public config: any;
  public categoryForms: UntypedFormGroup[];
  public languageList: any[] = [];
  public imageUrl: string;
  public receivedData: any;
  public categoryDetail: any;
  categoryDescription: string = '';
  translation: any;
  formBuilder: any;
  // cke5 
  editor = ClassicEditor;

  constructor(
    public configService: ConfigService,
    public route: ActivatedRoute,
    public router: Router,
    private fb: UntypedFormBuilder,
    public categorySandbox: CategoriesSandbox,
    public languageSandbox: LanguagesSandbox,
    private changeDetectRef: ChangeDetectorRef,
    private ckeconfiqservice: CkeConfiqService,
    private el: ElementRef,
    private title: Title
  ) {
    this.config = this.ckeconfiqservice.getEditorConfig();
  }
  ngOnInit(): void {
    this.title.setTitle('Categories Localization');
    this.imageUrl = this.configService.getImageUrl();
    this.route.queryParams.subscribe(params => {
      this.receivedData = params;
    });
    this.getLanguageList();
    this.categoryLocalizationDetail();
    this.languageList?.forEach(lang => {
      const formGroup = this.fb.group({
        languageId: [lang.languageId],
        categoryName: ['', Validators.required],
        categoryDescription: ['', Validators.required]
      });
      this.categoryForms.push(formGroup);
    });
  }


  createcategoryForm(): UntypedFormGroup {
    return this.fb.group({
      languageId: [''],
      categoryName: [''],
      categoryDescription: ['']
    });
  }

  // Language List
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
      this.categoryForms = this.languageList?.map(() => this.createcategoryForm());
      this.changeDetectRef.detectChanges();
    });
  }

  // Category Detail
  categoryLocalizationDetail() {
    const params: any = {};
    params.categoryId = this.receivedData?.categoryId;
    this.categorySandbox.translationDetail(params);
    this.categorySandbox.translationDetail$.subscribe(val => {
      this.categoryDetail = val;
      this.categoryDescription = this.htmlTagConversion(val.categoryDescription);
      if (val) {
        const ids: any[] = [];
        this.languageList?.forEach((language, index) => {
          this.translation = val.categoryTranslation.find(trans => trans.languageId === language.languageId);
          if (this.translation) {
            this.categoryForms[index].controls['categoryName'].setValue(this.translation.name);
            this.categoryForms[index].controls['categoryDescription'].setValue(this.translation.description);
            this.categoryForms[index].controls['languageId'].setValue(this.translation.id);
            ids.push(this.translation.id)
          }
        });
      }
    });
  }

  // Save
  save() {
    const filledDetails = this.categoryForms.map((form, index) => {
      let ab: any = {

        languageId: this.languageList[index].languageId,
        name: this.languageList[index].languageId ? form.value.categoryName : '',
        description: this.languageList[index].languageId ? form.value.categoryDescription : ''
      };
      if (form.value.languageId) {
        ab.id = form.value.languageId
      }
      return ab;
    });
    const filtercategorysWithNameAndDescription = (category: any) => {
      return category.name !== "" && category.description !== "";
    };

    const filteredcategorys = filledDetails.filter(filtercategorysWithNameAndDescription);

    const params: any = {
      data: {
        categoryTranslation: filteredcategorys
      },
      id: this.receivedData.categoryId
    };
    this.categorySandbox.add_Translation(params);
    this.categorySandbox.add_Translation$.subscribe((val) => {
      if (val?.status == 1) {
        this.router.navigate(['/vendors/product-config/categories/localization']);
      }
    })
  }

  // Back To List
  cancel() {
    this.router.navigate(['/vendors/product-config/categories/localization']);
  }

  // Route
  scrollToLanguage(language: string) {
    const element = this.el.nativeElement.querySelector(`#${language}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    } else {
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

}
