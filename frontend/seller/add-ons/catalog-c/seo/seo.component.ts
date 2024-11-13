import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../src/app/default/pages/component/new-catalog/product/add/data.service';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-seo',
  templateUrl: './seo.component.html',
  styleUrls: ['./seo.component.scss'],
})
export class SeoComponent implements OnInit {

  public editId: any;
  //form group
  seoform: UntypedFormGroup;
  //
  pageLoader: boolean = true
  name: any;
  refreshStatus: any;
  editDetails: any
  paramsValue: any = {};

  // video
  videoId: string = 'NOY6ILwN9K4'; // Replace with your video ID
  videoUrl: SafeResourceUrl;

  constructor(private fb: UntypedFormBuilder,
    public route: Router,
    public router: ActivatedRoute,
    private dataService: DataService,
    private titleService: Title,
    private sanitizer: DomSanitizer
  ) { this.titleService.setTitle("Products");
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}?autoplay=1&mute=1&loop=1`);
   }

  ngOnInit(): void {
    this.editId = this.router.snapshot.params.id;
    this.refreshStatus = this.dataService.getObjPageRefresh();


    if (this.refreshStatus == false) {
      if (!['', null, undefined].includes(this.editId)) {
        this.route.navigate(["/new-catalog/products/categories", this.editId], { queryParams: this.paramsValue });

      } else {

        this.route.navigate(['/new-catalog/products/categories'], { queryParams: this.paramsValue })
      }
    }

    let names = this.dataService.getpricingPrev();

    this.GetName()
  }

  GetName() {
    this.name = this.dataService.getProductName()
  }






  prev() {



    let names = ['', null, undefined].includes(this.name) ? '' : this.name

    if (!['', null, undefined].includes(this.editId)) {
      this.dataService.setpricinfPrev('specificationPrev')
      this.route.navigate(
        ["/new-catalog/products/specification", this.editId, names],
        { queryParams: this.paramsValue }
      );

    } else {
      this.dataService.setpricinfPrev('specificationPrev')
      this.route.navigate(["/new-catalog/products/specification"], { queryParams: this.paramsValue });
    }
  }

  cancel() {
    this.route.navigate(["/new-catalog/products/list"], { queryParams: this.paramsValue });
  }



  next() {

    if (!['', null, undefined].includes(this.editId)) {
      this.route.navigate(["/new-catalog/products/pricing-setup", this.editId], { queryParams: this.paramsValue });

    } else {
      this.route.navigate(['/new-catalog/products/pricing-setup'], { queryParams: this.paramsValue })
    }
  }

}
