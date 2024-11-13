import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {UntypedFormControl, FormGroup} from '@angular/forms'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { QuickViewComponent } from '../common-table/quick-view/quick-view.component';

@Component({
  selector: 'app-common-form',
  templateUrl: './common-form.component.html',
  styleUrls: ['./common-form.component.css']
})
export class CommonFormComponent implements OnInit{

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
  @Input() customVal?: any = {};
  @Input() optionalErrorMessage?: Record<string,string> | unknown = {};
  @Output() buttonChangeEvent = new EventEmitter<any>();
  @Output() checkboxEmit?:any = new EventEmitter<any>();
  // @Output() formValueEmit?:any = new EventEmitter<any>();
  // @Output() buttonChangeEvent?:any = new EventEmitter<any>();
  errorMessage: Record<string, string> = {};
  tooltips:any;
  showPassword:boolean;
  selectedValue:any=null;


  constructor() { 
  }

  ngOnInit() {
    
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
}
