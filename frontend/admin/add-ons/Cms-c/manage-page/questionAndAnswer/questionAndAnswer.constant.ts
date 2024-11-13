
import { AuthGuard } from 'src/core/admin/providers/auth.guard';
import { QuestionAnswerStaticComponent } from './question-answer-static/question-answer-static.component';

// components paths
export const questionAndAnswerComponents = [QuestionAnswerStaticComponent]; 

// route paths
export const routePath = [
    { path: 'list', component: QuestionAnswerStaticComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'list-pages',
      urls: [{ title: 'breadcrumbs.CMS', url: '' },{ title: 'CMS.ManageContent.Manage Pages', url: '' },
      { title: 'Question And Answer', url: '' }, { title: 'List', url: '' }]
    }
    },
];