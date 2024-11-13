import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../../../app/core/providers/guards/auth-guard';
import { EffectsModule } from '@ngrx/effects';
import { CustomerEffects } from '../../../../core/customers/effects/customers.effect';
import { CustomerSandbox } from '../../../../core/customers/customers.sandbox';
import { CustomerService } from '../../../../core/customers/customers.service';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { LayoutComponent } from './layout/layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const crmRoutes: Routes = [

  { path: '', redirectTo: 'customer', pathMatch: 'full' },
  {
    path: 'manage-customer',
    loadChildren: () => import('./manage-customers/manage-customers.module').then(m => m.ManageCustomersModule),
    canActivate: [AuthGuard],
    data: { root: 'sales', permissionForHeader: 'sales-orders' }
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
    canActivate: [AuthGuard],
    data: { root: 'sales', permissionForHeader: 'sales-orders' }
  },

];



@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule, SharedModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(crmRoutes),
    EffectsModule.forFeature([CustomerEffects]),
    TranslateModule.forChild(),
    NgSelectModule,
    SharedModule,
    NgbModule
  ],
  providers: [
    CustomerSandbox,
    CustomerService
  ]
})
export class CrmModule { }
