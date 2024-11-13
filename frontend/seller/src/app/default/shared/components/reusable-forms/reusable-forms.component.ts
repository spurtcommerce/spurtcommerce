import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reusable-forms',
  templateUrl: './reusable-forms.component.html',
  styleUrls: ['./reusable-forms.component.scss']
})
export class ReusableFormsComponent implements OnInit {
  public value:any;
  @Input() maxDate:any;
  @Input() passwordShow :Boolean;
  @Input() ngSelectValue:any=null;
  @Input() placeholder:any = '';
  @Input() submitted = false;
  @Input() mandatory = false;
  @Input() isDisabled = false;
  @Input() toolTip = null;
  @Input() control = new UntypedFormControl();
  @Input() inputId = '';
  @Input() type? = 'text';
  @Input() customData?:any = {};
  @Input() label? = '';
  @Input() content: any = ''
  @Input() aliasName? :any= ''; 
  @Input() optionalErrorMessage?: Record<string,string> | unknown = {};
  @Output() buttonChangeEvent = new EventEmitter<any>();
  @Output() checkboxEmit?:any = new EventEmitter<any>();
  // @Output() formValueEmit?:any = new EventEmitter<any>();
  // @Output() buttonChangeEvent?:any = new EventEmitter<any>();
  errorMessage: Record<string, string> = {};
  tooltips:any;
  showPassword:boolean;
  selectedValue:any=null;
  minDate: NgbDateStruct;
  passwordFieldType: string = 'password';
  userNameValidation: Boolean = false;
  passwordValidation: Boolean = false;


  constructor() { 
    this.minDate = {
      year: new Date().getFullYear() - 100,
      month: 1,
      day: 1,
    };
  }

  ngOnInit() {
this.maxDate = ['',null,undefined].includes(this.maxDate)? new Date():this.maxDate;
      this.errorMessage = Object.assign({},this.optionalErrorMessage);
      this.aliasName = ['',null,undefined].includes(this.aliasName)?this.label:this.aliasName;
      this.type = ['',null,undefined].includes(this.type)?'text':this.type;
      
  }

  checkboxChange(type:any,val:any) {
    if(type=='selectAll') {
      val.data.forEach((element:any) => {
        element.checked = val.isSelectAll;
      });
    }
    val.isSelectAll = val.data.every((vals:any)=>vals.checked);
    val.checkedDatas = val.data.filter((val:any)=>val.checked);
    this.checkboxEmit.emit(val.data.filter((val:any)=>val.checked));
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleEvent(item,event) {
    item.radioEvent = event;
    item.key = 'toggle';
    this.buttonChangeEvent.emit(item);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    this.passwordFieldType = this.showPassword ? 'text' : 'password';
  }

  validationMeaage() {
    this.userNameValidation = false;
    this.passwordValidation = false;
  }
}
