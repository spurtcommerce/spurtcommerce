import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ProductService } from "../../../../../../core/product/product.service";
import { ProductSandbox } from "../../../../../../core/product/product.sandbox";

@Component({
  selector: "app-categorymodal",
  templateUrl: "./categorymodal.component.html",
  styleUrls: ["./categorymodal.component.scss"],
})
export class CategorymodalComponent implements OnInit {
  userId;
  userModel;
  index: number = 1;
  public queryData: any = 2;
  productArray: any[];
  vall: number;

  constructor(
    public activeModal: NgbActiveModal,
    public router: Router,
    public route: ActivatedRoute,
    public productSandbox: ProductSandbox,
    public productService: ProductService
  ) {}

  ngOnInit(): void {
    this.userModel.forEach((datas) => {
      if (datas.vendorCategory) {
        let val = datas.vendorCategory;
        this.vall = val.length;
      }
    });

    this.getProductListModel();
  }

  getProductListModel() {
    const params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.keyword = 0;
    params.count = 0;
    this.productSandbox.CatalogEdit(params);
    this.productSandbox.CatalogEdit$.subscribe((data) => {});
  }
  goToEditcatalog() {
    this.productService.editCategoryPop("Edit");
    this.router.navigate(["/new-catalog/products/categories/", this.userId], {
      queryParams: { myParam: 2 },
     
    });
    this.close();
    this.getProductListModel();
  }

  close() {
    this.activeModal.close();
  }
}
