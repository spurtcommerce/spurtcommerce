//angular common
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
// Third party 
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// Sandbox 
import { OrderfullfillmentSandbox } from 'src/core/admin/settings/order-fullfilment/order-fullfilment.sandbox';
import { OrderfullfillmentService } from 'src/core/admin/settings/order-fullfilment/order-fullfilment.service';

@Component({
  selector: 'app-order-fullfillment-add',
  templateUrl: './order-fullfillment-add.component.html',
  styleUrls: ['./order-fullfillment-add.component.scss']
})
export class OrderFullfillmentAddComponent implements OnInit {
// deconrators 
  @Input() id: any;

  // Form Controls
  public stockStatusForm: UntypedFormGroup;
  public name: UntypedFormControl;
  public status: UntypedFormControl;
  public OrderStatusName: UntypedFormControl;
  public colorCode: UntypedFormControl;
  priority: UntypedFormControl;
  checkboxdata: UntypedFormControl;
  // Validation 
  public submitted = false;
  public checkeddata: any = [];
  public colorRequire: boolean;
  // style 
  public color = '';
  // List 
  public list = []
//  Status 
  public orderStatusInfo: any = [];
  public orderStatusId: any;
  public updatetitle: number;
  public defaultStatus: number;

  constructor(
    public model: NgbModal,
    public modalService: NgbActiveModal,
    private fb: UntypedFormBuilder,
    public Orderfullfillmentsandbox: OrderfullfillmentSandbox,
    public Orderfullfillmentservice: OrderfullfillmentService
  ) {
    this.list = [{
      id: '1a',
      title: 'isAdmin',
      name: 'Admin',
      checked: false,
    },
    {
      id: '2a',
      title: 'isVendor',
      name: 'Vendor',
      checked: false,
    },
    {
      id: '3a',
      title: 'isBuyer',
      name: 'Buyer',
      checked: false,
    },
    {
      id: '4a',
      title: 'isApi',
      name: 'API',
      checked: false,
    },]
  }

  ngOnInit(): void {
    this.colorRequire = false;
    this.loadForm();
    this.editOrderStatusList();
  }


fullFuillmentStatus(){
  
}




  add():void {
    this.submitted = true;
    if (this.color === '' || this.color === null) {
      this.colorRequire = true;
      return;
    }
    if (this.stockStatusForm.invalid) {
      return;
    }
    if (this.checkeddata?.length < 1) {
      return
    }
    let params: any = {};
    params.isFullfillment=1
    params.name = this.stockStatusForm.value.OrderStatusName;
    params.colorCode = this.colorCode;
    params.priority = this.stockStatusForm.value.priority;
    params.status = this.stockStatusForm.value.status
    params.parentId = this.id;
    let c = this.list?.forEach(item => {
      if (item.title === 'isAdmin') {
        params.isAdmin = (item.checked === true) ? 1 : 0;
      }
      if (item.title === 'isVendor') {
        params.isVendor = (item.checked === true) ? 1 : 0
      }
      if (item.title === 'isBuyer') {
        params.isBuyer = (item.checked === true) ? 1 : 0
      }
      if (item.title === 'isApi') {
        params.isApi = (item.checked === true) ? 1 : 0
      }
    })
    if (this.orderStatusInfo[0] && this.orderStatusInfo[0].orderStatusId) {
      params.orderStatusId = this.orderStatusId;
      params.parentId = this.orderStatusInfo[0].parentId;
      this.Orderfullfillmentsandbox.updateOrderfullfillment(params);
      this.Orderfullfillmentsandbox.updateOrderfullfillment$.subscribe(data => {
        if (data && data.status === 1) {
          this.modalService.close('close');
          this.orderfullfillmentlist();
        }
      })
    } else {
      this.Orderfullfillmentsandbox.addOrderfullfillment(params);
      this.Orderfullfillmentsandbox.addOrderfullfillment$.subscribe(data => {
        if (data && data.status === 1) {
          this.modalService.close('close');
          this.orderfullfillmentlist();
        }
      })
    }

  }

  close():void {
    this.modalService.close('close');
  }

  onchange(a):void {
    this.colorRequire = false;
    this.colorCode = a;
  }

  result():void {

    this.checkeddata = this.list.filter(item => item.checked);

  }

  // Validation Function
  get f():any {
    return this.stockStatusForm.controls;
  }


 private orderfullfillmentlist():void {
    let params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.isFullfillment=1
    this.Orderfullfillmentsandbox.ManagefullfillmentList(params);
  }


 private editOrderStatusList():void {
    this.orderStatusInfo.push(this.Orderfullfillmentservice.getStatusordersetdata());
    if (this.orderStatusInfo[0] !== null) {
      // this.updatetitle = 1;
      this.defaultStatus=this.orderStatusInfo[0]?.defaultStatus
      if (this.orderStatusInfo[0] && this.orderStatusInfo[0].name) {
        this.updatetitle = 1;
        this.stockStatusForm.controls['OrderStatusName'].setValue(
          this.orderStatusInfo[0].name
        );
        this.stockStatusForm.controls['priority'].setValue(
          this.orderStatusInfo[0].priority
        );
        this.stockStatusForm.controls['status'].setValue(
          this.orderStatusInfo[0].isActive == true ? 1 : 0
        );
        this.color = this.orderStatusInfo[0].colorCode;
        this.colorCode = this.orderStatusInfo[0].colorCode;
        this.orderStatusId = this.orderStatusInfo[0].orderStatusId
        let a = [];
        let c = this.orderStatusInfo.map(data => {
          a.push({ 'name': 'isAdmin', 'value': data.isAdmin });
          a.push({ 'name': 'isApi', 'value': data.isApi });
          a.push({ 'name': 'isBuyer', 'value': data.isBuyer });
          a.push({ 'name': 'isVendor', 'value': data.isVendor })
        })
        this.list.forEach(Data => {
          a.forEach(Datas => {
            if (Data.title === Datas.name) {
              Data.checked = Datas.value === 1 ? true : false;
            }
            if (Data.title === Datas.name) {
              Data.checked = Datas.value === 1 ? true : false;
            }
            if (Data.title === Datas.name) {
              Data.checked = Datas.value === 1 ? true : false;
            }
            if (Data.title === Datas.name) {
              Data.checked = Datas.value === 1 ? true : false;
            }
          })
        })
        this.result();
      }
    } else {
      this.orderStatusInfo = null;
    }
  }

  private loadForm():void {
    this.OrderStatusName = new UntypedFormControl('', [Validators.required]);
    this.colorCode = new UntypedFormControl('', [Validators.required]);
    this.priority = new UntypedFormControl('', [Validators.required]);
    this.status = new UntypedFormControl(null, Validators.required);
    this.stockStatusForm = this.fb.group({
      OrderStatusName: this.OrderStatusName,
      status: this.status,
      colorCode: this.colorCode,
      priority: this.priority,
    });
  }

}
