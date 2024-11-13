import { AuthGuard } from "src/core/admin/providers/auth.guard";
import { RatingReviewAnswerStaticComponent } from "./rating-review-answer-static/rating-review-answer-static.component";

// components paths
export const ratingAndReviewComponents = [RatingReviewAnswerStaticComponent]; 

// route paths
export const routePath = [
    { path: 'list', component: RatingReviewAnswerStaticComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'list-pages',
      urls: [{ title: 'breadcrumbs.CMS', url: '' },{ title: 'CMS.ManageContent.Manage Pages', url: '' },
      { title: 'Rating And Review', url: '' }, { title: 'List', url: '' }]
    }
    }
];