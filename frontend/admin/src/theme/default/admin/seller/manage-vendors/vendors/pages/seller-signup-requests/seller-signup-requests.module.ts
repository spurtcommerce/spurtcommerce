import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerSignupRequestsRoutingModule } from './seller-signup-requests-routing.module';
import { SellerSignupRequestListComponent } from './list/list.component';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/theme/default/admin/admin.module';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from 'add-ons/shared/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerSignupRequestsEffect } from '../../../../../../../../../src/core/admin/SellerSignupRequests/Seller Signup/effect/SellerSignupRequests.effect';
import { SellerSignupListSandbox } from '../../../../../../../../../src/core/admin/SellerSignupRequests/Seller Signup/SellerSignupRequests.sandbox';
import { SellerSignupRequestsService } from '../../../../../../../../../src/core/admin/SellerSignupRequests/Seller Signup/SellerSignupRequests.service';
import { ActivatePopupComponent } from './activate-popup/activate-popup.component';
// import{VendorHeaderComponent} from './header/header.component';
// import { ShowHideModule } from 'src/theme/default/admin/shared/components/directives/show-hide.module';
@NgModule({
  declarations: [
    SellerSignupRequestListComponent,
    ActivatePopupComponent,
    // VendorHeaderComponent,

  ],
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,
    // ShowHideModule,
  
    SellerSignupRequestsRoutingModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    EffectsModule.forFeature([SellerSignupRequestsEffect])
  ],
  providers:[
    NgbActiveModal,
    SellerSignupListSandbox,
    SellerSignupRequestsService,
  
  ]
})
export class SellerSignupRequestsModule { }


