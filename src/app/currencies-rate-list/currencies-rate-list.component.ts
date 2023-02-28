import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Currency } from '../currency';


@Component({
  selector: 'currencies-rate-list',
  templateUrl: './currencies-rate-list.component.html',
  styleUrls: ['./currencies-rate-list.component.less']
})
export class CurrenciesRateListComponent {
  @Output()
  currencyDeleted: EventEmitter<number> = new EventEmitter();

  @Input()
  currenciesSet: Currency[] = [];

  deleteCurrency(index: number): void {
    this.currencyDeleted.emit(index);
  }

}
