import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Currency } from '../currency';


@Component({
  selector: 'currency-header',
  templateUrl: './currency-header.component.html',
  styleUrls: ['./currency-header.component.less']
})
export class CurrencyHeaderComponent {
  @Output()
  currencyAdded: EventEmitter<number> = new EventEmitter();

  @Input()
  availableCurrenciesSet: Currency[] = [];

  currentDateTime: Date = new Date();

  constructor() {
    setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);
  }
  
  addCurrency(index: number): void {
    this.currencyAdded.emit(index);
  }
}
