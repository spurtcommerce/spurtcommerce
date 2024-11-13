import { NgModule } from '@angular/core';
import { FilterPipe } from './category-search.pipe';
import { CustomCurrencyPipe } from './currency-symbol.pipe';
import { CurrencyPipe, CommonModule } from '@angular/common';


@NgModule({
    imports:        [CommonModule],
    declarations:   [CustomCurrencyPipe],
    exports:        [CommonModule, CustomCurrencyPipe,]
})

export class CurrencyPipeModule {

  static forRoot() {
     return {
         ngModule: CurrencyPipeModule,
         providers: [],
     };
  }
}
