

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

import { ProductsComponent } from './layout/products.component';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffect } from '../../../../core/product/product-effects/product.effects';
import { ProductService } from '../../../../core/product/product.service';
import { ProductSandbox } from '../../../../core/product/product.sandbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfigService } from '../../../../core/services/config.service';
import { ModalPopupComponent } from './manage-product/modalpopup/modalpopup.component';
import { AuthGuard } from '../../../../../app/core/providers/guards/auth-guard';
import { TranslateModule } from '@ngx-translate/core';
import { CategorymodalComponent } from './manage-product/categorymodal/categorymodal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


export const routes = [
    // { path: '', redirectTo: 'manage-products', pathMatch: 'full' },
    {
      path: 'manage-products',
      loadChildren: () => import('./manage-product/manage-product.module').then(m => m.ManageProductModule),
      canActivate: [AuthGuard],
      data: {root: 'sales', permissionForHeader: 'sales-orders'}
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
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
        EffectsModule.forFeature([ProductEffect]),
        DataTablesModule,
        NgSelectModule,
        TranslateModule
    ],
    declarations: [
        ProductsComponent,
        ModalPopupComponent,
        CategorymodalComponent
    ],
    providers: [
        ProductEffect,
        ProductService,
        ProductSandbox,
        DatePipe,
        ConfigService,
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ],
    exports: [ModalPopupComponent]
})
export class CatalogModule {
}
