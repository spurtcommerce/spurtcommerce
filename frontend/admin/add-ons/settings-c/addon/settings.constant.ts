
import { AuthGuard } from "src/core/admin/providers/auth.guard";
import { Routes } from "@angular/router";
import { AttributeStaticComponent } from "./attributes/attribute-static/attribute-static.component";
import { SpecificationStaticComponent } from "./product-specification/specification-static/specification-static.component";
import { FamilyStaticComponent } from "./family/family-static/family-static.component";
import { AttributeGroupStaticComponent } from "./attribute-group/attribute-group-static/attribute-group-static.component";
// import { AttributeGroupStaticComponent } from "./attributes-group/attribute-group-static/attribute-group-static.component";



// components paths
export const settingsAddonComponent = [
  
  AttributeStaticComponent, SpecificationStaticComponent,FamilyStaticComponent,AttributeGroupStaticComponent
];

// route paths
export const settingsAddonRoute: Routes = [
  { path: '', redirectTo: 'attributes', pathMatch: 'full' },
  {
    path: 'attributes',

    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: AttributeStaticComponent, canActivate: [AuthGuard], data: {
          permission: 'list-attribute',
          urls: [{ title: 'breadcrumbs.Marketplace', url: '' },
          { title: 'Product Configuration', url: '' },
          { title: 'breadcrumbs.Attributes', url: '' },
          { title: 'settings', url: '' },
          { title: 'Attribute  List', url: '' }]
        }
      },
    ],
  },

  {
    path: 'attributes-group',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: AttributeGroupStaticComponent, canActivate: [AuthGuard], data: {
          permission: 'list-attribute',
          urls: [{ title: 'breadcrumbs.Marketplace', url: '' },
          { title: 'Product Configuration', url: '' },
          { title: 'breadcrumbs.Attributes', url: '' },
          { title: 'settings', url: '' },
          { title: 'Attribute Group List', url: '' }]
        }
      },
    ],

  },
  {
    path: 'product-specification',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: SpecificationStaticComponent, canActivate: [AuthGuard], data: {
          permission: 'list-attribute',
          urls: [{ title: 'breadcrumbs.Marketplace', url: '' },
          { title: 'Product Configuration', url: '' },
          { title: 'breadcrumbs.Attribute', url: '' },
          { title: 'settings', url: '' },
          { title: 'breadcrumbs.Product Specification List', url: '' }]
        }
      },
    ],
  },

  {
    path: 'family',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: FamilyStaticComponent, canActivate: [AuthGuard], data: {
          permission: 'list-attribute',
          urls: [{ title: 'breadcrumbs.Marketplace', url: '' },
          { title: 'Product Configuration', url: '' },
          { title: 'breadcrumbs.Attribute', url: '' },
          { title: 'settings', url: '' },
          { title: 'Family', url: '' }]
        }
      },
    ]
  }
]




