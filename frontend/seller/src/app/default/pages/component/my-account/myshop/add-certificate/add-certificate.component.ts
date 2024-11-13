import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MyShopSandbox } from '../../../../../../../../src/app/core/myShop/myShop.sandbox';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from "@angular/platform-browser";
import { environment } from '../../../../../../../../src/environments/environment';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-certificate',
  templateUrl: './add-certificate.component.html',
  styleUrls: ['./add-certificate.component.scss'],
  providers: [DatePipe]
})
export class AddCertificateComponent implements OnInit, OnDestroy {
  documentMessage: any = environment.documentMessage
  fromDate: Date = new Date();
  error: any;
  validtoDate = this.fromDate
  toDate: Date;
  category = [
    { id: 1, name: 'Product Safety Certificates' },
    { id: 2, name: 'Certificate of Origin' },
    { id: 3, name: 'Export License' },
    { id: 4, name: 'Insurance Certificates' },
    { id: 5, name: 'Compliance Certificates' }
  ];

  selectedcategory: any;

  public data: UntypedFormControl;
  public status: UntypedFormControl
  public certificateForm: UntypedFormGroup;
  submitted: Boolean = false;
  formattedDateFrom: string;
  formattedDateTo: string;
  uploadFileLocation: any = {};
  documentDownload: any = {};
  documentFileSize: Boolean = false;
  documentFileType: Boolean = false;
  _object = Object;
  editId: any
  DocumentData: any = [];
  vendorId: any
  doumentTypeValid: Boolean = false;
  private subscriptions: Array<Subscription> = [];
  minDate: any;
  dowloadLoad: boolean = false;
  constructor(public formBuilder: UntypedFormBuilder, private datePipe: DatePipe, private route: ActivatedRoute,
    public myShopSandbox: MyShopSandbox, private cd: ChangeDetectorRef, private toaster: ToastrService, private router: Router,
    private titleService: Title, private http: HttpClient
  ) {
    this.titleService.setTitle("My Shop");

  }

  ngOnInit(): void {
    this.error = Math.round(environment.documentSize / 1024)
    this.intializeForm();

    this.route.params.subscribe(val => {
      this.editId = val.id
    })
    if (this.editId) {
      this.DocumentsDetails();
    }
    this.dcumentType();
    this.myShopSandbox.basicDetailGet({});
    this.subscriptions.push(this.myShopSandbox.basicDetailGet$.subscribe(val => {
      if (val?.status == 1) {
        this.vendorId = val?.data?.vendorId;
      }
    }))
  }
  // this.pastDateValidator
  intializeForm() {
    this.certificateForm = this.formBuilder.group({
      certificateType: [null, Validators.compose([Validators.required])],
      referenceNumber: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)])],
      issuedBy: ['', Validators.compose([Validators.required])],
      fromDateValid: [null, [Validators.required]],
      validtoDate: [null, [Validators.required]],
      documentType: [null, Validators.compose([Validators.required])],
    });
  }

  DocumentsDetails() {
    this.myShopSandbox.certificateDetail(this.editId);
    this.subscriptions.push(this.myShopSandbox.certificateDetail$.subscribe(val => {
      if (val) {
        this.setValue(val?.data)
      }
    }));
  }

  setValue(data: any) {

    this.certificateForm.controls['certificateType'].setValue(data?.additionalInfo?.certificationType);
    this.certificateForm.controls['referenceNumber'].setValue(data?.additionalInfo?.refrenceNo)
    this.certificateForm.controls['name'].setValue(data?.additionalInfo?.name)
    this.certificateForm.controls['issuedBy'].setValue(data?.additionalInfo?.issuedBy)
    // const fromDate = (data?.additionalInfo?.validFrom)?.split('-');
    // const toDate = (data?.additionalInfo?.validTo)?.split('-');
    this.certificateForm.controls['fromDateValid'].setValue(data?.additionalInfo?.validFrom)
    this.certificateForm.controls['validtoDate'].setValue(data?.additionalInfo?.validTo)
    this.certificateForm.controls['documentType'].setValue(data?.documentId)
    this.uploadFileLocation['file'] = data?.fileName;
    this.documentDownload['fileName'] = data?.fileName;
    this.documentDownload['filePath'] = data?.filePath;
  }

  dcumentType() {
    const params: any = {}
    this.myShopSandbox.documentType({});
    this.subscriptions.push(this.myShopSandbox.documentType$.subscribe(val => {

      if (val?.data && val?.data?.length > 0) {
        let certificateData = val?.data?.find(element => element.name == "Certificate");
        this.DocumentData.push(certificateData)
        this.DocumentData = [...this.DocumentData];
        this.cd.detectChanges();
      }

    }));
  }

  save() {
    this.submitted = true;
    if (this.certificateForm.invalid || Object.keys(this.uploadFileLocation)?.length == 0) {

      return;
    }
    const params: any = {};
    params.certificationType = this.certificateForm.value.certificateType;
    params.refrenceNo = this.certificateForm.value.referenceNumber;
    params.name = this.certificateForm.value.name;
    params.issuedBy = this.certificateForm.value.issuedBy;
    params.validFrom = this.datePipe.transform(this.certificateForm.value.fromDateValid, 'yyyy-MM-dd');;
    params.validTo = this.datePipe.transform(this.certificateForm.value.validtoDate, 'yyyy-MM-dd');;

    const documetParams: any = {}
    documetParams.fileName = this.uploadFileLocation.file
    documetParams.filePath = this.uploadFileLocation.path
    documetParams.documentId = this.certificateForm.value.documentType
    documetParams.vendorId = this.vendorId
    documetParams.certificate = params


    if (this.editId) {

      documetParams.id = this.editId;
      this.myShopSandbox.certificateUpdate(documetParams)
      this.subscriptions.push(this.myShopSandbox.certificateUpdate$.subscribe(val => {
        if (val?.status == 1) {
          this.router.navigate(['/my-account/myshop'], { queryParams: { currentTab: 2 } })
        }
      }));
    } else {
      this.myShopSandbox.certificateCreate(documetParams);
      this.subscriptions.push(this.myShopSandbox.certificateCreate$.subscribe(val => {
        if (val?.status == 1) {
          this.router.navigate(['/my-account/myshop'], { queryParams: { currentTab: 2 } })
        }
      }))
    }


  }

  pastDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignore time part

    if (selectedDate < today) {
      return { 'pastDate': true };
    }
    return null;
  }

  getErrorMessage() {
    if (this.certificateForm.get('fromDateValid')?.hasError('required')) {
      return 'You must enter a date';
    }

    if (this.certificateForm.get('fromDateValid')?.hasError('pastDate')) {
      return 'Selected date cannot be in the past';
    }


    return '';
  }



  formatDateString(dateString: string): string {
    const [day, month, year] = dateString?.split('/')?.map(Number);
    const date = new Date(year, month - 1, day);
    return date.toString();
  }


  onFromDateChange(event: any) {
    this.minDate = event.value;
    if (this.toDate && this.toDate < this.minDate) {
      this.toDate = null;
    }
  }


  documentTypeChanges() {
    if (['', null, undefined].includes(this.certificateForm.value.documentType)) {
      this.doumentTypeValid = true;
    } else {
      this.doumentTypeValid = false;
    }
  }

  addDocumentFile(event) {
    if (['', null, undefined].includes(this.certificateForm.value.documentType)) {
      this.doumentTypeValid = true;
      return;
    } else {
      this.doumentTypeValid = false;
      this.convertBase64(event.target.files, event);
    }
  }
  // Base 64 conversion
  convertBase64(inputValue: any, event) {
    this.doumentTypeValid = false;
    if (inputValue && inputValue[0].type) {
      if (!this.isValidFile(inputValue[0].name)) {
        this.documentFileType = true;
        return false;
      }
      else if (Math.round(inputValue[0].size / 1024) > environment.documentSize) {
        this.documentFileSize = true;
        return
      }

      const file: File = inputValue[0];
      const myReader: FileReader = new FileReader();

      myReader.onloadend = e => {
        const params: any = {
          fileName: event.target.files[0].name,
          fileType: 1,
          path: 'myShop/documents/',
          image: myReader.result,
          documentId: this.certificateForm.value.documentType
        }
        this.myShopSandbox.DocumentUpload(params);
        this.uploadFileLocation = {}
       this.subscriptions.push(this.myShopSandbox.DocumentUpload$.subscribe(res => {
          if (res?.status == 1) {
            this.documentFileType = false
            this.documentFileSize = false
            this.uploadFileLocation = res.data;
            this.documentDownload['fileName'] = res.data.file;
            this.documentDownload['filePath'] = res.data.path;
          }
        }))
      };
      myReader.readAsDataURL(file);
    }
  }
  isValidFile(file) {
    return environment.documentType.test(file);
  }
  removeDocument() {
    this.uploadFileLocation = {}
  }
  // { queryParams:2 } }
  cancel() {
    this.router.navigate(['/my-account/myshop'], { queryParams: { currentTab: 2 } })
  }

  downloadDocument() {
    const fileUrl = `${this.documentDownload.filePath}${this.documentDownload.fileName}`;
    const downloadFile = `${environment.baseUrl}` + `/media/document?` + `&key=${fileUrl}`;
    this.dowloadLoad = true;
    this.http.get(downloadFile, { responseType: 'blob' }).subscribe((response: any) => {
      if (response) {
        saveAs(response, this.documentDownload.fileName);
        this.dowloadLoad = false;
      }

    })
  }


  ngOnDestroy(): void {
    this.editId = ''
    this.subscriptions.forEach(val => val.unsubscribe())
  }
}
