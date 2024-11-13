import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from '../layout/layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedModule } from '../../../../../../../src/app/default/shared/shared.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { DataTablesModule } from 'angular-datatables/src/angular-datatables.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { CustomerGroupComponent } from './customer-group/customer-group.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { crmGroupsService } from '../../../../../../../src/app/core/crmGroups/crmGroups.service';
import { crmGroupsSandbox } from '../../../../../../../src/app/core/crmGroups/crmGroups.sandbox';
import { crmGroupsEffect } from '../../../../../../../src/app/core/crmGroups/crmGroups-effects/crmGroups.effects';
import { EffectsModule } from '@ngrx/effects';
import { CatalogModule } from '../../catalog/catalog.module';
import {
  CrmRatingAndReviewComponents, CrmRatingAndReviewRoutes, QuestionAnswerproductListComponents, QuestionAnswerproductListRoutes
} from '../../../../../../../add-ons/add-ons.constant';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'customer-group', pathMatch: 'full' },
      {
        path: 'list',
        component: CustomersComponent,
        data: {
          title: 'Customer',
          urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.CRM', url: '/crm/list' }]
        }
      },
      {
        path: 'customer-group',
        component: CustomerGroupComponent,
      },
      {
        path: 'customer',
        component: AddCustomerComponent,
      },
      ...CrmRatingAndReviewRoutes,
      ...QuestionAnswerproductListRoutes,

      // {
      //   path: 'rating-review',
      //   component: RatingreviewComponent,
      //   data: {
      //       title: 'Rating Review',
      //       urls: [{ title: 'breadcrumbs.Home' , url: '/dashboard'}, { title: 'breadcrumbs.CMS', url: '/cms/manage-content' },{ title: 'breadcrumbs.Managecontent', url: 'cms/manage-content' }, { title: 'breadcrumbs.RatingandReview' }]
      //   }
      // },
      //   {
      //     path: 'product-question-answer',
      //     component: addOnProductListComponent,
      //     data: {
      //         title: 'Question Answer',
      //         urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' },{ title: 'breadcrumbs.CMS', url: '/cms/manage-content' },{ title: 'breadcrumbs.Managecontent', url: 'cms/manage-content' }, { title: 'breadcrumbs.QuestionandAnswer' }]
      //     }
      // },
     
      // {
      //     path: 'common-products',
      //     component: CommonProductComponent,
      //     data: {
      //         title: 'Common Products',
      //         urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' },{ title: 'breadcrumbs.CMS', url: 'cms/manage-content/' },{ title: 'breadcrumbs.Managecontent', url: 'cms/manage-content/' }, { title: 'breadcrumbs.CommonProducts' }]
      //     }
      // },
    ]
  }
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    // CustomersViewComponent
    CustomersComponent,
    CustomerGroupComponent,
    AddCustomerComponent,
    LayoutComponent,
    ...CrmRatingAndReviewComponents,
    ...QuestionAnswerproductListComponents,

  ],
  imports: [
    CommonModule,
    FormsModule,
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
    NgSelectModule,
    TranslateModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([crmGroupsEffect]),
    CatalogModule
  ],
  providers: [crmGroupsService, crmGroupsSandbox]

})
export class ManageCustomersModule { }
