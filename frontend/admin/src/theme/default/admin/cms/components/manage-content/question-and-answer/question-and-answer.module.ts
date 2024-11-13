import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { QuestionAndAnswerRoutingModule } from './question-and-answer-routing.module';
import { ComponentsModule } from '../../../../shared/components';
import { SharedModule } from 'add-ons/shared/shared/shared.module';
import { NumberAcceptModule } from 'src/core/admin/shared/validation-directives/onlyNumber.module';
import { questionAndAnswerComponents } from '../../../../../../../../add-ons/add-ons.constant';
@NgModule({
  declarations: [...questionAndAnswerComponents],
  imports: [
    CommonModule,
    QuestionAndAnswerRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NumberAcceptModule,
    InfiniteScrollModule,
    TranslateModule.forChild(),
  ]
})
export class QuestionAndAnswerModule { }
