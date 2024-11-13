import { DatashareService } from './../datashare.service';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../../../environments/environment';
import * as XLSX from 'xlsx';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Datas, categoryData } from '../import.constant';


type AOA = any[][];

@Component({
  selector: 'app-data-import',
  templateUrl: './data-import.component.html',
  styleUrls: ['./data-import.component.scss']
})
export class DataImportComponent implements OnInit {

  logotypeError: boolean;
  fileSize = environment.filesize;
  logoimageSizeError: boolean;
  selectedCar: any;
  rightSidevalue: any = [];
  validation: any = [];
  unmappedvalue: any
  filter: any = '';
  title = 'Data Import';

  initialvalue: any;
  headCopy: any;

  FirstTab: boolean = true;
  ErrorStatus: any = '';
  ErrorStatussss: any = '';


  optionDataArray: any;
  dummyArray: any = [];

  workbookName: any
  header: any;
  data: any;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: any;
  filterParams: {};

  vall: string;
  fileError: boolean = false;
  selectName: any;

  FileErrorStatue: any = ''

  constructor(private modalService: NgbModal,
    private toastr: ToastrService,
    private sharedService: DatashareService,
    private router: Router,
    private titleService: Title,
    private ChangeDetectors: ChangeDetectorRef
  ) { }

  ngOnInit(): void {



    this.titleService.setTitle(this.title);
    const storedValue = sessionStorage.getItem('myKey');
    if (storedValue) {
      const parsedValue = JSON.parse(storedValue);
      this.fileName = parsedValue.name;
      this.selectedaccess = parsedValue.moduleName;
    }


  }
  access = [
    { id: 1, name: 'Product' },
    { id: 2, name: 'Category' },
  ];
  selectedaccess: any;

  selectedFile: any;

  uploadchange(evt: any) {
    evt.target.files = null;
    this.fileName = '';

  }

  onFileChange(evt: any) {
    this.fileName = '';

    const files_value: DataTransfer = <DataTransfer>(evt.target);
    if (files_value.files.length > 1) {
      this.logotypeError = true;
      this.fileError = true;
      this.ErrorStatus = 'Validation.Cannot use multiple files'


      return
    }


    this.ErrorStatus = ''
    this.vall = evt.target.files[0];
    let workBook: any = null;
    let jsonData: any = null;


    const allowed_types = ["text/csv", ".xlsx", ".xls", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.oasis.opendocument.spreadsheet"];
    const size = Math.round(evt.target.files[0].size / 1024);
    if (!allowed_types.includes(evt.target.files[0]?.type)) {
      this.logotypeError = true;
      this.fileError = true;
      this.ErrorStatus = 'Validation.Only Excel File are allowed'
      // this.toastr.error("Only Excel File are allowed")
      return
    }
    if (!this.selectedaccess) {
      this.logotypeError = true;
      this.FileErrorStatue = 'Validation.Please Select Module Name'

      this.selectedaccess = '';
      this.ErrorStatussss = 'Validation.Please Select Module Name'

      // this.toastr.error("Please Select Module Name")
      return
    }
    if (size > this.fileSize) {
      this.logoimageSizeError = true;
      this.fileError = true;
      this.ErrorStatus = 'Validation.File should be less than 2MB'
      // this.toastr.error("File should be less than 2MB")
      return
    }

    this.selectedFile = evt.target.files[0] as File;

    const arrayWithAsterisk = this.optionDataArray?.filter((item: any) => item.name.includes('*')).map((option: any) => option.name);
    this.validation = arrayWithAsterisk;
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1)
      throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      const bstr = reader.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];


      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.initialvalue = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

      jsonData = wb.SheetNames.reduce((initial: any, name: any) => {

        const sheet = wb.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(this.initialvalue);
        return initial;
      }, {});
      if ([1, 0].includes(this.data.length)) {

        this.header = []
        this.headCopy = []
        this.data = []
        this.initialvalue = []
        this.FirstTab = false
        this.fileError = true;
        this.ErrorStatus = 'Validation.No Data Found'
        this.selectedFile = '';
        this.ChangeDetectors.detectChanges();
        // this.toastr.error('No Data Found');
      } else {
        this.FirstTab = true
        if (this.data.length == 2) {
          this.FirstTab = true
          this.header = this.data[0]
          this.headCopy = this.initialvalue[0]
          const createArrayOfObjects = (length: any) => {
            return Array.from({ length }, () => ({ value: null }));
          }
          const length = this.header.length;
          this.dummyArray = createArrayOfObjects(length);
          this.FirstTab = true
          const params: any = {};
          params.moduleName = this.selectedaccess;
          params.name = this.selectedFile.name;
          params.size = this.selectedFile.size;
          params.header = this.header;
          params.data = this.data;
          params.initialList = this.initialvalue
          params.headcopy = this.headCopy
          params.validations = this.validation;
          sessionStorage.setItem('myKey', JSON.stringify(params));
          localStorage.setItem('myKey', JSON.stringify(params));
          this.toastr.success('File Upload Sucessfully!');
        }
        else {

          //duplicate value finding
          const compareNestedArrays = (arr: any) => {
            const firstLevelArray = arr[0];

            for (let i = 1; i < arr.length; i++) {
              const currentRow = arr[i];

              if (currentRow.length !== firstLevelArray.length) {
                return false; // Rows have different lengths, cannot be identical
              }

              for (let j = 0; j < firstLevelArray.length; j++) {
                if (currentRow[j] !== firstLevelArray[j]) {
                  return false; // Values at the same index are different, rows are not identical
                }
              }
            }

            return true; // All rows are identical
          }


          const result = compareNestedArrays(this.data.slice(1)); // Exclude the first level array
          if (result == true) {

            this.header = []
            this.headCopy = []
            this.data = []
            this.initialvalue = []
            this.FirstTab = false
            this.ErrorStatus = 'Validation.Duplicate Value Found'
            this.selectedFile = '';
            this.ChangeDetectors.detectChanges();
            // this.toastr.error('Duplicate Value Found');
            this.fileError = true;

          } else {
            //header display
            this.header = this.data[0]
            this.headCopy = this.initialvalue[0]
            const createArrayOfObjects = (length: any) => {
              return Array.from({ length }, () => ({}));
            }
            const length = this.header.length;
            this.dummyArray = createArrayOfObjects(length);
            this.FirstTab = true;
            this.fileError = false;

            const params: any = {};
            params.moduleName = this.selectedaccess;
            params.name = this.selectedFile.name;
            params.size = this.selectedFile.size;
            params.header = this.header;
            params.data = this.data;
            params.initialList = this.initialvalue
            params.headcopy = this.headCopy
            params.validations = this.validation;
            sessionStorage.setItem('myKey', JSON.stringify(params));
            localStorage.setItem('myKey', JSON.stringify(params));
            this.toastr.success('File Upload Sucessfully!');
          }
        }

      }

    };
    reader.readAsBinaryString(target.files[0]);

  }

  uploadModel() {
    if (this.selectedaccess == "Product") {
      this.optionDataArray = Datas
      this.FileErrorStatue = ''
    }
    if (this.selectedaccess == "Category") {
      this.optionDataArray = categoryData
      this.FileErrorStatue = ''
    }
    sessionStorage.removeItem('myKey')
    this.selectedFile = '';
    this.fileName = '';
    this.ErrorStatus = '';

  }
  ImportPage() {



    if (!this.fileName && !this.selectedFile || !this.selectedaccess) {

      if (['', null, undefined].includes(this.selectedaccess)) {
        this.FileErrorStatue = 'Validation.Please Select Module Name'
      }
      this.ErrorStatussss = 'Validation.Please Select Module Name';
      this.ErrorStatus = 'Validation.Please Upload Excel File'

    }
    else {

      this.router.navigate(['/vendors/product-config/upload-file']);


    }

  }



}

