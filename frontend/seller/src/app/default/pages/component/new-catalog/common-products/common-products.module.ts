import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonProductsRoutingModule } from './common-products-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { routes } from '../../dashboard/dashboard.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterial } from '../../../../../../../src/app/app.material.module';
import { commonProductComponents } from '../../../../../../../add-ons/add-ons.constant';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../../../../../src/app/default/shared/shared.module';


@NgModule({
  declarations: [...commonProductComponents],
  imports: [
    CommonModule,
    CommonProductsRoutingModule,
    CommonModule,
    TranslateModule,
    NgbModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppMaterial,
    NgSelectModule,
    SharedModule
  ]
})
export class CommonProductsModule { }
