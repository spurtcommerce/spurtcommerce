import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { SwiperModule } from 'ngx-swiper-wrapper';

// components
import { CommonHeaderComponent } from '../../default/shared/components/common-header/common-header.component';
import { FooterComponent } from '../../default/shared/components/footer/footer.component';
import { SidebarComponent } from '../../default/shared/components/sidebar/sidebar.component';
import { BreadcrumbsComponent } from '../../default/shared/components/breadcrumbs/breadcrumbs.component';
import { ImagemanagerpopupComponent } from './popup/ImageManagerPopup/imagemanagerpopup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductSuccessComponent } from './popup/product-success/product-success.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NodataComponent } from './components/nodata/nodata.component';
import { NumberAcceptModule } from './validation-directives/onlyNumber.module';
import { AppMaterial } from '../../app.material.module';
import { AddDeliveryComponent } from './popup/add-delivery/add-delivery.component';
import { PipeModule } from './pipe/pipe.module';
import { UpcommingComponent } from './components/upcomming-page/upcomming-page.component';
import { DeletePopupComponent } from './popup/delete-popup/delete-popup.component';
import { CurrencyPipeModule } from './pipe/currency.module';
import { ConfirmationDialogComponent } from './popup/Confirmation-dialog/confirmation-dialog.component';

import { PasswordShowModule } from './password-show.directives/passwordShow.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SearchPipe } from './search-directive/search.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationComponent } from './pagination/pagination.component';
import { CurrencySymbolPipe } from './pipe/currency.pipe';
import { ReusablePaginationComponent } from './components/reusable-pagination/reusable-pagination.component';
import { ReusableFormsComponent } from './components/reusable-forms/reusable-forms.component';
import { ReusableErrorMessageComponent } from './components/reusable-error-message/reusable-error-message.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NospaceDirective } from './pipe/nospace.directive';
import { CommonTableComponent } from './components/common-table/common-table.component';
import { NumberOnlyAllowedDirective } from './components/number-only/number-only-allowed.directive';
import { NoLeadingSpaceDirective } from './components/no-space/no-leading-space.directive';
import { OpenSidebarComponent } from '../common-sidebar/open-sidebar/open-sidebar.component';
import { NoDataFoundComponent } from '../common/no-data-found/no-data-found.component';
import { NumberAcceptgetModule } from './components/validation-directives/onlyNumberget.module';
import { CommonDeleteComponent } from '../common/common-delete/common-delete.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BulkUpdateComponent } from '../common/bulk-update/bulk-update.component';
import { DynamicDatePipe } from './pipe/dynamic-date.pipe';
import { SellerDynamicDatePipe } from './pipe/seller-dynamic-date.pipe';
import { DynamicColumnsComponent } from './components/dynamic-columns/dynamic-columns.component';
import { AlertContentComponent } from './components/alert-content/alert-content.component';
import { BulkActionComponent } from './components/bulk-action/bulk-action.component';
import { CommonBadgeComponent } from './components/common-badge/common-badge.component';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MinValueDirective } from './components/nonNegativeValue/min-value.directive';
import { VariantDeletionComponent } from '../common/variant-deletion/variant-deletion.component';
import { LimitTextDirective } from './pipe/limit-text.directive';
import { CommonSortComponent } from './components/common-sort/common-sort.component';
const dateFormat = localStorage.getItem('dateTimeFormate')  // Fallback to default format

export const MY_FORMATS = {
    parse: {
        dateInput: "yyyy-MM-dd",
    },
    display: {
        dateInput: "yyyy-MM-dd",
        monthYearLabel: 'MMM YYYY', // You can also customize this if needed
        dateA11yLabel: "yyyy-MM-dd",
        monthYearA11yLabel: 'MMMM YYYY', // Customize this too if needed
    },
};

const CORE_COMPONENTS = [
    CommonHeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    ImagemanagerpopupComponent,
    ProductSuccessComponent,
    LoaderComponent,
    NodataComponent,
    ConfirmationDialogComponent,
    AddDeliveryComponent,
    UpcommingComponent,
    DeletePopupComponent,
    PaginationComponent,
]

export const COMPONENTS = [...CORE_COMPONENTS]

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        // SwiperModule,
        NgbModule,
        FormsModule,
        NumberAcceptModule,
        NumberAcceptgetModule,
        PasswordShowModule,
        AppMaterial,
        PipeModule, CurrencyPipeModule,
        ReactiveFormsModule,
        NgSelectModule,
        CKEditorModule,
        TranslateModule,
        ImageCropperModule,
        NumberAcceptgetModule
    ],
    exports: [
        CommonModule,
        RouterModule,
        // SwiperModule,
        NumberAcceptgetModule,
        NumberAcceptModule,
        PasswordShowModule,
        CommonHeaderComponent,
        FooterComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        ProductSuccessComponent,
        LoaderComponent,
        NodataComponent,
        AppMaterial,
        SearchPipe,
        PipeModule,
        CurrencyPipe,
        CurrencySymbolPipe,
        UpcommingComponent,
        COMPONENTS,
        TranslateModule,
        PaginationComponent,
        ReusableFormsComponent,
        ReusableErrorMessageComponent,
        NospaceDirective,
        LimitTextDirective,
        DynamicDatePipe,
        ReusablePaginationComponent,
        DynamicColumnsComponent,
        CommonSortComponent,
        AlertContentComponent,
        CKEditorModule,
        CommonTableComponent,
        NumberOnlyAllowedDirective,
        CommonBadgeComponent,
        NoLeadingSpaceDirective,
        OpenSidebarComponent,
        NoDataFoundComponent,
        NumberAcceptgetModule,
        CommonDeleteComponent,
        VariantDeletionComponent,
        BulkUpdateComponent,
        SellerDynamicDatePipe,
        BulkActionComponent,
        MinValueDirective
    ],
    declarations: [
        COMPONENTS,
        SearchPipe,
        CurrencySymbolPipe,
        ReusablePaginationComponent,
        ReusableFormsComponent,
        ReusableErrorMessageComponent,
        NospaceDirective,
        LimitTextDirective,
        DynamicDatePipe,
        CommonTableComponent,
        NumberOnlyAllowedDirective,
        NoLeadingSpaceDirective,
        OpenSidebarComponent,
        NoDataFoundComponent,
        CommonDeleteComponent,
        VariantDeletionComponent,
        BulkUpdateComponent,
        SellerDynamicDatePipe,
        DynamicColumnsComponent,
        CommonSortComponent,
        AlertContentComponent,
        BulkActionComponent,
        CommonBadgeComponent,
        MinValueDirective,
        UpcommingComponent
    ],
    providers: [DatePipe,
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class SharedModule {
}
