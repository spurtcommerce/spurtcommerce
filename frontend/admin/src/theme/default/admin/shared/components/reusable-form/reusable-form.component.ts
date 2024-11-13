import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reusable-form',
  templateUrl: './reusable-form.component.html',
  styleUrls: ['./reusable-form.component.scss']
})
export class ReusableFormComponent implements OnInit {

  public value:any;
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


  constructor() { 
    this.minDate = {
      year: new Date().getFullYear() - 100,
      month: 1,
      day: 1,
    };
  }

  ngOnInit() {

      this.errorMessage = Object.assign({},this.optionalErrorMessage);
      this.aliasName = ['',null,undefined].includes(this.aliasName)?this.label:this.aliasName;
      this.type = ['',null,undefined].includes(this.type)?'text':this.type;
      // console.log('control',this.control,this.type);
      
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
}

