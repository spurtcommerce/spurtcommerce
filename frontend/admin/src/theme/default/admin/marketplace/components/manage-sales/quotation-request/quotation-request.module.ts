import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotationRequestRoutingModule } from './quotation-request-routing.module';
// import { quotationRequestComponents } from '../../../../../../../../add-ons/add-ons.constant'
import { SharedModule } from 'add-ons/shared/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import {LayoutService} from '../../../../../../../core/admin/sales/layout/layout.service';
import {LayoutsSandbox} from '../../../../../../../core/admin/sales/layout/layout.sandbox';
import {LayoutEffects} from '../../../../../../../core/admin/sales/layout/effects/layout.effect';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    // ...quotationRequestComponents
  ],
  imports: [
    CommonModule,
    QuotationRequestRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([LayoutEffects]),
    TranslateModule.forChild(),

    CKEditorModule,
    NgbModule
  ],
  providers: [
    LayoutService,
    LayoutsSandbox
  ]
})
export class QuotationRequestModule { }
