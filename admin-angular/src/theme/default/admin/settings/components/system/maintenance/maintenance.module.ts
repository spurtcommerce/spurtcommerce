import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance.routing';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { MaterialModule } from 'src/theme/default/default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/theme/default/admin/admin.module';
import { HttpClient } from '@angular/common/http';
import { GeneralSettingSandbox } from '../../../../../../../core/admin/settings/generalsetting/generalsetting.sandbox';
import { GeneralSettingService } from '../../../../../../../core/admin/settings/generalsetting/generalsetting.service';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { GeneralSettingEffect } from '../../../../../../../core/admin/settings/generalsetting/generalsetting-effect/generalsetting.effect';


@NgModule({
  declarations: [
    MaintenanceComponent
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    MaterialModule,
    FormsModule,
    EffectsModule.forFeature([GeneralSettingEffect]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    GeneralSettingSandbox,
    GeneralSettingService
  ]
})
export class MaintenanceModule { }
