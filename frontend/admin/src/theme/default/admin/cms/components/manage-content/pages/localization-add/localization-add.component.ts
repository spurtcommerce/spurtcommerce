// Angular
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// third party
import { Subscription } from 'rxjs';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// sandbox and service
import { LanguagesSandbox } from '../../../../../../../../core/admin/settings/localizations/languages/languages.sandbox';
import { ConfigService } from '../../../../../../../../core/admin/service/config.service';
import { PagesSandbox } from '../../../../../../../../core/admin/cms/pages/pages.sandbox';
import { CkeConfiqService } from 'src/core/admin/shared/ckeconfiq/ckeconfiq.service';

@Component({
  selector: 'app-localization-add',
  templateUrl: './localization-add.component.html',
  styleUrls: ['./localization-add.component.scss']
})
export class PagesLocalizationAddComponent implements OnInit, OnDestroy {

  public config: any;
  public forms: UntypedFormGroup[];
  public languageList: any[] = [];
  public imageUrl: string;
  public receivedData: any;
  public pageDetail: any;
  mycontent: string;
  translation: any;
  // cke5 
  editor = ClassicEditor;
  private subscriptions: Array<Subscription> = [];
  content: any;
  constructor(
    public configService: ConfigService,
    public route: ActivatedRoute,
    public router: Router,
    private fb: UntypedFormBuilder,
    public sandbox: PagesSandbox,
    public languageSandbox: LanguagesSandbox,
    private changeDetectRef: ChangeDetectorRef,
    private el: ElementRef,
    private ckeconfiqservice: CkeConfiqService,
  ) { }

  ngOnInit(): void {
    this.mycontent = `<p>My html content</p>`;
    this.config = this.ckeconfiqservice.getEditorConfig();
    this.getLanguageList();
    this.imageUrl = this.configService.getImageUrl();

    this.route.queryParams.subscribe(params => {
      this.receivedData = params;
    });
    this.pageLocalizationDetail();
  }

  createProductForm(): UntypedFormGroup {
    return this.fb.group({
      languageId: [''],
      title: [''],
      content: ['']
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
    this.subscriptions.push(this.languageSandbox.languageList$.subscribe((val) => {
      this.languageList = val;
      this.forms = this.languageList?.map(() => this.createProductForm());
      this.changeDetectRef.detectChanges();
    }));
  }

  // Page Detail
  pageLocalizationDetail() {
    const params: any = {};
    params.pageId = this.receivedData?.pageId;
    this.sandbox.pageLocalizationDetail(params);
    this.subscriptions.push(this.sandbox.pageLocalizationDetail$.subscribe(val => {
      this.pageDetail = val;
      this.content = this.htmlTagConversion(val?.content);
      this.changeDetectRef.detectChanges();
      if (val) {
        const ids: any[] = [];
        this.languageList?.forEach((language, index) => {
          this.translation = val.pageTranslation?.find(trans => trans.languageId === language.languageId);

          if (this.translation) {
            this.forms[index].controls['title'].setValue(this.translation.title);
            this.forms[index].controls['content'].setValue(this.translation.content)
            this.forms[index].controls['languageId'].setValue(this.translation.id);
            ids.push(this.translation.id)
          }
        });
      }
    }));
  }


  // Save
  save() {
    const filledDetails = this.forms.map((form, index) => {
      let pageTranslation: any = {
        languageId: this.languageList[index].languageId,
        title: this.languageList[index].languageId ? form.value.title : '',
        content: this.languageList[index].languageId ? form.value.content : ''
      };
      if (form.value.languageId) {
        pageTranslation.id = form.value.languageId
      }
      return pageTranslation;
    });

    const filterWithNameAndDescription = (page: any) => {
      return page.title !== "";
    };

    const filtered = filledDetails.filter(filterWithNameAndDescription);

    const params: any = {
      data: {
        pageTranslation: filtered
      },
      id: this.receivedData.pageId
    };
    this.sandbox.pageLocalizationCreate(params);
    this.router.navigate(['/cms/manage-content/pages/list-localization']);
  }

  // Back To List
  cancel() {
    this.router.navigate(['/cms/manage-content/pages/list-localization']);
  }

  // Route
  scrollToLanguage(language: string) {
    const element = this.el.nativeElement.querySelector(`#${language}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
  }

  private htmlTagConversion(data){
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

  // Destroy
  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }

}

