import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assign-discount-price',
  templateUrl: './assign-discount-price.component.html',
  styleUrls: ['./assign-discount-price.component.scss']
})
export class AssignDiscountPriceComponent implements OnInit {

  formgroup: any;
  ActionName:any;
  submit: boolean = false
  getdata: any;
  editValue: any;
  errorMessage: any=''
  MinDate: any =new Date();
  EndMinDate: any;

  constructor(private activeModal: NgbActiveModal, private modalService: NgbModal, private formBuilder: UntypedFormBuilder) { }

  formDiscountPrice() {
    this.formgroup = this.formBuilder.group({
      Priority: ['', Validators.required],
      Price: ['', Validators.required],
      DateStart: ['', Validators.required],
      DateEnd: ['', Validators.required]
      // Add more form controls as needed
    });

  }

  ngOnInit(): void {


    this.formDiscountPrice()

    if(this.ActionName=="SpecialPrice"){
      this.formgroup.controls['Priority'].setValue(this.editValue?.specialPriority)
      this.formgroup.controls['Price'].setValue(this.editValue?.specialPrice)
      this.formgroup.controls['DateStart'].setValue(this.editValue?.specialDateStart)
      this.formgroup.controls['DateEnd'].setValue(this.editValue?.specialDateEnd)
    }else{
      this.formgroup.controls['Priority'].setValue(this.editValue?.discountPriority)
      this.formgroup.controls['Price'].setValue(this.editValue?.discountPrice)
      this.formgroup.controls['DateStart'].setValue(this.editValue?.discountDateStart)
      this.formgroup.controls['DateEnd'].setValue(this.editValue?.discountDateEnd)
    }


    this.MinDate = new Date();
    this.EndMinDate = this.editValue?.discountDateStart


  }
  public dismiss() {
    this.activeModal.close();
  }

  save() {
    this.submit = true;


    if (this.formgroup.status == "VALID" && this.errorMessage == '') {

      this.activeModal.close({ type: 'success', formgroup: this.formgroup , ActionName:this.ActionName});
    }




  }

  onDateChange(event) {

    this.EndMinDate = event.value
  }

  pricechange(event: any) {
    if (+this.getdata.price <= +event.target.value) {

      this.errorMessage = 'Price should be less than Product cost'

    } else {
      this.errorMessage = ""

    }
  }

}
