import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Currency } from './currency';
import { CurrencyHttpService } from './currency-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [CurrencyHttpService]
})
export class AppComponent {

  currenciesSet: Currency[] = [
    new Currency('USD'),
    new Currency('EUR'),
    new Currency('GBP')
  ];
  availableCurrenciesSet: Currency[] = [
    new Currency('CNY'),
    new Currency('JPY'),
    new Currency('TRY')
  ];
  
  constructor( private matIconRegistry: MatIconRegistry,
               private domSanitaizer: DomSanitizer,
               private curHttpService: CurrencyHttpService) {
    this.matIconRegistry.addSvgIcon(
      `icon_label`,
      this.domSanitaizer.bypassSecurityTrustResourceUrl('../assets/plus-svgrepo-com.svg')
    );
  }

  /*ngOnInit() {
    this.curHttpService.updateCurData(this.currenciesSet, this.availableCurrenciesSet);
    setInterval(() => {
      this.curHttpService.updateCurData(this.currenciesSet, this.availableCurrenciesSet);
    }, 5000);  // I'm sure I should increase time interval from 5sec to ~20 - 30
  }*/

  addCurrenciesSet(index: number): void {
    this.currenciesSet.push(this.availableCurrenciesSet.splice(index, 1)[0]);
  }

  delCurrenciesSet(index: number): void {
    this.availableCurrenciesSet.push(this.currenciesSet.splice(index, 1)[0]);
  }

  refreshCurrencies() {
    this.curHttpService.updateCurData(this.currenciesSet, this.availableCurrenciesSet);
  }
}

