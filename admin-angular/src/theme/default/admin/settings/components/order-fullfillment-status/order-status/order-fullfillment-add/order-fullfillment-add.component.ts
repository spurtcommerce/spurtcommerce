import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderfullfillmentSandbox } from 'src/core/admin/settings/order-fullfilment/order-fullfilment.sandbox';
import { OrderfullfillmentService } from 'src/core/admin/settings/order-fullfilment/order-fullfilment.service';

@Component({
  selector: 'app-order-fullfillment-add',
  templateUrl: './order-fullfillment-add.component.html',
  styleUrls: ['./order-fullfillment-add.component.scss']
})
export class OrderFullfillmentAddComponent implements OnInit {
  public stockStatusForm: FormGroup;
  public name: FormControl;
  public status: FormControl;
  public submitted = false;
  public color = '';
  public list = []
  public checkeddata:any=[];
  OrderStatusName: FormControl;
  colorCode: FormControl;
  priority: FormControl;
  checkboxdata: FormControl;
  public colorRequire: boolean;
  public orderStatusInfo: any = [];
  public orderStatusId:any;
  public updatetitle: number;

  constructor( 
    public model:NgbModal,
    public modalService: NgbActiveModal,
    private fb: FormBuilder,
    public Orderfullfillmentsandbox:OrderfullfillmentSandbox,
    public Orderfullfillmentservice:OrderfullfillmentService
        ) { 
   this.list=[{
    id: '1a',
    title: 'isAdmin',
    name:'Admin',
    checked: false,
  },
  {
    id: '2a',
    title: 'isVendor',
    name:'Vendor',
    checked: false,
  },
  {
    id: '3a',
    title: 'isBuyer',
    name:'Buyer',
    checked: false,
  },
  {
    id: '4a',
    title: 'isApi',
    name:'API',
    checked: false,
  },] 
  }

  ngOnInit(): void {
    this.colorRequire = false;
    this.loadForm();
    this.editOrderStatusList();
  }

  loadForm() {
    this.OrderStatusName = new FormControl('', [Validators.required]);
    this.colorCode = new FormControl('', [Validators.required]);
    this.priority = new FormControl('', [Validators.required]);
    this.status = new FormControl(null, Validators.required);
    this.stockStatusForm = this.fb.group({
      OrderStatusName: this.OrderStatusName,
      status: this.status,
      ColorCode:this.colorCode,
      priority:this.priority,
    });
  }

  add(){
    this.submitted = true;
    if (this.color === '' || this.color === null) {
      this.colorRequire = true;
      return;
    }
    if (this.stockStatusForm.invalid) {
      return;
    }
    if(this.checkeddata?.length<1){
      return
    } 
    let params:any={};
    params.name=this.stockStatusForm.value.OrderStatusName;
    params.colorCode=this.colorCode;
    params.priority=this.stockStatusForm.value.priority;
    params.status=this.stockStatusForm.value.status
    params.parentId='';
    let c=this.list?.forEach(item=>{
      if(item.title==='isAdmin'){
        params.isAdmin=(item.checked===true)?1:0;
      }
      if(item.title==='isVendor'){
        params.isVendor=(item.checked===true)?1:0
      }
      if(item.title==='isBuyer'){
        params.isBuyer=(item.checked===true)?1:0
      }
      if(item.title==='isApi'){
        params.isApi=(item.checked===true)?1:0
      }
    })
    if(this.orderStatusInfo[0] && this.orderStatusInfo[0].orderStatusId){
      params.orderStatusId=this.orderStatusId;
      params.parentId =this.orderStatusInfo[0].parentId;
      this.Orderfullfillmentsandbox.updateOrderfullfillment(params);
      this.Orderfullfillmentsandbox.updateOrderfullfillment$.subscribe(data=>{
        if(data && data.status===1){
          console.log('new data',data);
          this.modalService.close('close');
          this.orderfullfillmentlist();
        }
      })
    }else{
      this.Orderfullfillmentsandbox.addOrderfullfillment(params);
      this.Orderfullfillmentsandbox.addOrderfullfillment$.subscribe(data=>{
        if(data && data.status===1){
          console.log('new data',data);
          this.modalService.close('close');
          this.orderfullfillmentlist();
        }
      })
    }

  }

  close() {
    this.modalService.close('close');
  }
  
  onchange(a) {
    this.colorRequire = false;
    this.colorCode = a;
  }

  result() {
    console.log('list data');
    
    this.checkeddata= this.list.filter(item => item.checked);

  }

    // Validation Function
    get f() {
      return this.stockStatusForm.controls;
    }


    orderfullfillmentlist(){
      let params:any={};
      params.limit=0;
      params.offset=0;
      this.Orderfullfillmentsandbox.Orderfullfillmentlist(params);
    }
  

  editOrderStatusList() {
    this.orderStatusInfo.push(this.Orderfullfillmentservice.getStatusordersetdata());
    console.log('this.orderStatusInfo',this.orderStatusInfo)
    if (this.orderStatusInfo[0] !== null) {
      // this.updatetitle = 1;

      if (this.orderStatusInfo[0] && this.orderStatusInfo[0].name) {
        this.updatetitle = 1;
        this.stockStatusForm.controls['OrderStatusName'].setValue(
          this.orderStatusInfo[0].name
        );
        this.stockStatusForm.controls['priority'].setValue(
          this.orderStatusInfo[0].priority
        );
        this.stockStatusForm.controls['status'].setValue(
          this.orderStatusInfo[0].isActive==true?1:0
        );
        this.color = this.orderStatusInfo[0].colorCode;
        this.colorCode = this.orderStatusInfo[0].colorCode;
        this.orderStatusId=this.orderStatusInfo[0].orderStatusId
        let a=[];
        let c=this.orderStatusInfo.map(data=>{
          console.log('data',data);
          a.push({'name':'isAdmin','value':data.isAdmin});
          a.push({'name':'isApi','value':data.isApi});
          a.push({'name':'isBuyer','value':data.isBuyer});
          a.push({'name':'isVendor','value':data.isVendor})
        })
        console.log('a',a)
        this.list.forEach(Data=>{
          a.forEach(Datas=>{
            if(Data.title===Datas.name){
              console.log('inside')
              Data.checked=Datas.value===1?true:false;
            }
            if(Data.title===Datas.name){
              Data.checked=Datas.value===1?true:false;
            }
            if(Data.title===Datas.name){
              Data.checked=Datas.value===1?true:false;
            }
            if(Data.title===Datas.name){
              Data.checked=Datas.value===1?true:false;
            }
          })
        })
        this.result();
      }
    } else {
      this.orderStatusInfo = null;
    }
  }

}
