import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ratingAndReviewComponentRoutes } from 'add-ons/add-ons.constant';

const routes: Routes = [...ratingAndReviewComponentRoutes];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatingAndReviewRoutingModule { }
