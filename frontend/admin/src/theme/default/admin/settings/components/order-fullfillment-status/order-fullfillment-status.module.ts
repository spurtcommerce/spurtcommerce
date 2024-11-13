import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderFullfillmentStatusRoutingModule } from './order-fullfillment-status-routing.module';
import { OrderFullfillmentComponent } from './order-status/order-fullfillment/order-fullfillment.component';
import { OrderFullfillmentAddComponent } from './order-status/order-fullfillment-add/order-fullfillment-add.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../../../admin.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/theme/default/default.material.module';
import { ComponentsModule } from '../../../shared/components';
import { EffectsModule } from '@ngrx/effects';
import { OrderfullfillmentEffect } from 'src/core/admin/settings/order-fullfilment/effect/order-fullfilment.effects';
import { OrderfullfillmentSandbox } from 'src/core/admin/settings/order-fullfilment/order-fullfilment.sandbox';
import { OrderfullfillmentService } from 'src/core/admin/settings/order-fullfilment/order-fullfilment.service';
import { NumberAcceptModule } from 'src/core/admin/shared/validation-directives/onlyNumber.module';
import { LayoutComponent } from './layout/layout.component';
import { ManageFullfillmentStatusComponent } from './manage-fullfillment-status/manage-fullfillment-status.component';
import { FullfillmentMaapingComponent } from './fullfillment-maaping/fullfillment-maaping.component';
import { AddFullfillmentStatusComponent } from './add-fullfillment-status/add-fullfillment-status.component';


@NgModule({
    declarations: [
        OrderFullfillmentComponent,
        OrderFullfillmentAddComponent,
        LayoutComponent,
        ManageFullfillmentStatusComponent,
        FullfillmentMaapingComponent,
        AddFullfillmentStatusComponent
    ],
    imports: [
        CommonModule,
        ColorPickerModule,
        OrderFullfillmentStatusRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        MaterialModule,
        ComponentsModule,
        NumberAcceptModule,
        EffectsModule.forFeature([OrderfullfillmentEffect]),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ],
    providers: [OrderfullfillmentSandbox, OrderfullfillmentService]
})
export class OrderFullfillmentStatusModule { }
