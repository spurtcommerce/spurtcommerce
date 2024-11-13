import { Component, OnInit,Input  } from '@angular/core';
import {UntypedFormControl} from '@angular/forms'
import {errMsg} from './common-error-message.constant';

@Component({
  selector: 'app-err-msg',
  templateUrl: './err-msg.component.html',
  styleUrls: ['./err-msg.component.css']
})
export class ErrMsgComponent implements OnInit {

  
  @Input() controls = new UntypedFormControl();
  @Input() submitted?:any = false;
  @Input() errorMessage?: Record<string, string> = errMsg;
  @Input() aliasName: any;
  errorMessagesData:any={};


  constructor() { }

  ngOnInit(): void {
    this.errorMessagesData = Object.assign({},errMsg,this.errorMessage);
  }

}
