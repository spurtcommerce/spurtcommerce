// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// Third Party imports
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

// Routing 
import { ManageSalesRoutingModule } from './manage-sales.routing';
// Module
import { ComponentsModule } from '../../../shared/components';
import { NumberAcceptModule } from '../../../../../../../src/core/admin/shared/validation-directives/onlyNumber.module';
import { DefaultCommonModule } from '../../../../../../../src/theme/default/default.common.module';
import { HttpLoaderFactory } from '../../../admin.module';
// Components
import { BackOrdersComponent } from './back-orders/back-orders.component';
import { FailedOrdersComponent } from './failed-orders/failed-orders.component';
// sandbox
import { BackorderListSandbox } from '../../../../../../../src/core/admin/sales/backorder-list/backorder-list.sandbox';
import { FailedOrderSandbox } from '../../../../../../../src/core/admin/sales/failed-order/failed-order-sandbox';

// service
import { FailedOrderService } from '../../../../../../../src/core/admin/sales/failed-order/failed-order.service';
import { BackorderListService } from '../../../../../../../src/core/admin/sales/backorder-list/backorder-list.service';

// Effects
import { BackorderListEffects } from '../../../../../../../src/core/admin/sales/backorder-list/effects/backorder-list.effects';
import { FailedOrderEffects } from '../../../../../../../src/core/admin/sales/failed-order/failed-order-effects/failed-order.effects';
import { FailedOrderModalComponent } from './failed-order-model/failed-order-model.component';
import { ViewFailedOrdersComponent } from './view-failed-orders/vieworders.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    BackOrdersComponent,
    FailedOrdersComponent,
    FailedOrderModalComponent,
    ViewFailedOrdersComponent
  ],
  imports: [
    CommonModule,
    NgbCollapseModule,
    ManageSalesRoutingModule,
    DefaultCommonModule,
    MatDatepickerModule,
    ComponentsModule,
    MatRadioModule,
    NgbModule,
    NgSelectModule,
    NumberAcceptModule,
    FormsModule,
    CKEditorModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([
      BackorderListEffects, FailedOrderEffects
    ]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers: [
    BackorderListSandbox, 
    BackorderListService, 
    FailedOrderSandbox, 
    FailedOrderService
  ]
})
export class ManageSalesModule { }
