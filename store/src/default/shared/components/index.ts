/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

// components
import {MainCarouselComponent} from './main-carousel/main-carousel.component';
import {BrandsCarouselComponent} from './brands-carousel/brands-carousel.component';
import {CategoryListComponent} from './category-list/category-list.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {FooterComponent} from './footer/footer.component';
import {OptionsComponent} from './options/options.component';
import {SidenavMenuComponent} from './sidenav-menu/sidenav-menu.component';
import {MenuComponent} from './menu/menu.component';
import {TopMenuComponent} from './top-menu/top-menu.component';
import {HeaderComponent} from './header/header.component';
import {HeaderMenuComponent} from './header-menu/header-menu.component';
import {SideBarComponent} from './side-bar/side-bar.component';
import {ControlsComponent} from './controls/controls.component';
import {ProductsCarouselComponent} from './products-carousel/products-carousel.component';
import {ProductDialogComponent} from './products-carousel/product-dialog/product-dialog.component';
import {CartNavComponent} from './cart/cart.component';


// modules
import {PipesModule} from '../pipes/pipes.module';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {SharedModule} from '../shared.module';

// store
import {EffectsModule} from '@ngrx/effects';
import {ProductControlEffect} from '../../../core/product-control/effects/product-control.effect';
import {CommonEffect} from '../../../core/common/effects/common.effect';
import {ProductControlService} from '../../../core/product-control/product-control.service';
import {ProductControlSandbox} from '../../../core/product-control/product-control.sandbox';
import {CommonSandbox} from '../../../core/common/common.sandbox';
import {CommonService} from '../../../core/common/common.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ControlsProductDetailComponent} from './controls-product-detail/controls-product-detail.component';
import {GetDirectionsComponent} from '../get-directions/get-directions.component';
import {AgmCoreModule} from '@agm/core';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    wheelPropagation: true,
    suppressScrollX: true
};

export const COMPONENTS = [
    MainCarouselComponent,
    BrandsCarouselComponent,
    CategoryListComponent,
    BreadcrumbComponent,
    TopMenuComponent,
    MenuComponent,
    SidenavMenuComponent,
    OptionsComponent,
    FooterComponent,
    HeaderComponent,
    HeaderMenuComponent,
    SideBarComponent,
    ControlsComponent,
    ProductsCarouselComponent,
    ProductDialogComponent,
    ControlsProductDetailComponent,
    GetDirectionsComponent,
    CartNavComponent
];

@NgModule({
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        PipesModule,
        PerfectScrollbarModule,
        SharedModule,
        EffectsModule.forFeature([ProductControlEffect, CommonEffect]),
        AgmCoreModule,
        NgbModule
    ],
    declarations: [COMPONENTS],

    exports: [COMPONENTS,
        PipesModule],
    entryComponents: [
        ProductDialogComponent
    ],
    providers: [
        {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
        ProductControlService, ProductControlSandbox, CommonSandbox, CommonService
    ]
})
export class ComponentsModule {
}
