import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatashareService } from '../datashare.service';
import * as XLSX from 'xlsx';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

type AOA = any[][];

@Component({
  selector: 'app-field-mapping',
  templateUrl: './field-mapping.component.html',
  styleUrls: ['./field-mapping.component.scss']
})
export class FieldMappingComponent implements OnInit {
  data: any;
  header: any = [];
  
  optionData: any = [
    { id: 1, name: 'SKU*' },
    { id: 2, name: 'UPC' },
    { id: 3, name: 'HSN' },
    { id: 4, name: 'Quantity*' },
    { id: 5, name: 'Price*' },
    { id: 6, name: 'TaxType' },
    { id: 7, name: 'Tax' },
    { id: 8, name: 'DateAvailable' },
    { id: 9, name: 'Name*' },
    { id: 10, name: 'Description' },
    { id: 11, name: 'StockStatusId' },
    { id: 12, name: 'ProductSlug' },
    { id: 13, name: 'Images*' },
    { id: 14, name: 'CategoryName*' },
    { id: 15, name: 'CategorySortOrder*' },
    { id: 16, name: 'RelatedProductId' },
    { id: 17, name: 'Height' },
    { id: 18, name: 'Weight' },
    { id: 19, name: 'Width' },
    { id: 20, name: 'Length' },
    { id: 21, name: 'PackageCost' },
    { id: 22, name: 'ShippingCost' },
    { id: 23, name: 'VendorId' },

  ]

  cars = this.optionData;

  rightSidevalue: any = [];

  unmappedvalue: any
  headCopy: any=[];
  dummyArray: any = [];
  validation: any;
  fileName: any ='';


  constructor( private toastr: ToastrService,private router: Router,) { }

  ngOnInit(): void {
    const storedValue = sessionStorage.getItem('myKey');
    if (storedValue) {
      const parsedValue = JSON.parse(storedValue); 
      this.fileName = parsedValue.name;
     this.data = parsedValue.data;
     this.header = parsedValue.header;
     this.validation = parsedValue.validations;
    } 
  }

  getindex(event: any, index: any): void {

    let dataindex = index + 1;
    // console.log(this.header, index, dataindex, this.data[1][index]);

    const dynamicKey = 'age';
    const dynamicValue = 30;


    this.headCopy[index] = event?.name

    

   
    const indexes = this.rightSidevalue.findIndex((val: any) => val.ind == index);
    if (indexes == -1) {
      const obj = {
        name: this.dummyArray[index]?.name,
        value: this.data[1][index],
        ind: index
      }
      this.rightSidevalue.push(obj)


    } else {
      this.rightSidevalue[indexes].name = event?.name;
      this.rightSidevalue[indexes].value = this.data[1][index];
    }

    const selectedValues = this.rightSidevalue.map((val: any) => val.name);
    this.cars.forEach((element: any) => {
      element.disabled = selectedValues.includes(element.name);
    });

    
    this.unmappedvalue = this.header?.length - this.rightSidevalue?.length

  }

  save(): void {

   const vall = this.validation.every(value => this.rightSidevalue.some(obj => obj.name === value));
   if (!vall) {
    this.toastr.error(`Please Select Required Params ${JSON.stringify(this.validation)}`)
   }
   else{
    this.router.navigate(['/vendors/product-config/review-data']);
   }
  }
  

}
