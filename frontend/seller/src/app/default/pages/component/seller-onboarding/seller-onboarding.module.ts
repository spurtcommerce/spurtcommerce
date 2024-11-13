import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { EffectsModule } from "@ngrx/effects";
import { NgSelectModule } from '@ng-select/ng-select';
import { SellerOnboardingRoutingModule } from "./seller-onboarding-routing.module";
import { SettingsLayoutComponent } from "./layout/settings-layout.component";
import { SharedModule } from "../../../../../../src/app/default/shared/shared.module";
import { sellerOnBoardingService } from "../../../../../../src/app/core/seller-onBoarding/sellerOnBoarding.service";
import { sellerOnBoardingSandbox } from "../../../../../../src/app/core/seller-onBoarding/sellerOnBoarding.sandbox";
import { sellerOnBoardingEffect } from "../../../../../../src/app/core/seller-onBoarding/effects/sellerOnBoarding.effect";
import { CommonSandbox } from "../../../../../../src/app/core/common/common.sandbox";
import { CommonService } from "../../../../../../src/app/core/common/common.service";
import { CommonEffect } from "../../../../../../src/app/core/common/effects/common.effect";

import { NgbDropdownModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TabLayoutComponent } from './tab-layout/tab-layout.component';
import { CatalogModule } from '../../../pages/component/catalog/catalog.module';
import { UploadedtimlineComponent } from "./uploadedtimline/uploadedtimline.component";
@NgModule({
  declarations: [
    SettingsLayoutComponent,
    UploadedtimlineComponent,
    TabLayoutComponent
  ],
  imports: [
    CommonModule,
    SellerOnboardingRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([sellerOnBoardingEffect,
      CommonEffect,
    ]),
    NgSelectModule,
    TranslateModule,
    NgbDropdownModule,
    NgbModule,
    CatalogModule
  ],
  providers: [
    sellerOnBoardingService,
    sellerOnBoardingSandbox,
    CommonSandbox,
    CommonService,
  ]
})
export class SellerOnboardingModule { }
