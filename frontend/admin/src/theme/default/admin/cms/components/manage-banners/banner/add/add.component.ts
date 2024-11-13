// Angular Imports
import {
  Component,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  OnInit, OnDestroy
} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  Validators,
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormBuilder
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// Third Party Imports
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
// Sandbox Imports
import { BannerSandbox } from '../../../../../../../../core/admin/cms/banners/banner.sandbox';
// Service Imports
import { BannerService } from '../../../../../../../../core/admin/cms/banners/banner.service';
import { ConfigService } from '../../../../../../../../core/admin/service/config.service';
import Adapter, { CkeConfiqService } from 'src/core/admin/shared/ckeconfiq/ckeconfiq.service';
import { ImagemanagerpopupComponent } from 'src/theme/default/admin/shared/model-popup/ImageManagerPopup/imagemanagerpopup.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cms-banner-add',
  templateUrl: 'add.component.html',
  styleUrls: ['./add.component.scss'],
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

      .radio-buttons{
        display: flex;
        padding: 37px 19px;
        justify-content: center;
      }

      .mat-radio-button ~ .mat-radio-button {
  
      }
    `
  ]
})
export class BannerAddComponent implements OnInit, OnDestroy {
  // Form
  private closeResult: string;
  public bannerInfo: any;
  public serviceData: any;
  public ImageUrl: any = '';
  public bannerForm: UntypedFormGroup;
  public bannerTitle: UntypedFormControl;
  public bannerContent: UntypedFormControl;
  public bannerLink: UntypedFormControl;
  public position: UntypedFormControl;
  public active: UntypedFormControl;
  public type:UntypedFormControl;
  public submitted = false;
  public postImageUrl: any;
  public editBannerId: any;
  public id = '';
  public imageUrl: string;
  private subscriptions: Array<Subscription> = [];
  @ViewChild('filePath') filePath: ElementRef;
  public imageTypeError = false;
  public imageSizeError = false;

  public queryDetails: any = {};
  public config: any;
  public customproduct:any=1;
  new: any = {}
  image: any;
  productslugvalue: any;
  categoryslugvalue:any;
  public checkedval=1;
  public statusValue : any = false;
  public productList:any=[];
  public categoryBannerList:any=[]

  // cke5 
  editor = ClassicEditor;
  imageType: any;
  imageSize: number;
  imageTypeSupport: string;
  imageSizeSupport: string;
bulkImageStore:any[]=[]

  constructor(
    private modalService: NgbModal,
    private modalService2: NgbModal,
    private router: Router,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private changeDetectRef: ChangeDetectorRef,
    private configService: ConfigService,
    public sandbox: BannerSandbox,
    private service: BannerService,
    private ckeconfiqservice: CkeConfiqService,
    private toastr: ToastrService,
    private popup: NgbModal,
  ) {
    this.config = this.ckeconfiqservice.getEditorConfig();
    const pageOffset = this.route.snapshot.queryParamMap.get('offset');
    const index = this.route.snapshot.queryParamMap.get('index');

    this.queryDetails.offset = pageOffset || 0;
    this.queryDetails.index = index || 0;
  }

  ngOnInit(): void {
    // Get Image
    this.imageUrl = this.configService.getImageUrl();
    this.imageType = this.configService.getImageType();
    this.imageSize = this.configService.getFileSize();
    this.imageTypeSupport = this.configService.getimageTypeSupport();
    this.imageSizeSupport = this.configService.getimageSizeSupport();
    // Form
    this.initForm();
    // Get List
    this.categoryList();
    this.getProductList()
    this.editBannerId = this.route.snapshot.paramMap.get('id');
    // Detail
    if (this.editBannerId) {
      const params: any = {};
      params.bannerId = this.editBannerId;
      this.sandbox.getBannerDetails(params);
      this.editBannerData();
    }
    const pageOffset = this.route.snapshot.queryParamMap.get('offset');
    const index = this.route.snapshot.queryParamMap.get('index');

    this.queryDetails.offset = pageOffset || 0;
    this.queryDetails.index = index || 0;

    this.bannerForm.controls['type'].valueChanges.subscribe(
      (selectedValue) => {
        this.checkedval = selectedValue;
      })

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
    this.modalService2.open(content, {
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

  // Routing
  bannerCancel(): void {
    this.service.setBannerListData('');
    this.router.navigate(['/cms/manage-banners/banners/list'], { queryParams: this.queryDetails });
  }

  // Initial Form
  initForm(): void {
    const reg='(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.bannerForm = this.fb.group({
      bannerTitle: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(255),
        this.noWhitespaceValidator
      ])],
      bannerContent: [''],
      active: [0],
      bannerLink: [''],
      position: ['',Validators.required],
      type:[1],
      
    });
  }
  // imageInput: ['', Validators.required]
  /**
   * Handles form 'submit' event. Calls sandbox banner  function if form is valid.
   *
   * @param event form event
   * @param form entire form value
   */

  public onSubmit(): void {
    this.submitted = true;
    if (this.customproduct == 1) {
      const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
      this.bannerForm.get('bannerLink').setValidators([
        Validators.required,
        Validators.pattern(reg)
      ]);
      this.bannerForm.get('bannerLink').updateValueAndValidity();
    } else if (this.customproduct == 2 || this.customproduct == 3) {
      this.bannerForm.get('bannerLink').clearValidators();
      this.bannerForm.get('bannerLink').clearAsyncValidators();
      this.bannerForm.get('bannerLink').updateValueAndValidity();
    }
    if (!this.bannerForm.valid || this.bulkImageStore.length == 0) {
      this.validateAllFormFields(this.bannerForm);      
      return;
    } else {
      const params: any = {};
      params.title = this.bannerForm.value.bannerTitle || '';
      params.content = this.bannerForm.value.bannerContent || '';
      params.position = this.bannerForm.value.position || 0;
      params.image = this.ImageUrl;
      params.status = this.statusValue == true ? 1:0;
      this.bulkImageStore.forEach(obj => {
        // Rename imageName to image
        if (obj.imageName !== undefined) {
          obj.image = obj.imageName;
          delete obj.imageName;
        }
      
        // Rename imagePath to containerName
        if (obj.imagePath !== undefined) {
          obj.containerName = obj.imagePath;
          delete obj.imagePath;
        }
      });
      params.bannerImage = this.bulkImageStore
      if(this.checkedval==1){
        params.link =this.bannerForm.value.bannerLink || '';
        params.linkType = 1;
      }
      if(this.checkedval==2){
        if(!this.productslugvalue){
          return;
        }
        params.link = this.productslugvalue;
        params.linkType = 2;

      }
      if(this.checkedval==3){
        if(!this.categoryslugvalue){
         return;
        }
        params.link =this.categoryslugvalue;
        params.linkType = 3;

      }
      if (this.editBannerId) {
        params.bannerId = this.editBannerId;
        this.sandbox.UpdateBanner(params);
      } else {
        this.sandbox.addBanner(params);
      }
    }
    this.subscribe();
  }

  // Subscribe
  subscribe(): void {
    this.subscriptions.push(
      this.sandbox.getAddNewBanner$.subscribe(data => {
        if (data) {
          if (data?.status == 1) {
            this.router.navigate(['/cms/manage-banners/banners/list'], { queryParams: this.queryDetails });
          }
        }
      })
    );

    this.subscriptions.push(
      this.sandbox.getUpdatebanner$.subscribe(data => {
        if (data) {
          if (data?.status == 1) {
            this.router.navigate(['/cms/manage-banners/banners/list'], { queryParams: this.queryDetails });
          }
        }
      })
    );
  }

  editBannerData(): void {
    this.subscriptions.push(this.sandbox.getBannerDetails$.subscribe(data => {
      if (data && Object.keys(data).length) {
        this.new = data;
        this.setBanner(data);
      }
    }));
  }

  // Get List
  categoryList(): void {
    const params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.count = 0;
    params.keyword = '';
    params.sortOrder = 0;
    params.status = 1;
    this.service.categoryLists(params).subscribe(param=>{
      if(param!=undefined){
        this.categoryBannerList=param.data;
      }
    })
  }

  // Get List
  getProductList(): void {
    const params: any = {};
    params.offset = 0;
    params.limit = 0;
    params.keyword = '';
    params.sku = '';
    params.status = 1;
    params.price = 0;
    this.service.ProductLists(params).subscribe(param=>{
      if(param!=undefined){
        this.productList=param.data;
      }
    })
  }

  // Set Value
  setBanner(details): void {
    // if (details.image) {
    //   this.bannerForm.controls['imageInput'].setValue(details.image); 
    //   this.postImageUrl =
    //     this.imageUrl + '?path=' +
    //     `${details.imagePath}` + '&name=' +
    //     `${details.image}` +
    //     '&width=160&height=150';
    // }
    this.bulkImageStore = details.bannerImages
    this.bannerForm.controls['bannerTitle'].setValue(details.title);
    this.bannerForm.controls['bannerContent'].setValue(this.htmlTagConversion(details.content));
    this.bannerForm.controls['active'].setValue(details.isActive);
    this.statusValue = details.isActive == 1?true:false; 
    this.bannerForm.controls['position'].setValue(details.position);
    if(details.linkType==1){
      this.bannerForm.controls['bannerLink'].setValue(details.link);
      this.checkedval =1;
      this.customproduct=1;
    }
    if(details.linkType==2){
      this.productslugvalue=details.link;
      this.checkedval =2;
      this.customproduct=2;
    }
    if(details.linkType==3){
      this.categoryslugvalue=details.link;
      this.checkedval =3;
      this.customproduct=3;
    }
    if(details.linkType==''){
      this.checkedval =1;
      this.customproduct=1;
    }

    
  }

  // Upload Image
  uploadButtonClick() {
    const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
    el.click();
  }

  uploadChange($event): void {
    const modalRef = this.popup.open(ImagemanagerpopupComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    modalRef.result.then(
      result => {

        if (result) {
          if(this.bulkImageStore != undefined &&this.bulkImageStore.length > 0){

            this.bulkImageStore = [...this.bulkImageStore, ...result];
          }else{
            this.bulkImageStore = result;
          }
        }
        this.bulkImageStore.forEach((item, index) => {
          Object.assign(item, { isPrimary: index === 0 ? 1 : 0 });
        });
        this.changeDetectRef.detectChanges();
      },
      
    );
  }

  // Base64
  convertBase64(inputValue: any) {
    this.imageTypeError = false;
    this.imageSizeError = false;
    if (inputValue.files && inputValue.files[0]) {

      if (!this.imageType.exec(inputValue.files[0].name)) {
        this.imageTypeError = true;
        this.ImageUrl = '';
        this.filePath.nativeElement.value = '';
        this.bannerForm.controls['imageInput'].setValue('');
        // this.toastr.error(this.imageTypeSupport);
        return;
      }
      this.imageTypeError = false;
  
      const size = Math.round(inputValue.files[0].size / 1024);
      if (size > this.imageSize) {
        this.imageSizeError = true;
        this.ImageUrl = '';
        this.filePath.nativeElement.value = '';
        this.bannerForm.controls['imageInput'].setValue('');
        // this.toastr.error(this.imageSizeSupport);
        return;
      }
      this.imageSizeError = false;

      const file: File = inputValue.files[0];
      this.bannerForm.controls['imageInput'].setValue(file ? file.name : '');
      const myReader: FileReader = new FileReader();
      myReader.onloadend = e => {
        this.postImageUrl = myReader.result;
        this.ImageUrl = myReader.result;
        this.changeDetectRef.detectChanges();
      };
      myReader.readAsDataURL(file);
    }
  }

  imageremove(i, data) {
    this.bulkImageStore.splice(i, 1);
    this.bulkImageStore = [...this.bulkImageStore]
  }

  get f() {
    return this.bannerForm.controls;
  }

  validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  // Scroll
  scrollTo(el: Element): void {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  scrollToError(): void {
    const firstElementWithError = document.querySelector('.ng-invalid[formControlName]');

    this.scrollTo(firstElementWithError);
  }

  // Tag Conversion
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

    // cke5 image upload
    ulpoadAdapterDrop(editor: any) {
      editor.plugins.get('FileRepository').createUploadAdapter = ((loader: any, data: any) => {
        return new Adapter(loader, data);
      });
    }

  // Update Validity
  productevent(e){
    this.customproduct = e;
    if (e == 1) {
      const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
      this.bannerForm.get('bannerLink').setValidators(
      Validators.compose([Validators.required, Validators.pattern(reg)]));
      this.bannerForm.get('bannerLink').updateValueAndValidity();
    }
    else if (e == 2 || e == 3) {
      this.bannerForm.get('bannerLink').clearValidators();
      this.bannerForm.get('bannerLink').clearAsyncValidators();
    }
    this.bannerForm.get('bannerLink').updateValueAndValidity();
  }

  productslug(e): void{
    this.productslugvalue=e;
  }

  categoryslug(e): void{
    this.categoryslugvalue=e;
  }

  public noWhitespaceValidator(control: UntypedFormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  // Reset
  reset(): void{
    this.bannerLink=null;
    this.categoryslugvalue=null;
    this.productslugvalue=null;

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(each => each.unsubscribe());
  }

}
