/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerSandbox } from '../../../../../../../../../core/admin/vendor/pages/seller/seller.sandbox';
import { SellerService } from '../../../../../../../../../core/admin/vendor/pages/seller/seller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../../../../../../../../core/admin/service/config.service';
import { DocumentSandbox } from '../../../../../../../../../core/admin/vendor/pages/documents/document.sandbox';
import { ViewVendorModalComponent } from '../view-vendor-modal/view-vendor-modal.component';
import { I } from '@angular/cdk/keycodes';
import { LayoutSandbox } from 'src/core/admin/layout/layout.sandbox';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-ngbd-viewvendor-basic',
  templateUrl: 'viewvendor.component.html',
  styleUrls: ['viewvendor.component.scss']
})
export class ViewVendorComponent implements OnInit {

  public id: any;
  public details: any = {};
  public ImageUrl: any = '';
  public queryDetails: any = {};
  isCount: boolean;
  public pageSize: any = 10;
  index: any = 0;
  offset: any = 0;
  public pageSizeOptions = [10, 20];
  title = 'Seller';
  currentPage: number = 1;
  limit: number = 10;
  currentPage2: number = 1;
  limit2: any = 10;
  offset2: any = 0;
  list : any = []

  constructor(public router: Router,
    private route: ActivatedRoute,
    public sellerSandbox: SellerSandbox,
    private modalService: NgbModal,
    private service: SellerService,
    private configService: ConfigService, public documentSandbox: DocumentSandbox,
    public commonSandbox: LayoutSandbox, public titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.ImageUrl = this.configService.getImageUrl();
    this.id = this.route.snapshot.params.id;
    this.pageDetails();
    this.pageSize = sessionStorage.getItem('itemsPerPage')
      ? sessionStorage.getItem('itemsPerPage')
      : this.pageSize;

    this.sellerSandbox.pageDetails$.subscribe(data => {
      if (data) {
        this.details = data;
      }
    });
    if (this.id) {
      this.getVendorDocumentList();
      // this.getDocumentListCount();
      // this.getproductList();
      // this.getproductListcount();
    }
  }

  pageDetails() {
    const params: any = {};
    params.id = this.id;
    this.sellerSandbox.pageDetails(params);
  }

  

  // gotoProduct(name: string) {
  //   this.router.navigate(['vendors/vendor/product'], { queryParams: { keyword: name } });
  // }

  getVendorDocumentList() {
    this.offset = (this.currentPage - 1) * this.limit;
    const params: any = {};
    params.vendorId = this.id;
    // params.limit = 0;
    // params.offset = 0;
    // params.keyword = '';
    // params.count = 0;
    this.documentSandbox.getDocumentList(params);
    this.documentSandbox.getDocumentList$.subscribe(val=>
      this.list = val
    )
  }

  getDocumentListCount() {
    const params: any = {};
    params.vendorId = this.id;
    // params.limit = 0;
    // params.offset = 0;
    // params.keyword = '';
    // params.count = 1;
    this.documentSandbox.getDocumentListCount(params);
  }

  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.getVendorDocumentList();
  }

  download(array) {
    const params:any = {}
    params.key = array.filePath + '/' + array.fileName;
    this.documentSandbox.downloadDocument(params);
  }

  changeStatus(event, val) {
    const params: any = {};
    params.documentStatus = event.target.checked === true ? 1 : 0;
    params.id = val.customerDocumentId;
    this.documentSandbox.getDocumentStatusChange(params);
  }

  openDocumentModal(detail) {
    const modalRef = this.modalService.open(ViewVendorModalComponent
      , { windowClass: 'add-local', keyboard: false, backdrop: 'static', animation: false, }
    );
    modalRef.componentInstance.details = detail;
    modalRef.result.then(data => {
      if (data.id) {
        this.documentSandbox.getDocumentStatusChange(data);
        this.documentSandbox.documentStatusChangeLoaded$.subscribe(data => {
          if (data) {
            this.getVendorDocumentList();
          }
        })
        this.getVendorDocumentList();
      }

    })
  }

  getproductList() {
    this.offset2 = (this.currentPage2 - 1) * this.limit;
    const params: any = {};
    params.vendorId = this.id;
    params.limit = this.pageSize;
    params.offset = this.offset2;
    params.keyword = '';
    params.count = 0;
    this.sellerSandbox.getproductList(params);
  }

  getproductListcount() {
    const params: any = {};
    params.vendorId = this.id;
    params.limit = this.pageSize;
    params.offset = this.offset2;
    params.keyword = '';
    params.count = 1;
    this.sellerSandbox.getproductListcount(params);
  }

  onPageChange2(event: { offset: number; limit: number }): void {
    this.limit2 = event.limit;
    this.currentPage2 = Math.floor(event.offset / event.limit) + 1;
    this.getproductList();
  }


  productlistpage() {
    this.router.navigate(['vendors/vendor/product'])
  }

  backToVendorList() {
    this.router.navigate(['seller/manage-seller/seller/seller'])
  }

  goToSocialMedia(link) {
    let url: string = '';
    if (!/^http[s]?:\/\//.test(link)) {
      url += 'http://';
    }

    url += link;
    window.open(url);
  }

}
