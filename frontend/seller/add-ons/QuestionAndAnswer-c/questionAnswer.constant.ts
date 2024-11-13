
import { AuthGuard } from "../../src/app/core/providers/guards/auth-guard";
import { QuestionStaticComponent } from "./question-static/question-static.component";




// components paths
export const componentLists = [QuestionStaticComponent];

// route paths
export const routePath = [
    {
        path: 'product-question-answer',
        component:QuestionStaticComponent ,
        canActivate: [AuthGuard],
        data: {
            title: 'Question Answer',
            urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' },{ title: 'breadcrumbs.CMS', url: '/cms/manage-content' },{ title: 'breadcrumbs.Managecontent', url: 'cms/manage-content' }, { title: 'breadcrumbs.QuestionandAnswer' }]
        }
    },
   
    
 
];