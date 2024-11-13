
import { AuthGuard } from "../../src/app/core/providers/guards/auth-guard";
import { RatingStaticComponent } from "./rating-static/rating-static.component";





// components paths
export const componentLists = [RatingStaticComponent];

// route paths
export const routePath = [
    {
        path: 'rating-review',
        component: RatingStaticComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Rating Review',
            urls: [{ title: 'breadcrumbs.Home' , url: '/dashboard'}, { title: 'breadcrumbs.CMS', url: '/cms/manage-content' },{ title: 'breadcrumbs.Managecontent', url: 'cms/manage-content' }, { title: 'breadcrumbs.RatingandReview' }]
        }
      },
    
 
];