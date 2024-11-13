import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageCrossSellingRoutingModule } from './manage-cross-selling.routing';
import { relatedProductsComponent } from '../../../../../../../add-ons/add-ons.constant';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'add-ons/shared/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutEffect } from 'src/core/admin/layout/effects/layout.effects';
import { LayoutSandbox } from 'src/core/admin/layout/layout.sandbox';
import { LayoutsService } from 'src/core/admin/layout/layout.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SearchPipe } from '../manage-cross-selling/search.pipe';



@NgModule({
  declarations: [
    ...relatedProductsComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    ManageCrossSellingRoutingModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        EffectsModule.forFeature([LayoutEffect]),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        CKEditorModule,
        NgbModule
  ],
  providers: [LayoutSandbox,LayoutsService]
})
export class ManageCrossSellingModule { }
