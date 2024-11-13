import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompanyDetailsComponent } from './myshop/company-details/company-details.component';
import { AddCapabilitiesModalComponent } from './myshop/add-capabilities-modal/add-capabilities-modal.component';
import { AddCertificateComponent } from './myshop/add-certificate/add-certificate.component';
import { AddVideoModalComponent } from './myshop/add-video-modal/add-video-modal.component';
import { AppMaterial } from '../../../../app.material.module';
import { MyAccountLayoutComponent } from './layout/layout.component';
import { SharedModule } from '../../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { MyShopSandbox } from '../../../../../../src/app/core/myShop/myShop.sandbox';
import { MyShopService } from '../../../../../../src/app/core/myShop/myShop.service';
import { MyShopEffect } from '../../../../../../src/app/core/myShop/effects/myShop.effects';
import { ConfigService } from '../../../../../../src/app/core/services/config.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CatalogModule } from '../../../pages/component/catalog/catalog.module';
import { CommonSandbox } from '../../../../../../src/app/core/common/common.sandbox';
import { CommonService } from '../../../../../../src/app/core/common/common.service';
import { ImageDataService } from './imageFlagServices';
import { PersonalisedSettingComponent } from './personalised-setting/personalised-setting.component';
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
const catalogRoute: Routes = [
  {
    path: '', component: MyAccountLayoutComponent,
    children: [
      { path: '', redirectTo: 'myshop', pathMatch: 'full' },
      {
        path: 'myshop',
        component: CompanyDetailsComponent,
      },
      {
        path: 'add-certificate',
        component: AddCertificateComponent,
      },
      {
        path: 'edit-certificate/:id',
        component: AddCertificateComponent,
      },
      {
        path: 'personalised-setting',
        component: PersonalisedSettingComponent,
      },
    ]
  }

]

@NgModule({
  declarations: [
    CompanyDetailsComponent,
    AddCapabilitiesModalComponent,
    AddCertificateComponent,
    AddVideoModalComponent,
    MyAccountLayoutComponent,
    PersonalisedSettingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(catalogRoute),
    AppMaterial,
    EffectsModule.forFeature([MyShopEffect]),
    CatalogModule
  ],
  providers:[MyShopSandbox,MyShopService,ConfigService,CommonSandbox,CommonService,ImageDataService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, // This sets the locale to British, which uses dd/MM/yyyy format
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class MyAccountModule { }
