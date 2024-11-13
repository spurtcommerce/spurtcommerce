import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsLayoutComponent } from './layout/settings-layout.component'
import { TabLayoutComponent } from './tab-layout/tab-layout.component';
import { MyAccountLayoutComponent } from '../my-account/layout/layout.component';

const routes: Routes = [
  {
    path: '', component: MyAccountLayoutComponent,
    children: [
      { path: '', redirectTo: 'seller-onboarding-Details', pathMatch: 'full' },
      {
        path: 'seller-onboarding-Details',
        component: TabLayoutComponent,
      },
      
    ]
  }
  





    // children: [
    //   {
    //     path: '',
    //     redirectTo: 'TabLayoutComponent',
    //     pathMatch: 'full'
    //   },
    //   {
    //     path: 'bank-account-info',
    //     component: BankInfoComponent,
    //     data: {
    //       title: 'bank-account-info',
    //       urls: [{ title: 'breadcrumbs.Home', url: '/seller-onboarding' }, { title: 'Bank Info', url: '/bank-info' }]
    //     }
    //   },
    //   {
    //     path: 'company-details',
    //     component: CompanyDetailsComponent,
    //     data: {
    //       title: 'company-details',
    //       urls: [{ title: 'breadcrumbs.Home', url: '/seller-onboarding' }, { title: 'Company Details', url: '/company-details' }]
    //     }
    //   },
    //   {
    //     path: 'upload-documents',
    //     component: UploadDocumentsComponent,
    //     data: {
    //       title: 'upload-documents',
    //       urls: [{ title: 'breadcrumbs.Home', url: '/seller-onboarding' }, { title: 'Upload Documents', url: '/upload-documents' }]
    //     },
        
    //   },

    //   {
    //     path: 'tab',
    //     component: TabLayoutComponent,
    //     data: {
    //       title: 'upload-documents',
    //       urls: [{ title: 'breadcrumbs.Home', url: '/seller-onboarding' }, { title: 'Upload Documents', url: '/upload-documents' }]
    //     },
        
    //   },
    // ]


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerOnboardingRoutingModule { }
