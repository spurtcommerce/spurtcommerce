// Angular
import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// sandbox and service
import { LanguagesSandbox } from '../../../../../../../../core/admin/settings/localizations/languages/languages.sandbox';
import { PageGroupSandbox } from '../../../../../../../../core/admin/cms/page-group/page-group.sandbox';
import { ConfigService } from '../../../../../../../../core/admin/service/config.service';

@Component({
  selector: 'app-localization-add',
  templateUrl: './localization-add.component.html',
  styleUrls: ['./localization-add.component.scss']
})
export class PageGroupLocalizationAddComponent implements OnInit {

  public config: any;
  public forms: UntypedFormGroup[];
  public languageList: any[] = [];
  public imageUrl: string;
  public receivedData: any;
  public pageGroupDetail: any;
  mycontent: string;
  pageGroupDescription: any;
  translation: any;

  constructor(
    public configService: ConfigService,
    public route: ActivatedRoute,
    public router: Router,
    private fb: UntypedFormBuilder,
    public sandbox: PageGroupSandbox,
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
    this.pageGroupLocalizationDetail();
  }

  createProductForm(): UntypedFormGroup {
    return this.fb.group({
      languageId: [''],
      groupName: ['']
    });
  }


  // Language List
  getLanguageList() {
    const params: any = {
      limit: 10,
      offset: 0,
      keyword: '',
      status: '',
      isDefault: JSON.parse(sessionStorage.getItem('adminsetting')).defaultLanguageId
    };
    this.languageSandbox.languageList(params);
    this.languageSandbox.languageList$.subscribe((val) => {
      this.languageList = val;
      this.forms = this.languageList?.map(() => this.createProductForm());
      this.changeDetectRef.detectChanges();
    });
  }


  // Page Group Detail
  pageGroupLocalizationDetail() {
    const params: any = {};
    params.groupId = this.receivedData?.groupId;
    this.sandbox.pageGroupLocalizationDetail(params);
    this.sandbox.pageGroupLocalizationDetail$.subscribe(val => {
      this.pageGroupDetail = val;

      if (val) {
        const ids: any[] = [];
        this.languageList?.forEach((language, index) => {
          this.translation = val.pageGroupTranslation.find(trans => trans.languageId === language.languageId);

          if (this.translation) {
            this.forms[index].controls['groupName'].setValue(this.translation.groupName);
            this.forms[index].controls['languageId'].setValue(this.translation.id);
            ids.push(this.translation.id)
          }
        });
      }
    });
  }


  // Save
  save() {
    const filledDetails = this.forms.map((form, index) => {
      let pageGroupTranslation: any = {
        languageId: this.languageList[index].languageId,
        groupName: this.languageList[index].languageId ? form.value.groupName : '',
      };

      if (form.value.languageId) {
        pageGroupTranslation.id = form.value.languageId
      }
      return pageGroupTranslation;
    });

    const filterGroupWithNameAndDescription = (pageGroup: any) => {
      return pageGroup.groupName !== "";
    };

    const filteredGroup = filledDetails.filter(filterGroupWithNameAndDescription);

    const params: any = {
      data: {
        pageGroupTranslation: filteredGroup
      },
      id: this.receivedData.groupId
    };
    this.sandbox.pageGroupLocalizationCreate(params);
    this.sandbox.pageGroupLocalizationCreate$.subscribe((val) => {
      if (val?.status == 1) {
        this.router.navigate(['/cms/manage-content/page-group/list-localization']);
      }
    })
  }

  // Back to List
  cancel() {
    this.router.navigate(['/cms/manage-content/page-group/list-localization']);
  }

  // Route
  scrollToLanguage(language: string) {
    const element = this.el.nativeElement.querySelector(`#${language}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
  }

}

