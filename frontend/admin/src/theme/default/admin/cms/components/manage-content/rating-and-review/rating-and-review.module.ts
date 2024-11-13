import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RatingAndReviewRoutingModule } from './rating-and-review-routing.module';
import { ratingAndReviewComponents } from '../../../../../../../../add-ons/add-ons.constant';
import { ComponentsModule } from '../../../../shared/components';
import { SharedModule } from 'add-ons/shared/shared/shared.module';
import { NumberAcceptModule } from 'src/core/admin/shared/validation-directives/onlyNumber.module';
@NgModule({
  declarations: [...ratingAndReviewComponents],
  imports: [
    CommonModule,
    RatingAndReviewRoutingModule,
    ComponentsModule,
    SharedModule,
    NumberAcceptModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RatingAndReviewModule { }
