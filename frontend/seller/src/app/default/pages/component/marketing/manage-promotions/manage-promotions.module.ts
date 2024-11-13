import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CouponsComponents, CouponsRoutes } from '../../../../../../../add-ons/add-ons.constant';
import { SharedModule } from '../../../../../../../src/app/default/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
    {path:'' , redirectTo:'coupon',pathMatch:'full'},
    ...CouponsRoutes
];

@NgModule({
  declarations: [
    ...CouponsComponents
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule, 
    TranslateModule,
    RouterModule,
  ],
  
})
export class ManagePromotionsModule { }
