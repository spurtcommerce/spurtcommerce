//angular imports 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// Third party 
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgbAccordionModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
//Custom  modules 
import { HttpLoaderFactory } from 'src/theme/default/admin/admin.module';
import { ComponentsModule } from 'src/theme/default/admin/shared/components';
// import { MaterialModule } from 'src/theme/default/default.material.module';
import { DefaultCommonModule } from 'src/theme/default/default.common.module';
import { filterAddonComponents } from '../../../../../../../../../add-ons/add-ons.constant';
import { SharedModule } from 'add-ons/shared/shared/shared.module';
import { filterRoutingModule } from './filters-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    ...filterAddonComponents
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
    FormsModule,
    ComponentsModule,
    NgbAccordionModule,
    // MaterialModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    NgbDropdownModule,
    SharedModule,
    DefaultCommonModule,
    NgSelectModule,
    CKEditorModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    filterRoutingModule
  ],
  providers: []
})
export class FilterAddonModule { }
