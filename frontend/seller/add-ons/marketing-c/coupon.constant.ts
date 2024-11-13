import { CouponStaticComponent } from "./coupon-static/coupon-static.component";


// components paths
export const componentLists = [CouponStaticComponent];

// route paths
export const routePath = [
    {
        path: 'coupon',
        component: CouponStaticComponent,
        data: {
            title: 'coupons',
            urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.Marketing', url: 'marketing/manage-promotions' }, { title: 'breadcrumbs.Managepromotions', url: 'marketing/manage-promotions' }, { title: 'breadcrumbs.Coupons' }]
        }
    },
    
];