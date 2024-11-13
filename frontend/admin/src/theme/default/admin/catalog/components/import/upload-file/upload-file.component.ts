import { ImportService } from './../../../../../../../core/admin/catalog/import/import.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatashareService } from '../datashare.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { ImportSandbox } from '../../../../../../../core/admin/catalog/import/import.sandbox';
import { E } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import { Datas, categoryData } from '../import.constant';
import { ValidationModalComponent } from '../validation-modal/validation-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit, OnDestroy {
  private url: string = environment.baseUrl;


  private subscriptions: Array<Subscription> = [];
  Active: any = 1;

  receivedData: any;
  fileName: any;
  received: any = {};
  receivedValue: any;
  fileSize: any;

  data: any;
  header: any = [];

  optionData = Datas

  optionDataArray = this.optionData;

  rightSidevalue: any = [];

  unmappedvalue: any = 0;
  headCopy: any = [];
  dummyArray: any = [];
  validation: any;
  intialList: any;

  today = Date.now();
  fixedTimezone = this.today;
  File: any;
  JsonData: any;
  baseData: any = [];
  bufferData: any;
  failed: boolean = false;
  isSubmitted: boolean = false;
  headCopyss: boolean = false;
  valuess: any = "";
  dummyRightsideValue: any = [];
  selectedValues: any;
  indessss: any;
  mainIndex: any;
  zipFile: any;
  zipFileName: any;
  uploadSubmit: boolean;
  images: number;
  lisssss: any;
  imagestatus: any;
  step: number = 1;
  loader: boolean = false;
  ErrorStatus: any = '';
  SelectModule: any;
  missingDatas: any;
  upload: boolean = false;
  rightSidevalueCount: number = 0;

  constructor(public sandbox: ImportSandbox, public modalService: NgbModal, private sharedService: DatashareService, private ChangeDetectors: ChangeDetectorRef, private toastr: ToastrService, private router: Router, public service: ImportService, public http: HttpClient) {


  }

  computeSizeInMB(sizeKB: number): number {


    let a = sizeKB; // bytes
    let megabytes = a / (1024 * 1024);
    megabytes = Math.round(megabytes * 100) / 100;


    return megabytes;
  }

  //To get file in localstore
  ngOnInit(): void {

    const storedValue = sessionStorage.getItem('myKey');
    if (storedValue) {
      const parsedValue = JSON.parse(storedValue);
      this.SelectModule = parsedValue.moduleName
      this.fileName = parsedValue.name;
      this.fileSize = this.computeSizeInMB(parsedValue.size);
      this.intialList = parsedValue.initialList
      this.data = parsedValue.data;
      this.header = parsedValue.header;
      this.headCopy = parsedValue.headcopy
      this.headCopyss = parsedValue.headcopy
      this.validation = parsedValue.validations;
    }



    if (['', null, undefined].includes(this.fileName)) {
      this.router.navigate(['/vendors/product-config/data-import']);

    }

    if (this.SelectModule == "Product") {
      this.optionDataArray = Datas
    }
    if (this.SelectModule == "Category") {
      this.optionDataArray = categoryData
    }
    for (let i = 0; i <= this.header.length; i++) {
      this.rightSidevalue.push({ name: '', value: '', ind: '' })
    }

    this.optionDataArray.forEach((element: any) => {
      element.enable = this.selectedValues?.includes(element.name);
    });


  }




  goToStep(newStep: number): void {
    // Add any additional logic here if needed
    this.step = newStep;

  }

  getindex(event: any, index: any): void {

    let dataindex = index + 1;



    this.headCopy[index] = event?.name.replace('*', '')


    this.dummyArray = this.dummyRightsideValue[index]?.name
    this.indessss = this.data[1][index],
      this.mainIndex = index

    const indexes = this.rightSidevalue.findIndex((val: any) => val.ind == index);
    if (indexes == -1) {
      const obj = {
        name: this.dummyArray,
        value: this.data[1][index],
        ind: index
      }

      this.rightSidevalue[index] = obj
      // this.dummyRightsideValue= this.rightSidevalue


    } else {
      this.rightSidevalue[indexes].name = event?.name;
      this.rightSidevalue[indexes].value = this.data[1][index];
    }
   
    this.selectedValues = this.rightSidevalue.map((val: any) => val.name);
    this.optionDataArray.forEach((element: any) => {
      element.disabled = this.selectedValues?.includes(element.name);
    });

    this.ChangeDetectors.detectChanges()

    const nonEmptyNameObjects = this.rightSidevalue.filter(obj => obj.name.trim() !== '');
    this.rightSidevalueCount = nonEmptyNameObjects?.length;


    this.unmappedvalue = (this.header?.length - nonEmptyNameObjects?.length)

    // this.unmappedvalue = (this.rightSidevalue?.length - this.header?.length)

  }

  resetMapping() {
    this.rightSidevalueCount = 0
    this.rightSidevalue = [];
    this.dummyArray = [];
    this.headCopy = ''
    this.selectedValues = [];
    this.optionDataArray.forEach((element: any) => {
      element.disabled = this.selectedValues.includes(!element.name);
    });
    this.dummyRightsideValue = [...this.dummyArray];
  }


  autoMapping() {
    let arr3 = []
    let array: any = []
    for (let i = 0; i < this.header.length; i++) {
      array.push(this.optionDataArray[i].name)
    }

    this.headCopy = array
    this.headCopy = this.headCopy.map(function (element) {
      return element.replace('*', '');
    });
  

    // Mapping arr1 elements to arr3
    for (let i = 0; i < this.data[1].length; i++) {
      let obj = {
        name: array[i],
        value: this.data[1][i]
      };
      arr3.push(obj);
    }

    this.rightSidevalue = arr3
    
    this.optionDataArray.forEach((val: any) => {
      val.disabled = true
    })

    this.optionDataArray = this.optionDataArray


    this.dummyRightsideValue = array;


    const nonEmptyNameObjects = this.rightSidevalue.filter(obj => obj.name.trim() !== '');
    this.rightSidevalueCount = nonEmptyNameObjects?.length;
  }







  convertToObjects(header, rows) {
    const result = [];

    for (let i = 1; i < rows.length; i++) {
      const obj = {};
      for (let j = 0; j < header.length; j++) {
        obj[header[j]] = rows[i][j];
      }
      result.push(obj);
    }

    return result;
  }


  findMissingParams(arr1, arr2) {
    let missingParams: any = [];

    arr1.forEach((param1: any) => {
      let found = false;
      arr2.forEach(param2 => {
        if (param1 === param2.name) {
          found = true;
        }
      });
      if (!found) {
        missingParams.push(param1);
      }
    });

    return missingParams;
  }


  save(): void {

    this.data[0] = this.headCopy


    let missing = this.findMissingParams(this.validation, this.rightSidevalue)






    this.missingDatas = missing

    // const vall = this.validation.every(value => this.rightSidevalue.some(obj => obj.name === value));

    if (missing.length > 0) {
      const modelRef = this.modalService.open(ValidationModalComponent, {
        size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
      });
      modelRef.componentInstance.text = this.missingDatas


      // this.toastr.warning(`Please Select Required Params ${this.missingDatas.toString()}`)

    }
    else {
      const headerData = this.data[0];
      const rows = this.data.slice(0);
      const arrayOfObjects = this.convertToObjects(headerData, rows);


      this.JsonData = arrayOfObjects;
    
      this.convertJsonToExcel()
      this.step = 3;
    }

  }



  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.intialList);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    this.File = XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  convertJsonToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.JsonData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    // Convert workbook to Blob
    const excelBlob = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    const blob = new Blob([excelBlob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    //  const size = excelBlob.length;
    const temp: any = {
      type: 'Buffer'
    };
    temp.data = excelBlob.toString();
    this.bufferData = excelBlob.toString();
  }


  importDatas() {
    const params: any = {};
    params.buffer = this.bufferData;
    if (this.SelectModule == "Product") {
      this.sandbox.dataImports(params);

      this.sandbox.dataImportsLoaded.subscribe((val) => {

        if (val == true) {
          this.sandbox.dataImports$.subscribe((valll: any) => {
            if (valll?.message == "Bulk product data created successfully!") {
              this.failed = true;
              if (this.failed == true) {
                this.router.navigate(['/catalog/manage-products/product']);
              }

            }

            if (valll?.fileName) {

              this.isSubmitted = true;
              this.ChangeDetectors.detectChanges();
              this.valuess = valll.fileName
              window.open(this.url + '/import-datas/error-bulk-import?fileName=' + valll.fileName)
            }

          })
        }

      })


    }


    if (this.SelectModule == "Category") {
      this.sandbox.dataImportsCatagory(params);

      this.sandbox.dataImportsCatagory$.subscribe((valll: any) => {
        if (valll?.message == "Categories successfully created !!") {
          this.failed = true;
          this.ChangeDetectors.detectChanges();
          if (this.failed == true) {
            this.router.navigate(['/catalog/manage-products/categories']);
          }

        }

        if (valll?.fileName) {
          this.isSubmitted = true;

          this.valuess = valll.fileName
          window.open(this.url + '/import-datas/error-bulk-import?fileName=' + valll.fileName)
        }

      })
    }

  }

  onFileSelected(event: any): void {
    this.ErrorStatus = ''
    const file: File = event.target.files[0];
    this.zipFile = event.target.files[0];
    this.zipFileName = event.target.files[0]?.name;
    if (file && file.name.endsWith('.zip')) {
      this.readZipFile(file);
    } else {
      this.zipFile = '';
      this.zipFileName = '';
      this.ErrorStatus = 'Validation.Please select a valid ZIP file'
      // this.toastr.error('Please select a valid ZIP file.');

    }

  }


  uploadSuccess() {
    this.loader = false


    const isExist = this.rightSidevalue.findIndex(val => val.name == 'Image');

    // if ((this.SelectModule == "Category") || this.SelectModule == "Product") {

    //   this.uploadSubmit = true;

    //   if (!this.zipFile) {
    //     this.ErrorStatus = 'Validation.Pleace Upload Image Zip File'
    //     // this.toastr.error("Pleace Upload Image Zip File")
    //     return;

    //   }
    //   const ext = /^.+\.([^.]+)$/.exec(this.zipFile.name);
    //   if (!ext || (ext && ext[1] !== 'zip')) {
    //     this.ErrorStatus = 'Validation.Please Choose the Zip File'
    //     // this.toastr.error('Please Choose the Zip File');
    //     this.zipFile = undefined;
    //     this.zipFileName = '';
    //     return;
    //   }
    //   if (this.images > 0) {
    //     const params: any = {};
    //     params.file = this.zipFile;

    //     this.loader = true
    

    //     this.sandbox.dataImportsList(params);
    //     this.subscriptions.push(
    //     // this.sandbox.dataImportsListLoading


    //    this.sandbox.dataImportsList$.subscribe((val: any) => {

    //       // if(['',null,undefined].includes(val?.status)){

    //       //   this.loader=false
    //       // }
    //       if (val?.status == 1) {

 
    //         this.loader = false
    //         this.upload = true
    //         this.imagestatus = val
    //         this.step = 4;
    //         this.ChangeDetectors.detectChanges();


    //       }
 

    //     }));



    //   } else {
    //     this.zipFile = "", undefined;
    //     this.zipFileName = '';
    //     this.ErrorStatus = 'Validation.Pleace Select Image Zip File'
    //     // this.toastr.error("Pleace Select Image Zip File")
    //   }
    // }
    // else {
 
    //   this.step = 4;
    // }

    this.uploadSubmit = true;

    if (!this.zipFile) {
      this.ErrorStatus = 'Validation.Please Upload Image Zip File' 
      // this.toastr.error("Pleace Upload Image Zip File")
      return;

    }
    const ext = /^.+\.([^.]+)$/.exec(this.zipFile.name);
    if (!ext || (ext && ext[1] !== 'zip')) {
      this.ErrorStatus = 'Validation.Please Choose the Zip File'
      // this.toastr.error('Please Choose the Zip File');
      this.zipFile = undefined;
      this.zipFileName = '';
      return;
    }
    if (this.images > 0) {
      const params: any = {};
      params.file = this.zipFile;

      this.loader = true
   

      this.sandbox.dataImportsList(params);
      this.subscriptions.push(
        // this.sandbox.dataImportsListLoading


        this.sandbox.dataImportsListLoaded.subscribe((val: any) => {

          // if(['',null,undefined].includes(val?.status)){

          //   this.loader=false
          // }
          if (val == true) {

            
            this.loader = false
            this.upload = true
            this.imagestatus = val
            this.step = 4;
            this.ChangeDetectors.detectChanges();


          }
          

        }));



    } else {
      this.zipFile = "", undefined;
      this.zipFileName = '';
      this.ErrorStatus = 'Validation.Please Select Image Zip File'
      // this.toastr.error("Pleace Select Image Zip File")
    }


  }


  readZipFile(file: File): void {
    const zip = new JSZip();

    JSZip.loadAsync(file).then((zipFile) => {
      const imageFiles = [];

      // Iterate through each file in the zip archive
      zipFile.forEach((relativePath, zipEntry) => {
        if (zipEntry.dir) {
          // Skip directories
          return;
        }

        // Check if the file is an image based on its extension
        if (this.isImageFile(relativePath)) {
          imageFiles.push({ name: relativePath, content: zipEntry.async('uint8array') });
        }
      });

      // Perform validation or further processing with imageFiles array

      this.images = imageFiles.length
    });
  }

  isImageFile(fileName: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif']; // Add more if needed
    const lowerCaseFileName = fileName.toLowerCase();
    return imageExtensions.some((ext) => lowerCaseFileName.endsWith(ext));
  }


  ngOnDestroy() {
    this.rightSidevalue = [];
    this.dummyArray = [];
    this.selectedValues = [];
    this.optionDataArray.forEach((element: any) => {
      element.disabled = this.selectedValues?.includes(!element.name);
    });
    this.dummyRightsideValue = [...this.dummyArray];
  }
}
