import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { errMsg } from './errorMessage-constant';

@Component({
  selector: 'app-reusable-error-message',
  templateUrl: './reusable-error-message.component.html',
  styleUrls: ['./reusable-error-message.component.scss']
})
export class ReusableErrorMessageComponent implements OnInit {

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