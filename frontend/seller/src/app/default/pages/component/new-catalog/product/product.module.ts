import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedModule } from '../../../../../../../src/app/default/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { CategoriesComponent } from './add/categories/categories.component';
import { ProductDetailsComponent } from './add/product-details/product-details.component';
import { ProductSeoComponents, ProductSeoServices, specificationComponents, SpecificationService } from '../../../../../../../add-ons/add-ons.constant';
import { PricingSetupComponent } from './add/pricing-setup/pricing-setup.component';
import { AssignDiscountPriceComponent } from './add/modals/assign-discount-price/assign-discount-price.component';


import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UpdatebulkinfoComponent } from './add/modals/updatebulkinfo/updatebulkinfo.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RejectReasonComponent } from './add/modals/reject-reason/reject-reason.component';
import { ImagegallerymodalComponent } from './add/modals/imagegallerymodal/imagegallerymodal.component';





@NgModule({
  declarations: [
    ListComponent,
    CategoriesComponent,
    ProductDetailsComponent,
    ...specificationComponents,
    ...ProductSeoComponents,
    PricingSetupComponent,
    AssignDiscountPriceComponent,
    UpdatebulkinfoComponent,
    RejectReasonComponent,
    ImagegallerymodalComponent

  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SharedModule,
    FormsModule,
    NgbModule,
    MatInputModule,
    MatStepperModule,
    MatIconModule,
    DataTablesModule,
    CKEditorModule,
    NgSelectModule,
    TranslateModule,
  ],
  providers:[...SpecificationService ,...ProductSeoServices]

})
export class ProductModule { }
