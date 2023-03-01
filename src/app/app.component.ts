import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { takeUntil } from 'rxjs';
import { Currency } from './currency';
import { CurrencyHttpService } from './currency-http.service';
import { RxUnsubscribe } from './rx-unsubscribe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CurrencyHttpService]
})
export class AppComponent extends RxUnsubscribe {

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
               private curHttpService: CurrencyHttpService) {
    super();

    // Uncomment code below to initialize and set interval
    // this.initialInterval();
  }

  initialInterval(): void {
    this.refreshCurrencies();
    setInterval(() => {
      this.refreshCurrencies();
    }, 5000);
  }

  addCurrenciesSet(index: number): void {
    this.currenciesSet.push(this.availableCurrenciesSet.splice(index, 1)[0]);
  }

  delCurrenciesSet(index: number): void {
    this.availableCurrenciesSet.push(this.currenciesSet.splice(index, 1)[0]);
  }

  refreshCurrencies() {
    this.curHttpService.getApiCurData().pipe(takeUntil(this.destroy$)).subscribe({next: (data) => {
      for (let item of this.currenciesSet) {
        let oldValue: number = item.value;
        item.value = +(1 / data[item.name]).toFixed(2);
        item.diff = oldValue ? item.value - oldValue : 0;
        item.diff = +item.diff.toFixed(2);
        item.diffIcon = (item.diff > 0) ? '▲' : (item.diff < 0) ? '▼' : ' ';
      }
      for (let item of this.availableCurrenciesSet) {
        let oldValue: number = item.value;
        item.value = +(1 / data[item.name]).toFixed(2);
        item.diff = oldValue ? item.value - oldValue : 0;
        item.diff = +item.diff.toFixed(2);
        item.diffIcon = (item.diff > 0) ? '▲' : (item.diff < 0) ? '▼' : ' ';
      }
    }});
  }
}

