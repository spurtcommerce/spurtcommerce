// Angular Import 

import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
// Third party
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
// Sandbox and Services
import { NewProductSandbox } from '../../../../../../../../../src/app/core/catalog/product/product.sandbox';
import { DataService } from '../data.service';
// Constant
import { ProductSeoComponents } from '../../../../../../../../../add-ons/add-ons.constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RejectReasonComponent } from '../modals/reject-reason/reject-reason.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @ViewChild('inputField') inputField!: ElementRef;

  @ViewChild('inputField2') inputField2: ElementRef; // Access the input field
  //view child

  //categoriesList
  public categoriesList: any = []

  public rightarrayList: any = []

  //search
  public keyword: any = ""
  public rightKeyword: any = ""
  //ids
  public catergoriesId: any = [];

  public editId: any;

  //updates List
  paramsValue:any = {};
  ProductSeo = ProductSeoComponents.length > 0;

  public updateList: any = [];
  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  constructor(private modalService: NgbModal,public productsandbox: NewProductSandbox, public toster: ToastrService, public route: Router, public router: ActivatedRoute, private dataService: DataService, public ref: ChangeDetectorRef, private titleService: Title) {
    this.titleService.setTitle("Products");
  }
  // data from services
  getDatasss() {
    this.catergoriesId = this.dataService.getData();
    this.rightarrayList = this.dataService.getDatacategoriesRightArray();
    const uniqueData = this.dataService.getDatacategoriesRightArray().filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.categoryId === item.categoryId
      ))
    );
    this.rightarrayList = uniqueData

    this.updateList = this.dataService.getDataccategoriesLeftArray()

  }
  ngOnInit(): void {


    if (ProductSeoComponents.length > 0) {
      this.ProductSeo == true;
    }

    this.editId = this.router.snapshot.params.id

    this.ref.detectChanges();

    if (['', null, undefined].includes(this.dataService.getrproductDetailsPagePrev())) {
      //CategoriesApiList
      this.CategoriesApiList();
      this.resetServices();
   
      this.ref.detectChanges();
    }else{
      // this.updatedetailsApi();
    }

    if (this.dataService.getrproductDetailsPagePrev() == 'productDetailsname') {
      this.getDatasss()
      this.categoriesList = this.updateList
      this.ref.detectChanges()

    } else {

      if (![null, '', undefined].includes(this.editId)) {
        this.resetServices();
        this.updatedetailsApi();
        this.ref.detectChanges();
      }
    }

this.routeSubscribe();
  }

  
    /*query param value for pagination*/
    private routeSubscribe(): void {
      this.router.queryParams.subscribe(params => {
        this.paramsValue = params
      });
    }
  // update details Api

  updatedetailsApi() {

    this.productsandbox.ProductUpdateDetails(this.editId)

    this.productsandbox.ProductUpdateDetails$.subscribe((val) => {
      if (val?.status == 1) {
        this.dataService.setProductName(val?.data.name)
        // this.productsandbox.CategoriesList({})
        this.subscriptions.add(this.productsandbox.CategoriesList$.subscribe((valss: any) => {
          if (valss?.status == 1) {
            this.ref.detectChanges()

            valss?.data.forEach(element => {
              element.newlevels = element?.levels.split('>')
            });
            let fff = val.data.Category.filter(obj1 => valss?.data.some(obj2 => obj2?.categoryId == obj1?.categoryId));
            this.ref.detectChanges()
            fff.forEach(element => {
              element.newlevels = element.levels.split('>')
              this.addCategories(element)
            });
            // this.categoriesList = val?.data;
            this.ref.detectChanges()
          }
        }));
      }
    })
  }

  @HostListener('window:keydown', ['$event'])

  onKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey && event.code === 'Slash') {
      this.focusOnInput();
    }
    if (!event.ctrlKey && event.code === 'Slash') {
      this.focusOnInput2();
    }

  }

  // Focus on the input field
  focusOnInput() {
    if (this.inputField) {
      this.inputField.nativeElement.focus();
    }
  }

  focusOnInput2() {
    if (this.inputField2) {
      this.inputField2.nativeElement.focus();
    }
  }




  //categoriesList api 
  CategoriesApiList() {
    this.productsandbox.CategoriesList({});
    this.subscriptions.add(this.productsandbox.CategoriesList$.subscribe((val: any) => {
      if (val?.status == 1) {

        this.ref.detectChanges();

        val.data.forEach(element => {
          element.newlevels = element.levels.split('>');
        });

        this.categoriesList = val?.data;

        this.ref.detectChanges();
      }
    }));
  }

  //add Categories
  addCategories(items) {
    const uniqueIds = {};
    this.categoriesList = this.categoriesList.filter(function (item) {
      return item.categoryId != items.categoryId
    })
    // Filter the array to remove duplicates
    this.ref.detectChanges()
    this.rightarrayList.unshift({ ...items })

    const uniqueArr = this.rightarrayList.filter(obj => {
      if (!uniqueIds[obj.categoryId]) {
        uniqueIds[obj.categoryId] = true;
        return true;
      }
      return false;
    });
    this.rightarrayList = uniqueArr





  }
  //removeCategories

  removeCategories(items) {
    this.categoriesList.push(items)
    this.rightarrayList = this.rightarrayList.filter(function (item) {
      return item.categoryId !== items.categoryId
    })

  }

  //setData  to services
  setData(ids) {
    const data = ids;
    data.items = this.rightarrayList
    this.dataService.setData(data);
  }

  // next
  Next() {
    let arr: any = [];
    this.rightarrayList.forEach((val) => {

      arr.push(val?.categoryId);
    })



    this.dataService.setDatacategoriesRightArray(this.rightarrayList);
    this.dataService.setDatacategoriesLeftArray(this.categoriesList);


    this.setData(arr);


    if (arr.length > 0) {
      if (!['', null, undefined].includes(this.editId)) {
        this.dataService.setObjPageRefresh();
        this.route.navigate(["/new-catalog/products/product-details/", this.editId], {
          queryParams: this.paramsValue});

      } else {
        this.dataService.setObjPageRefresh();
        this.route.navigate(['/new-catalog/products/product-details'],{
          queryParams: this.paramsValue})
      }
    } else {
      this.toster.error('Please choose the Categories')
    }

  }

  //resetServices the services
  resetServices() {
    this.dataService.setData([]);
    this.dataService.setDatacategoriesRightArray({});
    this.dataService.setDatacategoriesLeftArray({});
    this.dataService.setDataproductDetailsPagePrev({});
    this.dataService.setDataProductDetails({});
    this.dataService.setDataProductSeo({});
    this.dataService.setPricingDetails({});
  }

  //cancel
  cancel() {
    this.resetServices()
    this.route.navigate(['/new-catalog/products/list'],{ queryParams: this.paramsValue })
  }

  openrejectedreasonmodal(data:any) {
    const modelRef = this.modalService.open(RejectReasonComponent, {
      size: 'xl', windowClass: 'assignattributesmodal-categories', backdrop: 'static', backdropClass: 'createcr', centered: true,
    });

    modelRef.componentInstance.rejectReason = data.rejectReason;
    modelRef.componentInstance.productImage = data.productImage;
    modelRef.componentInstance.productName = data.name
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
