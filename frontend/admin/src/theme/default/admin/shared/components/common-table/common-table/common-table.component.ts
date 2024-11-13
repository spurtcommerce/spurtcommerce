import { Component, Input, OnInit, Output,EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss'],
})
export class CommonTableComponent implements OnInit, OnChanges {
  ischeckData:any;
  @Input() selectAll = {
    isSelectAll: false
  };
  dynamicFieldDivShow = false;
  
  @Input() customTemplate?: any = {};
  @Input() HeadArray: any[] = [];
  @Input() GridArray: any[] = [];
  @Input() dynamicFieldShowHide = false;
  @Output() buttonChangeEvent = new EventEmitter<any>();
  @Output() selectedColumnValue = new EventEmitter<any>();
  customDateFormat = 'dd/MM/yyyy';
  customDateFormatWithTime = 'dd/MM/yyyy hh:mm a';
  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.isEnableCheckBox();
  }

  buttonChange(key: any, item: any) {
    item.key = key;
    if (item.key == 'quick view') {
    }
    this.buttonChangeEvent.emit(item);
  }

  checkBoxEvent(type?: any) {
    if (type === 'selectAll') {
      this.GridArray.forEach((element: any) => element.checked = this.selectAll?.isSelectAll);
    }
    let selectedDatasList: any = [...this.GridArray].filter((val: any) => val.checked);
    if(this.GridArray?.length) {
      this.selectAll.isSelectAll = this.GridArray.every((val: any) => val.checked);
    }
    const val = {
      key: 'checkBox',
      selectedDatas: [...selectedDatasList],
    };

    this.buttonChangeEvent.emit(val);
  }

  toggleEvent(item, event) {
    item.radioEvent = event;
    item.key = 'toggle';
    this.buttonChangeEvent.emit(item);
  }

  dropDownEvent(val, head, eventType) {
    val.key = head.type;
    val.actionType = eventType.name;
    this.buttonChangeEvent.emit(val);
  }

  private isEnableCheckBox() {
    const isExist = this.HeadArray.findIndex(
      (val: any) => val.type === 'checkBox'
    );
    if (isExist >= 0 && this.GridArray?.length > 0) {
      this.GridArray.forEach((element: any) => {
        element.checked = element.checked ?? false;
      });
      this.checkBoxEvent();
    }
  }

  
}
