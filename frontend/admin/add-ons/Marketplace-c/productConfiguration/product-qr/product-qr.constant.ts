import { Routes } from "@angular/router";
import { AuthGuard } from "src/core/admin/providers/auth.guard";
import { ProductQrStaticComponent } from "./product-qr-static/product-qr-static.component";

// Component and Routes Constant

export const components = [ProductQrStaticComponent];

export const routes: Routes = [
  {
    path: '',
    component: ProductQrStaticComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'list-product-qr',
      urls: [
        { title: "breadcrumbs.Marketplace", url: "" },
        { title: "Product Configuration", url: "" },
        { title: "breadcrumbs.Product Qr", url: "" },
        { title: "breadcrumbs.List", url: "" },
      ]
    }
  }
]
