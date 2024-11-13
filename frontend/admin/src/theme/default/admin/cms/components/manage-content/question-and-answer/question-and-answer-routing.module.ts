import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { questionAndAnswerComponentRoutes } from 'add-ons/add-ons.constant';

const routes: Routes = [...questionAndAnswerComponentRoutes];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionAndAnswerRoutingModule { }
