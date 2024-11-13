import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MarketingComponent } from './layout/products.component';
import { AuthGuard } from '../../../../core/providers/guards/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalPopupComponent } from '../catalog/manage-product/modalpopup/modalpopup.component';
import { ProductEffect } from '../../../../core/product/product-effects/product.effects';
import { ProductSandbox } from '../../../../core/product/product.sandbox';
import { ProductService } from '../../../../core/product/product.service';
import { TranslateModule } from '@ngx-translate/core';


export const routes: Routes = [
  {
    path: '',
    component: MarketingComponent,
    children: [
      { path: '', redirectTo: 'manage-promotions', pathMatch: 'full' },
      {
        path: 'manage-promotions',
        loadChildren: () => import('./manage-promotions/manage-promotions.module').then(m => m.ManagePromotionsModule),
        canActivate: [AuthGuard],
        data: { root: 'sales', permissionForHeader: 'sales-orders' }
      }

    ]
  }
]; 

@NgModule({
    declarations: [
        MarketingComponent,
    ],
    imports: [
        CommonModule,
        EffectsModule.forFeature([ProductEffect]),
        RouterModule.forChild(routes),
        SharedModule,
        NgbModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forChild()
    ],
    providers: [
        ProductSandbox,
        ProductService
    ]
})
export class MarketingModule { }
 