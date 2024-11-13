import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../src/app/default/pages/component/new-catalog/product/add/data.service';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { ProductSeoComponents } from '../../../add-ons/add-ons.constant';
@Component({
  selector: 'app-specification-static',
  templateUrl: './specification-static.component.html',
  styleUrl: './specification-static.component.scss'
})
export class SpecificationStaticComponent {


editId:any;
refreshStatus:any;
name:any;
// video
videoId: string = 'bF-tLy_L3_s'; // Replace with your video ID
videoUrl: SafeResourceUrl;

constructor( public route: Router, public router: ActivatedRoute, private dataService: DataService, private sanitizer: DomSanitizer, private titleService: Title) {
  this.titleService.setTitle("Products");
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}`);
}

ngOnInit(): void {
  this.editId = this.router.snapshot.params.id;
  this.refreshStatus = this.dataService.getObjPageRefresh();
  if (this.refreshStatus==false) {
    if (!['', null, undefined].includes(this.editId)) {
      this.route.navigate(["/new-catalog/products/categories", this.editId],{ queryParams: [] });

    } else {

      this.route.navigate(['/new-catalog/products/categories'],{ queryParams: [] })
    }
  }




  this.name = this.router.snapshot.params.name;

}





resetServices() {
  this.dataService.setData([]);
  this.dataService.setDatacategoriesRightArray({});
  this.dataService.setDatacategoriesLeftArray({});
  this.dataService.setDataproductDetailsPagePrev({});
  this.dataService.setDataProductDetails({});
  this.dataService.setPricingDetails({});
  this.dataService.setDataProductSeo({});
}

cancel() {
  this.resetServices();
  this.route.navigate(["/new-catalog/products/list"],{ queryParams: [] });
}

prev() {
  if (!['', null, undefined].includes(this.editId)) {
    this.dataService.setDataproductDetailsPagePrev('productDetailprevbutton')
    this.route.navigate(["/new-catalog/products/product-details", this.editId],{ queryParams: [] });

  } else {
    this.dataService.setDataproductDetailsPagePrev('productDetailprevbutton')
    this.route.navigate(['/new-catalog/products/product-details'],{ queryParams: [] })
  }
}



next() {
  if (ProductSeoComponents.length > 0) {
    if (!['', null, undefined].includes(this.editId)) {
      this.route.navigate(["/new-catalog/products/seo", this.editId],{ queryParams: [] });

    } else {
      this.route.navigate(['/new-catalog/products/seo'],{ queryParams: [] })
    }
  } else {
    if (!['', null, undefined].includes(this.editId)) {
      this.route.navigate(["/new-catalog/products/pricing-setup", this.editId],{ queryParams: [] });

    } else {
      this.route.navigate(['/new-catalog/products/pricing-setup'],{ queryParams: [] })
    }
  }


}
}
