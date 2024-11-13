import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { QuickViewComponent } from '../quick-view/quick-view.component';
// import { environment } from 'src/environments/environment.dev';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss'],
  providers: [DatePipe]
})
export class CommonTableComponent implements OnInit {
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
  customDateFormat = 'dd/MM/yyyy';
  currencysymbol = JSON.parse(localStorage.getItem('adminCurrency'));

  // Arrow functions
  trackByIndex = (index: number): number => index;

  // constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.isEnableCheckBox();
  }

  buttonChange(key: any, item: any, index: number) {
    
    item.key = key;
    if (item.key == 'quick view') {
      // this.viewModal(item)
    }
    
    item.currentIndex = index;
    this.buttonChangeEvent.emit(item);

  }

  checkBoxEvent(type?: any) {
    if (type === 'selectAll') {

      this.GridArray.forEach((element: any) => element.checked = this.selectAll?.isSelectAll);

    }
    let selectedDatasList: any = [...this.GridArray].filter((val: any) => val.checked);
    this.selectAll.isSelectAll = this.GridArray.every((val: any) => val.checked);
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

  // viewModal(data: any) {
  //   const modalRef = this.modalService.open(QuickViewComponent, {
  //     windowClass: 'fade show',
  //     backdrop: 'static'
  //   });
  //   modalRef.componentInstance.datas = data;
  // }

  dropDownEvent(val, head, eventType,index) {
    val.key = head.type;
    val.actionType = eventType.name;
    val.currentIndex = index;
    this.buttonChangeEvent.emit(val);
  }

  private isEnableCheckBox() {
    const isExist = this.HeadArray.findIndex(
      (val: any) => val.type === 'checkBox'
    );
    if (isExist >= 0) {
      this.GridArray.forEach((element: any) => {
        element.checked = element.checked ?? false;
      });
      this.checkBoxEvent();
    }
  }
}
