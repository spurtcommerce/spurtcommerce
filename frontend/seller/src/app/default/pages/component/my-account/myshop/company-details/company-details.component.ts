import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { AddCapabilitiesModalComponent } from '../add-capabilities-modal/add-capabilities-modal.component';
import { AddVideoModalComponent } from '../add-video-modal/add-video-modal.component';
import Adapter, { ConfigService } from "../../../../../../core/services/config.service";
import { DocumentsTable, capabilitiesTable, objForm, pageSizeOptions, removeEmptyKeys } from './company-details.constant';
import { MyShopSandbox } from '../../../../../../../../src/app/core/myShop/myShop.sandbox';
import { environment } from '../../../../../../../../src/environments/environment';
import { Subscription } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalPopupComponent } from '../../../catalog/manage-product/modalpopup/modalpopup.component';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { getFormControlsFields } from '../../../../../../../../src/app/default/shared/components/reusable-forms/form-constant';
import { getTypes } from '../../../../../../../../src/app/default/shared/components/reusable-forms/form-constant';
import * as _moment from 'moment';
import { DatePipe } from '@angular/common';
import { ImagemanagerpopupComponent } from '../../../../../../../../src/app/default/shared/popup/ImageManagerPopup/imagemanagerpopup.component';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from "@angular/platform-browser";
import { reference } from '@popperjs/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Title } from "@angular/platform-browser";
import { MatPaginator } from '@angular/material/paginator';
import { itemsPerPage, itemsPerPageList } from "../../../../../../../../src/app/default/shared/components/reusable-pagination/pagination.constant";
interface FormGroupValue {
  [key: string]: any;
}
interface DateObject {
  year: number;
  month: number;
  day: number;
}
@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss'],
  providers: [DatePipe]
})

export class CompanyDetailsComponent implements OnInit, OnDestroy {
  @ViewChild("dropdownContent", { static: false }) dropdownContent!: ElementRef;
  @ViewChild("dropdownContentFilter", { static: false }) dropdownContentFilter!: ElementRef;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('dropdownContentDynamicColumn', { static: false }) dropdownContentDynamicColumn: ElementRef;
  //Dynamic columns
  public backupData: any = JSON.parse(JSON.stringify(DocumentsTable));
  public dynamicColumnFields: any = JSON.parse(JSON.stringify(DocumentsTable));
  public config: any;
  ckeditorContent: string
  public submitted = false;
  fileImage: any;
  public imageUrl: string;
  public postImageUrl: any;
  public ImageUrl: any = '';
  public imageTypeError = false;
  public imageSizeError = false;
  public shopUrl: any = ''
  @ViewChild('filePath') filePath: ElementRef;

  public imageUrlLogo: string;
  public postImageUrlLogo: any = '';
  public ImageUrlLogo: any = '';
  public imageTypeLogoError = false;
  public imageSizeLogoError = false;
  @ViewChild('filePathLogo') filePathLogo: ElementRef;
  capabilitiesDataList: any = [];
  capabilitiesTableData = capabilitiesTable;
  productDescription: any;

  BaseImageUrl: any;
  private subscriptions: Array<Subscription> = [];
  sellerId: any;
  vendorId: any;
  logoStatus: Boolean = false;
  // --------------documents---------------------
  _object = Object;
  documentsTableData = DocumentsTable;
  currentPage = 1; //page number
  limit: any = itemsPerPage;
  offset = 0;
  documentListData: any = [];
  //pagesize
  perPageCount: boolean = false;
  public pageSize: any;
  indexs: number;
  selectedpage: any = 10;
  page: any = itemsPerPageList;
  model: any = objForm;
  // Reusabe form 
  formObjModel: any = objForm;
  dynamicControls: any = [];
  keyword: any = '';
  searched: Boolean = false;
  // filterSearch: any = {};
  isSearched: boolean = false;
  isFilter: boolean = false;
  selectAll: boolean = false;
  public filterForm: UntypedFormGroup;
  /*filter*/
  dynamicFormGroup: any;
  filterSearch: FormGroupValue = {};
  active: Number = 1;
  // active:any;
  activeStatus: any;
  public uploadImage: any = [];
  public apiResponse: any = [];
  dummyImage: any = [];
  primaryImgae: any = []

  videourl: any;
  basicDetailData: any;
  imageError: any;
  imageDataSample: any = []
  FinalUrl: string;
  urlSafe: any = "";
  videoDataList: any[] = [];
  videoName: any;
  editVideoValue = {};
  private player: any;
  public videoDuration: string;
  dynamicTableTitle: any = {};
  pagination: boolean = true
  videoIndex: any = 0;
  totalImageLength: any;
  isImageEnable: Boolean = true;
  isVideoEnable: Boolean = true;
  certificateFilterForm: UntypedFormGroup;
  subscript = new Subscription()

  // cke5 
  editor = ClassicEditor;
  // image Validation
  imageType = environment.imageType;
  imageSize = environment.filesize;
  imageTypeSupport = environment.imageTypeSupport;
  imageSizeSupport = environment.imageSizeSupport;
  imageDimension = environment.imageSupportFile;
  constructor(private modalService: NgbModal, public configService: ConfigService, private changeDetectRef: ChangeDetectorRef,
    public myShopSandbox: MyShopSandbox,
    public router: Router,
    public route: ActivatedRoute,
    public modal: NgbModal,
    public fb: UntypedFormBuilder,
    private toaster: ToastrService,
    public domSanitizer: DomSanitizer,
    private datePipe: DatePipe,
    private titleService: Title
  ) {
    this.shopUrl = environment.shopurl;
    this.config = this.configService.getEditorConfig();
    this.titleService.setTitle("My Shop");
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(val => {
      this.active = +val.currentTab ? +val.currentTab : 1;
    })
    this.BaseImageUrl = environment.imageUrl;
    this.buildForm();
    this.initcertificateFilterForm()
    this.companyBasicDetailsList();
    this.imageDetail();
    this.videoDetail();
    this.dynamicTable();

    if (!['', null, undefined].includes(this.vendorId)) {
      this.routeSubscribe();
    }

  }

  // cke5 image upload
  ulpoadAdapterDrop(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = ((loader: any, data: any) => {
      return new Adapter(loader, data);
    });
  }


  initcertificateFilterForm() {
    this.certificateFilterForm = this.fb.group({
      Name: [''],
      'Reference No': [''],
      'Validate From': [null],
      'Validate To': [null]
    })
  }



  // value update in queryparams and pagination//
  updateQueryParam(): void {
    this.router.navigate([], { queryParams: { currentTab: this.active }, queryParamsHandling: 'merge' });
  }
  /*filters*/
  private buildForm(): void {
    const formGroupFields = getFormControlsFields(this.model);
    this.dynamicFormGroup = this.fb.group(formGroupFields);
    this.model.forEach((element: any) => {
      this.dynamicControls.push(getTypes(element, this.dynamicFormGroup));
    });
  }


  companyBasicDetailsList() {
    this.myShopSandbox.basicDetailGet({});
    this.subscriptions.push(this.myShopSandbox.basicDetailGet$.subscribe(val => {
      if (val?.status == 1) {
        this.sellerId = val?.data?.customerId;
        this.vendorId = val?.data?.vendorId;
        this.setValue(val?.data);
        this.routeSubscribe();
      }
    }))
  }


  setValue(data) {
    this.basicDetailData = data.displayNameUrl
    this.shopUrl = environment.shopurl + '/' + this.basicDetailData
    this.capabilitiesDataList = data?.capabilities ?? [];
    this.ImageUrl = '';
    // this.postImageUrl = this.BaseImageUrl + '?path=' +data?.companyCoverImage + '&name=' + data?.companyCoverImagePath + '&width=60&height=60';
    this.postImageUrl = ['', null, undefined].includes(data?.companyCoverImage) ? 'assets/imgs/company-banner-default.svg' : this.BaseImageUrl + '?path=' + data?.companyCoverImagePath + '&name=' + data?.companyCoverImage + '&width=1920&height=524';
    this.changeDetectRef.detectChanges();
    this.ImageUrlLogo = ''
    if (['', null, undefined].includes(data?.companyLogoPath)) {
      this.postImageUrlLogo = ''
    } else {
      this.postImageUrlLogo = this.BaseImageUrl + '?path=' + data?.companyLogoPath + '&name=' + data?.companyLogo + '&width=60&height=60';
    }
    // this.postImageUrlLogo =['',null,undefined].includes(data?.companyLogoPath)?'assets/imgs/imgLogo.svg'  :this.BaseImageUrl + '?path=' +data?.companyLogo + '&name=' + data?.companyLogoPath + '&width=60&height=60';
    this.productDescription = data?.vendorDescription;
  }




  board = [
    { id: 1, name: '10' },
    { id: 2, name: '20' },
    { id: 3, name: '30' },
    { id: 4, name: '40' },
  ];
  selectedboard: any;

  category = [
    { id: 1, name: 'Rugs' },
    { id: 2, name: 'Carpet Rugs' }
  ];
  selectedcategory: any;

  uploadButtonClick() {
    const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
    el.click();
  }

  uploadChange($event): void {
    // this.filePath.nativeElement.value = '';

    this.submitted = false;
    this.convertBase64($event.target);
    this.fileImage = $event.target.files[0].name
  }


  convertBase64(inputValue: any) {
    this.imageTypeError = false;
    this.imageSizeError = false;
    if (inputValue.files && inputValue.files[0]) {
      if (!this.imageType.exec(inputValue.files[0].name)) {
        this.imageTypeError = true;
        this.ImageUrl = '';
        this.postImageUrl = 'assets/imgs/company-banner-default.svg';
        this.filePath.nativeElement.value = '';
        // this.blogForm.controls['imageInput'].setValue('');
        return false;
      }
      const size = Math.round(inputValue.files[0].size / 1024);
      if (size > this.imageSize) {
        this.imageSizeError = true;
        this.ImageUrl = '';
        this.postImageUrl = 'assets/imgs/company-banner-default.svg';
        this.filePath.nativeElement.value = '';
        // this.blogForm.controls['imageInput'].setValue('');
        return;
      }
      this.imageTypeError = false;
      this.imageSizeError = false;
      const file: File = inputValue.files[0];
      // this.blogForm.controls['imageInput'].setValue(file ? file.name : '');
      const myReader: FileReader = new FileReader();
      myReader.onloadend = e => {
        this.postImageUrl = myReader.result;
        this.ImageUrl = myReader.result;
        this.changeDetectRef.detectChanges();
      };
      myReader.readAsDataURL(file);
    }
  }


  uploadChangeLogo($event): void {
    this.submitted = false;
    this.convertBase64Logo($event.target);
    this.fileImage = $event.target.files[0].name
  }


  convertBase64Logo(inputValue: any) {
    this.imageTypeLogoError = false;
    this.imageSizeLogoError = false;
    if (inputValue.files && inputValue.files[0]) {
      if (!this.imageType.exec(inputValue.files[0].name)) {
        this.imageTypeLogoError = true;
        this.ImageUrlLogo = '';
        // this.postImageUrlLogo = 'assets/imgs/company-banner-default.svg';
        this.filePath.nativeElement.value = '';
        // this.blogForm.controls['imageInput'].setValue('');
        return false;
      }
      const size = Math.round(inputValue.files[0].size / 1024);
      if (size > this.imageSize) {
        this.imageSizeLogoError = true;
        this.ImageUrlLogo = '';
        // this.postImageUrlLogo = 'assets/imgs/company-banner-default.svg';
        this.filePath.nativeElement.value = '';
        // this.blogForm.controls['imageInput'].setValue('');
        return;
      }
      this.imageTypeLogoError = false;
      this.imageSizeLogoError = false;
      const file: File = inputValue.files[0];
      // this.blogForm.controls['imageInput'].setValue(file ? file.name : '');
      const myReader: FileReader = new FileReader();
      myReader.onloadend = e => {
        this.postImageUrlLogo = myReader.result;
        this.ImageUrlLogo = myReader.result;
        this.changeDetectRef.detectChanges();
      };
      myReader.readAsDataURL(file);
    }
  }

  cancelCompanyDetail() {

    const modelRef = this.modal.open(ModalPopupComponent, {
      size: 'md', backdrop: 'static', backdropClass: 'createcr', centered: true, windowClass: "assignattributesmodal-categories delete-modal",
    })
    modelRef.componentInstance.deleteMessage = "new changes"
    modelRef.result.then(result => {
      if (result == "deleted") {
        this.ImageUrlLogo = '';
        this.postImageUrlLogo = '';
        this.productDescription = ''
        this.capabilitiesDataList = ''
        this.ImageUrl = ''
        this.ImageUrlLogo = ''
        this.companyBasicDetailsList();
      }
    })
  }

  removeImage() {
    this.logoStatus = true;
    this.ImageUrlLogo = '';
    this.postImageUrlLogo = '';
  }

  // document reusable table
  buttonAction(e: any): void {
    switch (e.key) {
      case "imageMenu":
        if (e.actionType == "Edit") {
          this.openaddcapabilities(e.currentIndex);

        }
        else if (e.actionType == "Delete") {
          this.capabilitiesDelete(e.currentIndex);
        }
        break;
    }
  }


  openaddcapabilities(editIndex = null) {
    const modelRef = this.modalService.open(AddCapabilitiesModalComponent, {
      size: 'xl', windowClass: 'assignattributesmodal mw-33', backdrop: 'static', backdropClass: 'createcr', centered: true,
    });
    modelRef.componentInstance.editedIndex = editIndex;
    modelRef.componentInstance.editedValues = editIndex >= 0 ? this.capabilitiesDataList[editIndex] : {};
    modelRef?.result?.then(val => {
      if (val?.modelStatus === 'save') {
        if ([null, undefined, ''].includes(editIndex)) {
          this.capabilitiesDataList.push(val);
        } else {
          this.capabilitiesDataList[editIndex] = val;
        }
      }
    })

  }

  // capabilities model delete
  capabilitiesDelete(currentIndex): void {
    this.capabilitiesDataList.splice(currentIndex, 1);
  }


  save() {
    this.imageTypeLogoError = false;
    this.imageSizeLogoError = false;
    this.imageTypeError = false;
    this.imageSizeError = false;
    const params: any = {
      id: this.sellerId,
      companyCoverImage: this.ImageUrl,
      companyLogo: this.ImageUrlLogo,
      capabilities: this.capabilitiesDataList,
      vendorDescription: this.productDescription,
      vendorMedia: []
    }
    removeEmptyKeys(params)
    if (this.logoStatus) {
      params['companyLogo'] = ''
    }
    this.myShopSandbox.basicDetailCreate(params);
    this.subscriptions.push(this.myShopSandbox.basicDetailCreate$.subscribe(val => {

      if (val?.status == 1) {

        this.logoStatus = false;
        this.companyBasicDetailsList();
      }
    }));
  }




  // ----------------------------------------------documents---------------------------------------------------

  // query param route value subscribe //
  private routeSubscribe(): void {

    // this.limit = localStorage.getItem('itemsPerPage')
    //   ? localStorage.getItem('itemsPerPage')
    //   : this.limit;
    let paramsValue: any = {};
    this.route.queryParams.subscribe(params => {
      paramsValue = params;
      this.limit = paramsValue.limit ? Number(paramsValue.limit) : this.limit;
      this.offset = paramsValue.offset ? Number(paramsValue.offset) : 0;
      this.currentPage = paramsValue.currentPage ? Number(paramsValue.currentPage) : 1;
      this.keyword = paramsValue.keyword ?? '';

      this.certificateFilterForm.controls['Name']?.setValue(paramsValue.certificateName);
      this.certificateFilterForm.controls['Country']?.setValue(paramsValue.referenceNo);
      if (!['', null, undefined].includes(paramsValue.calidateFrom)) {
        const parsedObject = JSON.parse(paramsValue.validateFrom);
        this.certificateFilterForm.controls['Validate From']?.setValue(parsedObject);
      }
      if (!['', null, undefined].includes(paramsValue.validateTo)) {
        const parsedObjectDate = JSON.parse(paramsValue.validateTo);
        this.certificateFilterForm.controls['Validate To']?.setValue(parsedObjectDate);
      }
      // this.filterSearch['keyword'] = this.keyword ??  ''
      const formValues: FormGroupValue = this.certificateFilterForm.value;
      Object.entries(formValues).forEach(([key, val]) => {
        if (!['', null, undefined].includes(val)) {
          this.filterSearch[key] = val;
          if (formValues['Validate From']) {
            this.datePipe.transform(formValues['Validate To'], 'dd-MM-yyyy');
            this.filterSearch['Validate From'] = this.datePipe.transform(formValues['Validate From'], 'dd-MM-yyyy');
          }
          if (formValues['Validate To']) {
            this.filterSearch['Validate To'] = this.datePipe.transform(formValues['Validate To'], 'dd-MM-yyyy');
          }
        }

      });
      if (this.keyword) {
        this.filterSearch['keyword'] = this.keyword ?? ''
      }
      if (this.filterSearch['Validate From']) {
        this.filterSearch['Validate From'] = this.datePipe.transform(this.filterSearch['Validate From'], 'dd-MM-yyyy') ?? ''
        this.filterSearch = { ...this.filterSearch };
        this.changeDetectRef.detectChanges();
      }
      if (this.filterSearch['Validate To']) {
        this.filterSearch['Validate To'] = this.datePipe.transform(this.filterSearch['Validate To'], 'dd-MM-yyyy') ?? ''
        this.filterSearch = { ...this.filterSearch };
        this.changeDetectRef.detectChanges();
      }
    });
    this.DocumentList();
    this.DocumentListCount();
  }

  dateFormatChange(date: string) {
    const formatDate = _moment(date, 'DD/MM/yyyy').format('DD/MM/yyyy').split('/');
    return { day: +formatDate[0], month: +formatDate[1], year: +formatDate[2] }
  }

  formatDate(dateObj: DateObject): string {
    const { year, month, day } = dateObj;
    return `${day}-${month}-${year}`;
  }

  // query param value and pagination //
  private getQueryParam() {
    const params = {
      limit: this.limit,
      offset: this.offset,
      currentPage: this.currentPage,
      keyword: this.keyword ?? '',
      certificateName: this.certificateFilterForm.value?.Name,
      refrenceNo: this.certificateFilterForm.value['Reference No'],
      validFrom: this.datePipe.transform(this.certificateFilterForm.value['Validate From'], 'dd-MM-yyyy'),
      validTo: this.datePipe.transform(this.certificateFilterForm.value['Validate To'], 'dd-MM-yyyy')

    }
    return params;
  }
  //list api 
  DocumentList(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    let params = removeEmptyKeys(this.getQueryParam());

    params.count = 0;
    params.certificate = 1;
    params.vendorId = this.vendorId;
    delete params['currentPage']
    if (!['', null, undefined].includes(this.vendorId)) {
      this.myShopSandbox.certificateList(params);
    }
    this.subscriptions.push(this.myShopSandbox.certificateList$.subscribe(val => {
      if (val) {
        this.documentListData = val;
        this.documentListData.reverse();
      }


    }));
    this.updateQueryParam();
  }


  transformDate(date: string): string {
    // Split the original date '2024-30-06' into components
    const parts = date.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}/${month}/${year}`;
  }
  //dynamic column save fiels
  columnSave(): void {
    this.dynamicColumnFields = JSON.parse(JSON.stringify(this.backupData));
    this.dropdownContentDynamicColumn.nativeElement.classList.remove('show');
  }
  //count api 
  DocumentListCount(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    let params = removeEmptyKeys(this.getQueryParam());

    params.count = 1;
    params.certificate = 1;
    params.vendorId = this.vendorId;
    delete params['currentPage']
    if (!['', null, undefined].includes(this.vendorId)) {
      this.myShopSandbox.certificateListCount(params);
    }

    this.subscriptions.push(this.myShopSandbox.certificateListCount$.subscribe(val => {

    }));
  }

  dynamicTable() {

    const dynamicColumnField = {
      'Certificate Type': true,
      'Reference No': true,
      'Name': true,
      'Issued By': true,
      'Validate From': true,
      'Validate To': true,
      'Status': true,
    };
    this.dynamicTableTitle = dynamicColumnField
  }
  objectKeys(obj: any) {

    return Object.keys(obj);
  }
  //changecheckbox
  changecheckbox(event, key) {

    this.dynamicTableTitle[key] = event.target.checked, key
    const allFalse = Object.values(this.dynamicTableTitle).every(value => value === false);
    this.pagination = !allFalse;
  }

  // <---------- Pagination --------------> 

  //pagechange event pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.DocumentList();
  }

  //per page drop down//
  pageSizeChange(e): void {
    this.onPageChange({ limit: e.id, offset: 0 });
  }


  // <---------- reusable table  --------------> 

  /*common table*/
  buttonActionDocument(e: any): void {


    switch (e.key) {
      case "threeDotMenu":
        if (e.actionType == "Edit") {
          this.editDocument(e.id);
        } else if (e.actionType == "Delete") {
          this.delete(e.id);
        }
        break;


    }
  }

  // add
  addDocument(editId): void {
    this.router.navigate(['/my-account/add-certificate'], { queryParams: { currentTab: 2 } });

  }
  // edit
  editDocument(editId): void {
    this.router.navigate(['my-account/edit-certificate/' + editId]);

  }

  // <---------- delete model --------------> 

  delete(id): void {

    const modelRef = this.modal.open(ModalPopupComponent, {
      size: 'md', backdrop: 'static', backdropClass: 'createcr', centered: true, windowClass: "assignattributesmodal-categories delete-modal",
    })
    modelRef.componentInstance.deleteMessage = "Certification"
    modelRef.result.then(result => {
      if (result == "deleted") {
        this.myShopSandbox.certificateDelete(id)
        this.subscriptions.push(this.myShopSandbox.certificateDelete$.subscribe((val: any) => {
          if (val?.status == 1) {
            this.DocumentList();
            this.DocumentListCount()
          }
        }))
      }
    })
  }

  /*filters*/
  applyFilter(): void {
    this.isFilter = true;
    this.selectAll = true;
    const formValues: FormGroupValue = this.certificateFilterForm.value;
    Object.entries(formValues).forEach(([key, val]) => {
      if (!['', null, undefined].includes(val)) {
        this.filterSearch[key] = val;
        if (formValues['Validate From']) {
          this.filterSearch['Validate From'] = this.datePipe.transform(formValues['Validate From'], 'dd-MM-yyyy');
        }
        if (formValues['Validate To']) {
          this.filterSearch['Validate To'] = this.datePipe.transform(formValues['Validate To'], 'dd-MM-yyyy');
        }
      }
    });
    // this.filterSearch['keyword']= '';
    this.changeDetectRef.detectChanges();
    this.onPageChange({ limit: this.limit, offset: 0 });
    this.dropDownClose('dropdownContentFilter');
    this.DocumentList();
    this.DocumentListCount()
  }

  convertedDate(dateObject): string {
    const { day, month, year } = dateObject;
    return `${day}/${month}/${year}`;
  }

  removeFilter(remove) {
    this.isFilter = true;
    this.keyword = ''
    this.filterSearch[remove.key] = "";
    delete this.filterSearch[remove.key];
    this[remove.key] = "";
    this.certificateFilterForm.controls[remove.key]?.setValue('');
    this.offset = 0;
    // this.myDropdown.close();
    this.DocumentList();
    this.DocumentListCount()
  }

  /*Reset filters*/
  filterReset(): void {
    this.certificateFilterForm.reset();
    this.filterSearch = {};
    this.keyword = ''
    this.dropDownClose('dropdownContentFilter')
    this.DocumentList();
    this.DocumentListCount()
    this.isFilter = false;
    this.selectAll = false;
  }
  /*search name*/
  searchItems(): void {
    this.isSearched = true
    this.filterSearch['keyword'] = this.keyword ?? '';
    this.filterSearch = { ...this.filterSearch };
    this.changeDetectRef.detectChanges();
    this.onPageChange({ limit: this.limit, offset: 0 });
    this.dropDownClose('myDropdown');
    this.dropDownClose('dropdownContent');
    this.DocumentList();
    this.DocumentListCount()
  }
  // filterclose
  private dropDownClose(dropDownName): void {
    if (this.hasOwnProperty(dropDownName)) {
      this[dropDownName]?.close();
    }
  }
  /*search reset*/
  clearSearch(): void {
    this.keyword = '';
    this.filterSearch.keyword = '';
    this.onPageChange({ limit: this.limit, offset: 0 });
    this.dropDownClose('myDropdown');
    this.dropDownClose('dropdownContent');
    this.DocumentList();
    this.DocumentListCount()

    this.isSearched = false
  }


  // --------------------------------------------image ----------------------------------

  imageDetail() {
    this.myShopSandbox.imageDetail({}),
      this.subscriptions.push(this.myShopSandbox.imageDetail$.subscribe(val => {
        if (val) {
          this.uploadImage = [];
          val?.data?.vendorMedia.forEach(element => {
            if (element.mediaType == 1) {
              this.uploadImage.push(element);
            }
          });
          if (this.uploadImage.length > 0) {
            const imageLength = 10 - this.uploadImage?.length
            for (let i = 0; i < imageLength; i++) {
              const skeletonImageAdd: any = {
                skeletonImageName: 'add',
              }
              this.uploadImage.push(skeletonImageAdd)

              this.totalImageLength = this.uploadImage.filter(val => val.fileName)
            }
            this.isImageEnable = true;
          }




        }
      }))
  }


  uploadProductImages(i) {
    const modalRef = this.modal.open(ImagemanagerpopupComponent, {
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: "image-manager",
    });
    this.isImageEnable = true
    this.totalImageLength = this.uploadImage.filter(val => val.fileName)
    const data = this.uploadImage.filter(val => val.fileName)
    modalRef.componentInstance.imageLimit = data.length
    modalRef.result.then((result) => {
      if (result && result.length > 0) {
        result.forEach((element) => {
          if (element) {
            element.defaultImage = 0;
            if (element.hasOwnProperty('containerName')) {
              element.filePath = element.containerName;
              delete element['containerName']
            }
            if (element.hasOwnProperty('image')) {
              element.fileName = element.image;
              delete element['image']
            }
            let imageData: any = {}
            element.isEdit = 0;
            element.id = null
            imageData = element;
            this.uploadImage = this.uploadImage.filter(val => val.fileName)
            if (this.uploadImage?.length < 11) {
              this.uploadImage.push(imageData);
              const imageLength = 10 - this.uploadImage?.length
              for (let i = 0; i < imageLength; i++) {
                const skeletonImageAdd: any = {
                  skeletonImageName: 'add',
                }
                this.uploadImage.push(skeletonImageAdd)
                this.isImageEnable = false;
                this.totalImageLength = this.uploadImage.filter(val => val.fileName)
              }

            } else {
              this.toaster.error('Maximum 10 images allowed')
            }
          }
        });
      }
    });
  }

  imageremove(i, data) {
    this.uploadImage.splice(i, 1);
    const imageLength = 10 - this.uploadImage?.length
    for (let i = 0; i < imageLength; i++) {
      const skeletonImageAdd: any = {
        skeletonImageName: 'add',
      }
      this.uploadImage.push(skeletonImageAdd)
      this.isImageEnable = false;
      this.totalImageLength = this.uploadImage.filter(val => val.fileName)
    }

  }

  saveImage() {
    if (this.totalImageLength?.length == 0) {
      this.toaster.error("Atleast one image is mandatory.")
      return
    }
    //  this.imageDataSample=JSON.parse(JSON.stringify(this.uploadImage));
    const params: any = {};
    this.uploadImage?.forEach(element => {
      element.mediaType = 1
      element.vendorId = this.vendorId
    })

    params.id = this.sellerId;
    this.uploadImage = this.uploadImage.filter(val => val.fileName)
    params.vendorMedia = this.uploadImage;
    this.uploadImage = [...this.uploadImage]
    this.changeDetectRef.detectChanges();

    params.vendorMedia[0].defaultImage = 1;
    this.myShopSandbox.imageUpdate(params);
    this.subscriptions.push(this.myShopSandbox.imageUpdate$.subscribe(val => {
      if (val) {
        this.imageDetail();
      }
    }))

  }

  cancelImage() {
    this.uploadImage = [];
    this.imageDetail();
    this.router.navigate(['/my-account/myshop'], { queryParams: { currentTab: 1 } })
  }

  // ---------------------------------------video-------------------------------------------
  videoDetail() {
    this.myShopSandbox.videoDetail({}),
   this.subscriptions.push(this.myShopSandbox.videoDetail$.subscribe(val => {
        if (val) {
          let videoData = val?.data?.vendorMedia.filter(element => element.videoType == 2)
          if (videoData) {
            videoData?.forEach(element => {
              if (element.mediaType == 2) {
                element.status = element.isActive;
                element.thumbNail = this.getThumNailIMage(element.url)
                this.videoDataList = videoData
                if (this.videoDataList.length > 0) {
                  this.initialPlay(this.videoDataList[this.videoIndex ? this.videoIndex : 0])
                  this.isVideoEnable = true
                }

              }

            })

          }

        }
      }))

  }

  initialPlay(url) {
    if (url?.url !== "") {
      var dat = url?.url
      var urlsplit = dat?.split(/^.*(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^\/]*?\/)*)\??v?=?([^#\&\?]*).*/);
      this.FinalUrl = "https://www.youtube.com/embed/" + urlsplit[3];

      this.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(this.FinalUrl);
      this.videoName = url?.title

      this.editVideoValue = url
    }
  }






  openaddvideo() {
    const modelRef = this.modalService.open(AddVideoModalComponent, {
      size: 'xl', windowClass: 'assignattributesmodal mw-33', backdrop: 'static', backdropClass: 'createcr', centered: true,
    });
    modelRef.componentInstance.name="create"
    this.isVideoEnable = true
    modelRef?.result?.then(val => {
      if (val?.modelStatus === 'save') {
        if (![null, undefined, ''].includes(val)) {
          this.videoDataList.push(val);
          this.videoDataList = [...this.videoDataList];
          this.isVideoEnable = false
        }
      }
    })
  }

  opeEditvideo() {
    const modelRef = this.modalService.open(AddVideoModalComponent, {
      size: 'xl', windowClass: 'assignattributesmodal mw-33', backdrop: 'static', backdropClass: 'createcr', centered: true,
    });
    modelRef.componentInstance.name='edit'
    this.isVideoEnable = true
    // this.editVideoValue = { ...this.editVideoValue };
    const index = this.editVideoValue['index'];

    modelRef.componentInstance.editObj = structuredClone(this.editVideoValue);
    modelRef?.result?.then(val => {
      if (val?.modelStatus === 'edit') {
        if (![null, undefined, ''].includes(val)) {
          this.videoDataList[index] = val;

          this.videoDataList = [...this.videoDataList];
          this.editVideoValue = {};
          this.editVideoValue = { ...val, index: index }
          this.isVideoEnable = false
        }
      }
    })
  }

  getThumNailIMage(url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);


    if (match && match[2].length === 11) {
      return `https://img.youtube.com/vi/${match[2]}/0.jpg`;


    } else {
      const matches = url.match(/vimeo.com\/(\d+)/)
      if (matches == null) {
        return url
      } else {

        return `https://vumbnail.com/${matches[1]}.jpg `
      }

    }
  }



  embed(url, index) {
    this.videoIndex = index ? index : 0

    if (url.url !== "") {
      var dat = url.url
      var urlsplit = dat.split(/^.*(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^\/]*?\/)*)\??v?=?([^#\&\?]*).*/);
      this.FinalUrl = "https://www.youtube.com/embed/" + urlsplit[3];

      this.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(this.FinalUrl);
      this.videoName = url.title
      this.editVideoValue = {};
      this.editVideoValue = url,
        this.editVideoValue['index'] = index

    }
  }

  deleteVideo() {
    this.isVideoEnable = false
    this.videoDataList.splice(this.editVideoValue['index'], 1);
    this.urlSafe = ''
  }

  statusChange(status: any) {
    const params: any = {}
    this.videoDataList?.forEach(val => {
      val.mediaType = 2
      val.defaultVideo = 0
      val.videoType = 2
      params.id = this.sellerId;
      this.videoDataList[this.videoIndex].isActive = status == true ? 1 : 0
      params.vendorMedia = this.videoDataList;
      params.vendorMedia[0].defaultVideo = 1;
    })
    this.myShopSandbox.VideoStatusChange(params);
   this.subscriptions.push(this.myShopSandbox.VideoStatusChange$.subscribe(val => {
      if (val) {
        // this.videoDetail();
      }
    }))
  }

  saveVideo() {
    const params: any = {}


    if (this.videoDataList?.length > 0) {
      this.videoDataList?.forEach(val => {
        val.mediaType = 2
        val.defaultVideo = 0
        val.videoType = 2
      })
      params.id = this.sellerId;
      params.vendorMedia = this.videoDataList;
      params.vendorMedia[0].defaultVideo = 1;
      this.myShopSandbox.videoUpdate(params);
     this.subscriptions.push(this.myShopSandbox.videoUpdate$.subscribe(val => {
        if (val) {
          this.videoDetail();
        }
      }));
    } else {
      this.toaster.error("Atleast one video is mandatory.")
    }

  }

  cancelVideo() {
    this.videoDataList = [];
    this.videoDetail();
    this.router.navigate(['/my-account/myshop'], { queryParams: { currentTab: 1 } })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(val => val.unsubscribe())
  }
}
