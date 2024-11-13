import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { familyData, removeEmptyKeys } from './list.constant';
import { DeleteConfirmationDialogComponent } from 'src/theme/default/admin/shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { DiscardChangesComponent } from 'src/theme/default/admin/shared/model-popup/discard-changes/discard-changes.component';
import { MatPaginator } from '@angular/material/paginator';
import { OrderfullfillmentSandbox } from 'src/core/admin/settings/order-fullfilment/order-fullfilment.sandbox';
import { OrderfullfillmentService } from 'src/core/admin/settings/order-fullfilment/order-fullfilment.service';


@Component({
  selector: 'app-fullfillment-maaping',
  templateUrl: './fullfillment-maaping.component.html',
  styleUrl: './fullfillment-maaping.component.scss',

})
export class FullfillmentMaapingComponent {
  @ViewChild("myInput") myInput: ElementRef;

  /*Pagination*/

  filterSearch: any = {};
  limit = 10;
  currentPage = 1;
  public pageSize;
  public offset: any = 0;
  public index: any = 0;
  private Count: boolean;
  public specificQueryParams: any = {};
  public id: any = ""
  public deleteId: boolean;
  queryData: any = {};
  count: any = 0;

  //filter
  keyword: any = '';

  //id
  checkedId: any = [];

  //specificationId
  specificationId: any = [];

  //subKeyWord
  subKeyWord: any = []

  //showassignCategories
  showassignCategories: any = false

  //unRemoveValue
  unRemoveValue: any = [];

  // private subscriptions: Array<Subscription> = [];
  private subscriptions: Array<Subscription> = [];


  // list api 
  listdata: any = []
  specification: any = [];
  assingedCategory: any;

  //const ref api
  familyMapData = familyData


  // Family List
  family_list: any = [];
  orderStatusList: any = [];
  familyfinalArr: any = [];
  checkId: any = []

  @ViewChild('pagination') paginator: MatPaginator;


  constructor(private modalService: NgbModal,
    private cd: ChangeDetectorRef,
    public route: ActivatedRoute,
    public Orderfullfillmentsandbox: OrderfullfillmentSandbox,
    public Orderfullfillmentservice: OrderfullfillmentService,
    public router: Router) { }

  ngOnInit(): void {

    //pagination
    this.index = 0;
    this.deleteId = true;
    this.pageSize = sessionStorage.getItem('itemsPerPage')
      ? sessionStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.Count = true;
    // this.FamilyList()
    this.orderfullfillmentlist();




  }

  /*Order fullFillment List*/

  orderfullfillmentlist() {
    let params: any = {};
    params.limit = 0;
    params.offset = 0;
    this.Orderfullfillmentsandbox.Orderfullfillmentlist(params);
   
    this.Orderfullfillmentsandbox.Orderfullfillmentlist$.subscribe((val) => {
      if (!['', null, undefined].includes(val)) {
        this.orderStatusList = val;
        this.FamilyList()


      }

    })
  }


  // family category list
  FamilyList(): void {
    let params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.isFullfillment = 1
    this.Orderfullfillmentsandbox.ManagefullfillmentList(params);
    this.Orderfullfillmentsandbox.ManagefullfillmentList$.subscribe((val) => {
      if (!['', null, undefined].includes(val)) {
        this.family_list = structuredClone(val);
        this.orderStatusList.forEach(orderStatus => {
          let data = structuredClone(this.family_list)
          if (this.family_list?.length > 0) {
            orderStatus.fullfillmentStatus.forEach(values => {
              let findInd = data.findIndex(elem => elem.id == values.id)
              if (findInd != -1) {
                data[findInd].isChecked = true
              }
            })

            orderStatus.fullfillmentStatusDropDown = data
          }

        });

      }
      this.cd.detectChanges()
    })

    this.family_list = [...this.family_list]
    this.cd.detectChanges()
  }





  // redirect to modal page
  // openproductspec(datas): void {
  //   const modalRef = this.modalService.open(ProductSpecificationModalComponent, {
  //     size: 'sm', windowClass: 'add-variant-roles', backdrop: 'static', backdropClass: 'createcr', centered: false, animation: false,
  //   });
  //   modalRef.componentInstance.edit = datas;
  //   modalRef.componentInstance.categoryId = '';
  //   modalRef.componentInstance.name = '';

  //   modalRef.result.then((result) => {
  //     if (result === 'success') {
  //       this.FamilyList();
  //     }
  //   });
  // }

  //checbox for specification
  ChangespecificationCheckboc(event: any, elem: any, datas: any, i): void {
    let checkData = [...this.family_list];
    let obj = {
      orderStatusId: '',
      orderStatusIds: '',
    }

    if (event.target.checked == true) {

      obj.orderStatusId = datas.orderStatusId
      obj.orderStatusIds = elem.id,
        this.familyfinalArr.push(obj)

    } else {

      let filteredData = checkData.findIndex(item => (item.id == elem.id));
      if (filteredData != -1) {
        checkData.splice(filteredData, 1);
      }
    }




  }

  //specification create method
  save(): void {
    let payload = [];
    this.orderStatusList.forEach(orderStatus => {
      let obj = {
        orderStatusId: orderStatus.orderStatusId,
        fullfillmentStatusIds: orderStatus.fullfillmentStatusDropDown.filter(val => val?.isChecked).map(val => val.id),
      }
      payload.push(obj);
    });

    // const orderStatuses = [];
    // this.familyfinalArr.forEach(({ orderStatusId, orderStatusIds }) => {
    //   const entry = orderStatuses.find(status => status.orderStatusId === orderStatusId);

    //   if (entry) {
    //     if (!entry.orderStatusIds?.includes(orderStatusIds)) {
    //       entry.orderStatusIds?.push(orderStatusIds);
    //     }
    //   } else {
    //     orderStatuses.push({ orderStatusId, fullfillmentStatusIds: [orderStatusIds] });
    //   }
    // });
    // console.log(orderStatuses,"ghdhgdfgdhgd");
    // console.log(this.familyfinalArr, "this.familyfinalArr")
    // const result = this.familyfinalArr.reduce((acc, curr) => {
    //   console.log(acc, curr, "hhhhh")
    //   if (!acc.orderStatusId) {
    //     acc.orderStatusId = curr.orderStatusId;
    //   }
    //   if (!acc.fullfillmentStatusIds) {
    //     acc.fullfillmentStatusIds = [];
    //   }
    //   acc.fullfillmentStatusIds.push(curr.orderStatusIds);
    //   return acc;
    // }, {});

    // console.log(result, "hjcbhdsbvhdbs")
    // this.familyfinalArr = []

    // payload.forEach((data,i)=>{

    //   if(data.orderStatusIds?.length == 0){
    //     payload.splice(i,1)
    //   }
      
    // })


  let filteredData =   payload.filter(val=>val.orderStatusIds?.length != 0);
    this.Orderfullfillmentservice.ManagefullfillmentFamily({orderStatuses: filteredData}).subscribe((val) => {
      if (val && val.status == 1) {
        this.orderfullfillmentlist();
        this.FamilyList();
        this.familyfinalArr = []
      }
    })

  }

  // show hide categories toggle
  filterData(): void {
    if (this.showassignCategories == true) {
      const filteredData = this.listdata.filter(item => item.specifications.length > 0);
      this.listdata = filteredData
    } else {
      this.listdata = this.unRemoveValue
    }
  }


  cancel(): void {
    const modelRef = this.modalService.open(DiscardChangesComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static',
      modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
    });
    modelRef.componentInstance.deleteMessage = 'Discard this changes'
    modelRef.result.then((result) => {
      if (result === "deleted") {
        this.FamilyList();
      }
    });


  }

  searchList(): void {
    if (this.keyword) {
      this.specificQueryParams.keyword = this.keyword;
      this.specificQueryParams.pageSize = this.pageSize;
      this.specificQueryParams.offset = 0;
      this.specificQueryParams.index = 1;
      this.index = 1;

      this.filterSearch.keyword = this.keyword;

      this.FamilyList();

    } else {

      this.FamilyList();

    }
  }

  focusInput() {
    this.myInput.nativeElement.focus();
  }

  keywordchange(event) {
    this.filterSearch.keyword = event;
  }

  removeFilter(removeFilter): void {
    this.filterSearch[removeFilter.key] = "";
    this[removeFilter.key] = "";

    this.offset = 0;
    this.FamilyList();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
