import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatedProductsRoutingModule } from './related-products-routing.module';
import { CatalogModule } from '../../catalog/catalog.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../../../../../src/app/default/shared/shared.module';
import { relatedProductsComponent } from '../../../../../../../add-ons/add-ons.constant';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ...relatedProductsComponent,

  ],
  imports: [
    CommonModule,
    RelatedProductsRoutingModule,
    CatalogModule,
    NgbModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    TranslateModule,
    RouterModule,

  ]
})
export class RelatedProductsModule { }
