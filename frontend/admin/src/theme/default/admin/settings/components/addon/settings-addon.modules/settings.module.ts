import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { settingsAddonComponents } from '../../../../../../../../add-ons/add-ons.constant';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/theme/default/admin/admin.module';
import { ComponentsModule } from 'src/theme/default/admin/shared/components';
import { MaterialModule } from 'src/theme/default/default.material.module';
import { NgbAccordionModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DefaultCommonModule } from 'src/theme/default/default.common.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../../../../../../add-ons/shared/shared/shared.module';
import { SettingsLayoutComponents } from './layout/layout.component';

@NgModule({
  declarations: [

    SettingsLayoutComponents,
    ...settingsAddonComponents
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
    FormsModule,
    ComponentsModule,
    NgbAccordionModule,
    MaterialModule,
    NgbDropdownModule,
    SharedModule,
    
    DefaultCommonModule,
    NgSelectModule,
    MaterialModule,
    TranslateModule.forChild({
      loader:{
        provide :TranslateLoader,
        useFactory :HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SettingsRoutingModule
  ],
  providers :[]
})
export class SettingsAddonModule { }
