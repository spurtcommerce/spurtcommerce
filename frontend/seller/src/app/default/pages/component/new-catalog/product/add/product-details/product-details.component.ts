import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagemanagerpopupComponent } from '../../../../../../../../../src/app/default/shared/popup/ImageManagerPopup/imagemanagerpopup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../../../../../../src/environments/environment';
import { NewProductSandbox } from '../../../../../../../../../src/app/core/catalog/product/product.sandbox';
import { ToastrService } from 'ngx-toastr';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Adapter, { ConfigService } from '../../../../../../../../../src/app/core/services/config.service';
import { Title } from '@angular/platform-browser';
import { ProductSeoComponents } from '../../../../../../../../../add-ons/add-ons.constant';
import { NewProductService } from '../../../../../../../../../src/app/core/catalog/product/product.service';
import { Subscription } from 'rxjs';
import { ImagegallerymodalComponent } from '../modals/imagegallerymodal/imagegallerymodal.component';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  //forms
  public myForm: UntypedFormGroup;
  public submit: boolean = false

  public uploadImage: any = [];

  public editId: any;

  imageUrls: any
  dummyImage: any = [];
  primaryImgae: any = []
  //video
  videourl: any;
  videodetails: any;

  imageError: any;

  ProductSeo = ProductSeoComponents.length > 0;

  // edit details
  editDetails: any;

  // cke5 
  editor = ClassicEditor;

  refreshStatus: any;
  public config: any;
  minDate: Date;
  paramsValue: any = {};
  constructor(private formBuilder: UntypedFormBuilder, public productServices: NewProductService, private dataService: DataService, private titleService: Title, private ref: ChangeDetectorRef,
    private popup: NgbModal, private modalService: NgbModal, public route: Router, public router: ActivatedRoute, public productsandbox: NewProductSandbox, public toster: ToastrService, public configService: ConfigService) {
    this.titleService.setTitle("Products")
    this.config = this.configService.getEditorConfig();
  }

  ngOnInit(): void {
    this.editId = this.router.snapshot.params.id
    this.refreshStatus = this.dataService.getObjPageRefresh();


    if (this.refreshStatus == false) {
      if (!['', null, undefined].includes(this.editId)) {

        this.route.navigate(["/new-catalog/products/categories", this.editId], {
        });
      } else {
        this.route.navigate(['/new-catalog/products/categories'])
      }
    }

    this.formFields()

    this.imageUrls = environment.imageUrl;
    this.imagebinding();
    const isEmpty = obj => Object.entries(obj).length === 0;

    if (this.dataService.getrproductDetailsPagePrev() == 'productDetailprevbutton') {


      this.getDatasss();
      if (!['', null, undefined].includes(this.editId)) {
        this.productsandbox.ProductUpdateDetails(this.editId)
        this.subscriptions.add(this.productsandbox.ProductUpdateDetails$.subscribe((val) => {
          if (val?.status == 1 && val?.data) {
            this.editDetails = val?.data

          }
        }));
      }

    } else {

      if (this.dataService.getrproductDetailsPagePrev() == 'productDetailsname') {
        if (!['', null, undefined].includes(this.editId)) {

          let val = this.dataService.getDataProductDetails()

          if (isEmpty(val) == false) {
            this.getDatasss();
            this.subscriptions.add(this.productsandbox.ProductUpdateDetails$.subscribe((val) => {
              if (val?.status == 1 && val?.data) {
                this.editDetails = val?.data
              }
            }));
          } else {

            this.updateDetailsGetApi()
          }


        } else {

          this.minDate = new Date();
          this.getDatasss();

        }
      }
      else {
        if (isEmpty(this.dataService.getrproductDetailsPagePrev()) == true) {

          if (!['', null, undefined].includes(this.editId)) {
            this.updateDetailsGetApi()
          }
        }
      }


    }
    this.routeSubscribe();
  }
  /*query param value for pagination*/
  private routeSubscribe(): void {
    this.router.queryParams.subscribe(params => {
      this.paramsValue = params
    });
  }
  // cke5 image upload
  ulpoadAdapterDrop(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = ((loader: any, data: any) => {
      return new Adapter(loader, data);
    });
  }

  imagebinding() {
    let objectsArray = [];

    for (let i = 0; i < 9; i++) {
      objectsArray.push({});
    }
    this.uploadImage = objectsArray

  }

  decodeHtml(encodedHtml: string): string {
    const tempElement = document.createElement('textarea');
    tempElement.innerHTML = encodedHtml;
    const decodedString = tempElement.value;
    return decodedString.replace(/<\/?[^>]+(>|$)/g, "");
  }


  updateDetailsGetApi() {
    this.productsandbox.ProductUpdateDetails(this.editId)
    this.subscriptions.add(this.productsandbox.ProductUpdateDetails$.subscribe((val) => {
      if (val?.status == 1 && val?.data) {
        this.editDetails = val?.data;
        this.minDate = val?.data?.dateAvailable;
        this.ref.detectChanges()
        this.myForm.controls['productName'].setValue(val?.data?.name);
        this.myForm.controls['skuNumber'].setValue(val?.data?.sku);
        this.myForm.controls['inventory'].setValue(val?.data?.quantity);
        this.myForm.controls['fromDateValid'].setValue(val?.data?.dateAvailable)
        if (!['', null, undefined].includes(val?.data?.description)) {
          this.myForm.controls['productDescription'].setValue(this.htmlTagConversion(val?.data?.description));
        }
        if (!['', null, undefined].includes(val?.data?.productHighlights[0]?.data)) {
          const concatenatedData = val?.data?.productHighlights.map(highlight => highlight.data).join('');

          this.myForm.controls['productHighlights'].setValue(this.htmlTagConversion(concatenatedData));
          // this.myForm.controls['productHighlights'].setValue(this.htmlTagConversion(val?.data?.productHighlights[0]?.data));
        }
        if (!['', null, undefined].includes(val?.data?.productVideo?.path)) {
          let data = {
            name: val?.data?.productVideo.name,
            path: val?.data?.productVideo.path
          }
          this.productServices.videoView(data)
          this.productServices.videoView(data).subscribe((val) => {
            if (val) {
              const reader = new FileReader();
              reader.onload = (event: any) => {
                this.videourl = event.target.result;
              };
              reader.readAsDataURL(val);
            }
          })

        } else {
          this.videourl = ""
        }
        this.imagebinding()
        this.dummyImage = val?.data?.productImage

        let images = val?.data?.productImage

        let filterdata = images.filter((val) => val?.defaultImage != 1)
        let filterdatas = images.filter((val) => val?.defaultImage == 1)


        // this.primaryImgae[0]=filterdatas
        filterdatas.forEach(element => {

          if (element.status != "create") {
            this.primaryImgae[0] = element
          }

        });

        if (this.dummyImage) {
          filterdata.forEach((element, ind) => {
            if (element.status != "create") {
              this.uploadImage[ind] = element
            }
          });
        }
      }
    }))
  }

  getDatasss() {
    let val = this.dataService.getDataProductDetails()
    this.myForm.controls['productName'].setValue(val.productName);
    this.myForm.controls['skuNumber'].setValue(val.skuNumber);
    this.myForm.controls['inventory'].setValue(val.inventory);
    this.myForm.controls['fromDateValid'].setValue(val.fromDateValid);
    this.myForm.controls['productDescription'].setValue(val.productDescription);
    this.myForm.controls['productHighlights'].setValue(val.productHighlights);

    if (val?.image) {
      this.dummyImage = val.dummyImage;
      let images = val.dummyImage;
      let filterdata = images.filter((val) => val.defaultImage != 1);
      let filterdatas = images.filter((val) => val.defaultImage == 1);
      filterdatas.forEach(element => {
        this.primaryImgae[0] = element
      });
      if (this.dummyImage) {
        filterdata.forEach((element, ind) => {
          this.uploadImage[ind] = element
        });
      }
    }
    if (val?.video) {
      this.videourl = val?.video
    }



  }
  formFields() {
    this.myForm = this.formBuilder.group({
      productName: ['', [Validators.required]],
      skuNumber: ['', Validators.required],
      inventory: ['', [Validators.required,]],
      productDescription: ['', [Validators.required]],
      productHighlights: ['', [Validators.required]],
      fromDateValid: [null, [Validators.required]]
      // Add more form controls as needed
    });
    // this.getDatasss()
  }


  //imageremove

  imageremove(i, data) {


    // this.dummyImage.splice(i, 1);

    this.uploadImage[i] = {}

    this.dummyImage.forEach((element, ind) => {
      if (element.image == data.image) {
        this.dummyImage.splice(ind, 1)

      }
    });
  }

  uploadimageprimary() {
    const modalRef = this.popup.open(ImagemanagerpopupComponent, {
      backdrop: "static",
      keyboard: false,
      size: "lg",
      windowClass: "image-manager",
    });
    modalRef.componentInstance.imageLimit = 9
    modalRef.result.then((result) => {
      // this.uploadImage = [];
      if (result && result.length > 0) {
        const lengthOfUploadImage: number = this.uploadImage.length;

        result.forEach((data) => {
          if (data) {
            data.defaultImage = 1
            data.status = 'create'
            this.primaryImgae[0] = data;
            this.imageError = ''
            if (['', null, undefined].includes(this.editId)) {
              this.dummyImage.forEach((element, i) => {
                if (element.defaultImage == 1) {
                  this.dummyImage[i] = data
                }
              });
            } else {
              if (this.dummyImage.findIndex(item => item.defaultImage == 1) == -1) {
                this.dummyImage[0] = data
              } else {
                let defaultImage1Object = this.dummyImage.findIndex(item => item.defaultImage == 1);
                this.dummyImage[defaultImage1Object] = data
              }
            }
          }
        });
      }
      // this.ref.detectChanges();
    });
  }

  convertToBase64(file: File, formData) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      this.productsandbox.ProductVideoUpload(formData)
      this.subscriptions.add(this.productsandbox.ProductVideoUploadFailed$.subscribe((val) => {
        if (val) {
          this.videourl = ''
          this.toster.error('Not Able To Update as The File Size Is Too Large.')
        }
      }))
      this.subscriptions.add(this.productsandbox.ProductVideoUpload$.subscribe((val) => {

        if (val?.status == 1) {
          let data = {
            image: val.data.image,
            path: val.data.path
          }
          this.videodetails = data
          this.videourl = base64String
        }
      }))
    };
    reader.onerror = (error) => {
    };
  }

  clearFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = ''; // Clear the file input value
  }



  uploadVideo(event) {
    let type = event.target.files[0]?.type.split("/")[1]
    const size = Math.round(event.target.files[0].size / 1024);


    if (size > environment?.videoUpload) {
      this.toster.error('Please video image below 4MB');
      return;
    }

    const files: File = event.target.files[0];
    if (files && ['mp4', 'x-msvideo', 'avi'].includes(type)) {


      const params: any = {};

      params.file = event.target.files[0].name;
      params.path = "";

      const formData = new FormData();
      formData.append("file", event.target.files[0], event.target.files[0].name);

      this.convertToBase64(files, formData);

    } else {
      this.toster.error("Please upload valid video file");
    }


    // const file = event.target.files && event.target.files[0];
    // if (file) {
    //   var reader = new FileReader();
    //   reader.readAsDataURL(file);

    //   reader.onload = (event) => {
    //     this.videourl = (<FileReader>event.target).result;
    //   }
    // }
  }

  uploadProductImages(i) {

    const modalRef = this.popup.open(ImagemanagerpopupComponent, {
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: "image-manager",
    });
    modalRef.componentInstance.imageLimit = this.dummyImage.length
    modalRef.result.then((result) => {

      // this.uploadImage = [];
      if (result && result.length > 0) {
        const lengthOfUploadImage: number = this.uploadImage.length;

        result.forEach((data) => {
          data.status = 'create'
          if (data) {
            data.defaultImage = 0;
            this.dummyImage.push(data);
            let kk = this.dummyImage.filter((val) => val.defaultImage != 1)
            kk.forEach((element, ind) => {
              this.uploadImage[ind] = element
            });


            // this.uploadImage.push(data);
          }
        });

        // this.length = 0;

      }
      // this.ref.detectChanges();
    });
  }

  imageupload(event) {
    const imagetypes = ['png', 'jpeg', 'jpg', 'svg', 'svg+xml']

    let type = event.target.files[0].type.split("/")[1]

    if (imagetypes.includes(type)) {

    }


  }

  videoRemove() {
    this.videourl = null;
    this.videodetails = {}
  }

  setData(datas) {
    var data = datas;
    data.image = this.uploadImage;
    data.dummyImage = this.dummyImage;
    data.video = this.videourl
    data.videoDetails = this.videodetails;
    this.dataService.setDataProductDetails(data);

  }

  //prev

  prev() {

    if (!['', null, undefined].includes(this.editId)) {
      this.dataService.setDataproductDetailsPagePrev('productDetailsname')
      this.route.navigate(["/new-catalog/products/categories", this.editId], {
        queryParams: this.paramsValue
      });

    } else {
      this.dataService.setDataproductDetailsPagePrev('productDetailsname')
      this.route.navigate(['/new-catalog/products/categories'], { queryParams: this.paramsValue })
    }
  }

  onSubmit() {
    this.submit = true;
    // Handle form submission
    if (this.primaryImgae?.length == 0) {
      this.imageError = 'Please upload  image'
    }


    if (this.myForm.valid) {



      if (this.primaryImgae?.length > 0) {


        if (this.primaryImgae?.length > 0 && ['', null, undefined].includes(this.editId)) {

          this.dummyImage.push(this.primaryImgae[0])
        }

        this.setData(this.myForm.value)


        if (!['', null, undefined].includes(this.editId)) {

          this.route.navigate(["/new-catalog/products/specification", this.editId, this.editDetails?.name], { queryParams: this.paramsValue });
        }
        else {
          this.route.navigate(['/new-catalog/products/specification'], { queryParams: this.paramsValue })
        }
      }
      else {
        this.imageError = 'Please upload  image'
        // this.toster.error('Please upload  image ')
      }



      // this.route.navigate(['/new-catalog/products/specification'])

      // Form is valid, perform action
    }
  }
  resetServices() {
    this.dataService.setData([]);
    this.dataService.setDatacategoriesRightArray({});
    this.dataService.setDatacategoriesLeftArray({});
    this.dataService.setDataproductDetailsPagePrev({});
    this.dataService.setDataProductDetails({});
    this.dataService.setPricingDetails({});
    this.dataService.setDataProductSeo({});
  }

  cancel() {
    this.resetServices()
    this.route.navigate(['/new-catalog/products/list'], { queryParams: this.paramsValue })
  }

  // cke 5 htm tag conversion
  htmlTagConversion(data: string): string {
    let val = data
      .replace(/&amp;amp;/g, "&")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&sbquo;/g, "‚")
      .replace(/&#61;/g, "=")
      .replace(/&#45;/g, "-")
      .replace(/&hellip;/g, "…")
      .replace(/&commat;/g, "@")
      .replace(/&copy;/g, "©")
      .replace(/&#35;/g, "#")
      .replace(/&ldquo;/g, "“")
      .replace(/&rsquo;/g, "’")
      .replace(/&lsquo;/g, "‘")
      .replace(/&trade;/g, "™")
      .replace(/&reg;/g, "®")
      .replace(/&ndash;/g, "–")
      .replace(/&eacute;/g, "é")
      .replace(/&euro;/g, "€")
      .replace(/&pound;/g, "£")
      .replace(/&nbsp;/g, " ")
      .replace(/&hyphen;/g, "‐");

    // Remove unwanted characters without affecting HTML tags
    val = val.replace(/[\u200B-\u200D\uFEFF]/g, ""); // Invisible characters
    val = val.replace(/[\r\n]+/g, " ");  // Newlines converted to spaces
    val = val.trim();

    return val;  // Return value with preserved <p> and <br> tags
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  openexpandimage() {
    const modelRef = this.modalService.open(ImagegallerymodalComponent, {
      size: 'sm', windowClass: 'imageviewerModal', backdrop: 'static', backdropClass: 'createcr',
      modalDialogClass: 'modal-dialog-centered'
    });
  

    modelRef.componentInstance.imageGallery = this.uploadImage;
    modelRef.componentInstance.primaryImage = this.primaryImgae;
    modelRef.componentInstance.productName = this.myForm.value.productName;
    modelRef.componentInstance.video = this.videourl
  }

}