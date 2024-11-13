import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MultisitelistComponent } from './multisitelist/multisitelist.component';
import { CreateComponent } from './create/create.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencySandbox } from 'src/core/admin/settings/localizations/currency/currency.sandbox';
import { LanguagesSandbox } from 'src/core/admin/settings/localizations/languages/languages.sandbox';
import { CategoriesSandbox } from 'src/core/admin/catalog/category/categories.sandbox';
import { CategoriesService } from 'src/core/admin/catalog/category/categories.service';
import { CategoriesEffect } from 'src/core/admin/catalog/category/effects/categories.effect';
import { CurrencyService } from 'src/core/admin/settings/localizations/currency/currency.service';
import { CurrencyEffect } from 'src/core/admin/settings/localizations/currency/currency-effect/currency.effects';
import { SellerEffects } from 'src/core/admin/vendor/pages/seller/seller-effects/seller.effects';
import { PipeModule } from '../../../shared/components/pipes/category-search.pipe.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ComponentsModule } from '../../../shared/components';
import { MultipleWebsitesEffect } from 'src/core/admin/settings/multiple-websites/effect/multiple-websites.effect';
import { MultipleWebsitesSandbox } from 'src/core/admin/settings/multiple-websites/multiple-websites.sandbox';
import { MultipleWebsitesService } from 'src/core/admin/settings/multiple-websites/multiple-websites.service';
import { SellerSandbox } from 'src/core/admin/vendor/pages/seller/seller.sandbox';
import { SellerService } from 'src/core/admin/vendor/pages/seller/seller.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { NumberAcceptModule } from '../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
const MultipleWebsitesRoute: Routes = [
  {path:'', redirectTo:'list', pathMatch:'full'},
  {
    path: 'list',
    component: MultisitelistComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'create/:id',
    component: CreateComponent,
  },
]

@NgModule({
  declarations: [
    MultisitelistComponent,
    CreateComponent,
  ],
  imports: [
    CommonModule,
    NgbNavModule,
    NgbModule,
    NgSelectModule,
    NumberAcceptModule,
    RouterModule.forChild(MultipleWebsitesRoute),
    EffectsModule.forFeature([MultipleWebsitesEffect,CategoriesEffect,CurrencyEffect,SellerEffects]),
    ReactiveFormsModule,
    FormsModule,
        PipeModule,
    ClipboardModule,
    ComponentsModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  ],
  providers: [
    MultipleWebsitesSandbox,
    MultipleWebsitesService,
    SellerSandbox,
    SellerService,
    CurrencySandbox,
    LanguagesSandbox,
    CategoriesSandbox,
    CategoriesService,
    CurrencyService,
   
  ]
})
export class MultipleWebsitesModule { }
