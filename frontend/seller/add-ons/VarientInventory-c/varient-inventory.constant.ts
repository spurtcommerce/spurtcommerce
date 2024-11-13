
import { Routes } from "@angular/router";
import { AuthGuard } from "../../src/app/core/providers/guards/auth-guard";
import { VarientinventoryStaticComponent } from "./varientinventory-static/varientinventory-static.component";



// components paths
export const componentLists = [VarientinventoryStaticComponent];
export const service = [];

// route paths
export const routePath: Routes = [
  {
    path: '', redirectTo: 'inventory', pathMatch: 'full'
  },
  {
    path: 'inventory',
    component: VarientinventoryStaticComponent,
    canActivate: [AuthGuard],

  },
];
