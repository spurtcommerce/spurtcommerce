import { AuthGuard } from 'src/core/admin/providers/auth.guard';
import { WidgetStaticComponent } from './widget-static/widget-static.component';


// components paths
export const promotionWidgetComponents = [WidgetStaticComponent]; 

// route paths
export const routePath = [
    { path: 'list', component: WidgetStaticComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'widget-list',
      urls: [{ title: 'breadcrumbs.CMS', url: '' },{ title: 'CMS.ManageContent.Manage Pages', url: '' },
      { title: 'Promotion Widget', url: '' }, { title: 'List', url: '' }]
    }
    },
   
];