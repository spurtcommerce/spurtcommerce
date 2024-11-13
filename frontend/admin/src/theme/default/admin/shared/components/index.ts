/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { DefaultCommonModule } from '../../../default.common.module';

// custom directive component
import { NavigationComponent } from './navigation/navigation.component';
import { ProfileBarComponent } from './profile-bar/profile.bar.component';
import { MaterialModule } from '../../../default.material.module';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from './pipes/currency-symbol.pipe';
import { RatingComponent } from './rating/rating.component';
import { PipeModule } from './pipes/category-search.pipe.module';
import { PermissionServices } from './services/permission.services';
import { MyDisableIfUnauthorizedDirective } from './directives/disable-if-unauthorized.directive';
import { MyHideIfUnauthorizedDirective } from './directives/hide-if-unauthorized.directive';
import { SalesCountComponent } from '../components/directives/sales-count/count.component';
import { LayoutsSandbox } from '../../../../../core/admin/sales/layout/layout.sandbox';
import { PagesLayoutComponent } from './pages-layout/pages-layout.component';
import { GlobalLoaderComponent } from './global-loader/global-loader.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FilterPipe} from './pipes/category-search.pipe'
import { DynamicDatePipe } from './pipes/date.pipe';
import { ReusablePaginationComponent } from './reusable-pagination/reusable-pagination.component';
import { CommonTableComponent } from './common-table/common-table/common-table.component';
import { CommonFormComponent } from './common-form/common-form.component';
import { ErrMsgComponent } from './err-msg/err-msg.component';
import { NumberAcceptModule } from 'src/core/admin/shared/validation-directives/onlyNumber.module';
import { BulkActionComponent } from './bulk-action/bulk-action.component';
import { CommonBadgeComponent } from './common-badge/common-badge.component';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ShowhideModule } from './directives/showhide/showhide.module';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@NgModule({
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        DefaultCommonModule,
        MaterialModule,
        PipeModule,
        TranslateModule.forChild(),
        NumberAcceptModule,
        ShowhideModule
    ],
    declarations: [
        ReusablePaginationComponent,
        DynamicDatePipe,
        NavigationComponent,
        ProfileBarComponent,
        CurrencySymbolPipe,
        RatingComponent,
        MyDisableIfUnauthorizedDirective,
        MyHideIfUnauthorizedDirective,
        SalesCountComponent,
        PagesLayoutComponent,
        GlobalLoaderComponent,
        BreadcrumbComponent,
        CommonTableComponent,
        CommonBadgeComponent,
        CommonFormComponent,
        ErrMsgComponent,
        BulkActionComponent
    ],
    exports: [
      ReusablePaginationComponent,
        DynamicDatePipe,
        NavigationComponent,
        ProfileBarComponent,
        CurrencySymbolPipe,
        RatingComponent,FilterPipe,
        MyDisableIfUnauthorizedDirective,
        MyHideIfUnauthorizedDirective,
        SalesCountComponent,
        PagesLayoutComponent,
        GlobalLoaderComponent,
        BreadcrumbComponent,
        CommonTableComponent,
        CommonFormComponent,
        ErrMsgComponent,
        BulkActionComponent,
        CommonBadgeComponent,
      ],
    providers: [
        DatePipe,
        PermissionServices,
        LayoutsSandbox,
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }]
})
export class ComponentsModule {
  static forRoot(): ModuleWithProviders<ComponentsModule> {
    return {
      ngModule: ComponentsModule
    };
  }
}
