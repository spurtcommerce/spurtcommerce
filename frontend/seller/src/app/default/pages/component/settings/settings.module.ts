
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

// components
import { SettingsComponent } from './layout/settings.component';
import { CommonSandbox } from '../../../../core/common/common.sandbox';
import { CommonService } from '../../../../core/common/common.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthSandbox } from '../../../../core/auth/auth.sandbox';
import { AuthApiService } from '../../../../core/auth/auth.service';
import { ConfigService } from '../../../../core/services/config.service';
import { DeliverySandbox } from '../../../../core/delivery/delivery.sandbox';
import { DeliveryService } from '../../../../core/delivery/delivery.service';
import { DeliveryEffect } from '../../../../core/delivery/delivery-effects/delivery.effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../../core/product/product.service';
import { ProductSandbox } from '../../../../core/product/product.sandbox';
import { ProductEffect } from '../../../../core/product/product-effects/product.effects';
import { TranslateModule } from '@ngx-translate/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from '../../../../../../src/app/core/providers/guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                  canActivate: [AuthGuard],
                data: {
                  title: 'Dashboard',
                  urls:[{title:'breadcrumbs.Dashboard', url: '/dashboard'}]
              }
            },

        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        SharedModule,
        FormsModule,
        NgbModule,
        NgSelectModule,
        ImageCropperModule,
        TranslateModule.forChild(),
        EffectsModule.forFeature([DeliveryEffect,ProductEffect])
    ],
    declarations: [
        SettingsComponent
    ],
    providers: [CommonSandbox, CommonService, AuthSandbox, AuthApiService,ProductService,ProductSandbox,
        ConfigService, DeliverySandbox, DeliveryService]

})
export class SettingsModule {
}
