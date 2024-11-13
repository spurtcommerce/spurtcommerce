import { Routes } from "@angular/router";
import { CommonStaticComponent } from "./common-static/common-static.component";


// components paths
export const componentLists = [CommonStaticComponent]; 


// route paths
export const routePath: Routes = [ 
    {path:'',redirectTo:'list',pathMatch:'full'},
    {
        path: 'list',
        component: CommonStaticComponent,
        
        data: {
            title: 'Common Product',
            ActiveStatus:'common-product-list-data',
            urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.Catalog', url: '/catalog/manage-products/' },{ title: 'breadcrumbs.ManageProducts', url: '/catalog/manage-products/list' }, { title: 'breadcrumbs.CommonProduct' }]
        }
    },
];
