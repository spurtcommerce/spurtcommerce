import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';
import { promotionWidgetComponentRoutes } from 'add-ons/add-ons.constant';

const manageContentRoutes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuard],
    data: { permissionForHeader: 'cms-pages', root: 'cms' }
  },
  {
    path: 'page-group',
    loadChildren: () => import('./page-group/page-group.module').then(m => m.PageGroupModule),
    canActivate: [AuthGuard],
    data: { permissionForHeader: 'cms-page-group', root: 'cms' }
  },
  {
    path: 'promotion-widget',
    loadChildren: () => import('./promotion-widget/promotion-widget.module').then(m => m.PromotionWidgetModule),
    canActivate: [AuthGuard],
    data: { permissionForHeader: 'cms-widgets', root: 'cms' }
  },
  {
    path: 'question-answer',
    loadChildren: () => import('./question-and-answer/question-and-answer.module').then(m => m.QuestionAndAnswerModule),
    canActivate: [AuthGuard],
    data: { permissionForHeader: 'cms-question-answer', root: 'cms' }
  },
  {
    path: 'rating-review',
    loadChildren: () => import('./rating-and-review/rating-and-review.module').then(m => m.RatingAndReviewModule),
    canActivate: [AuthGuard],
    data: { permissionForHeader: 'catalog-rating-review', root: 'cms' }
  },

...promotionWidgetComponentRoutes
];

@NgModule({
  imports: [RouterModule.forChild(manageContentRoutes)],
  exports: [RouterModule]
})
export class ManageContentRoutingModule { }
