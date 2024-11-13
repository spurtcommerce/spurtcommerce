import { AuthGuard } from "src/core/admin/providers/auth.guard";
import { Routes } from "@angular/router";
import { VariantStaticComponent } from "./variant-static/variant-static.component";

// components paths
export const componentLists = [VariantStaticComponent];

// route paths
export const routePath: Routes = [
    { path: '', redirectTo: 'variant-list', pathMatch: 'full' },
    {
        path: "variant-list",
        component: VariantStaticComponent,
        canActivate: [AuthGuard],
        data: {
            permissionForHeader: "settings-site-variant",
            root: "settingsSite",
            urls: [
                { title: 'breadcrumbs.Marketplace', url: '' }, { title: 'Product Configuration', url: '' },
                { title: "breadcrumbs.Variants", url: "" },
            ],
        },
    },

]
