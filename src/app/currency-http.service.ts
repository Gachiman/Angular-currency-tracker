import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Currency } from './currency';

@Injectable()
export class CurrencyHttpService {

  private apiURL = 'https://api.apilayer.com/fixer/latest';
  private headers = new HttpHeaders({
    'apikey': 'GacoU5OkgTzFIvwz433aCIWaoCUPEyR5',
  });
  private params = new HttpParams()
    .set('symbols', 'USD%2CEUR%2CGBP%2CCNY%2CJPY%2CTRY')
    .set('base', 'RUB');

  constructor(private http: HttpClient) {}

  getApiCurData(): Observable<any> {
    return this.http.get(this.apiURL, {
      headers: this.headers,
      params: this.params
    }).pipe(map((data:any) => {
      return data['rates'];
    }));
  }

  updateCurData(curSet: Currency[], availableCurSet: Currency[]): void {
    this.getApiCurData().subscribe({next: (data) => {
      for (let item of curSet) {
        item.diff = item.value ? item.value - data[item.name] : 0;
        item.diff = +item.diff.toFixed(2);
        item.value = +(1 / data[item.name]).toFixed(2);
        item.diffIcon = (item.diff > 0) ? '▲' : (item.diff < 0) ? '▼' : ' ';
      }
      for (let item of availableCurSet) {
        item.diff = item.value ? item.value - data[item.name] : 0;
        item.diff = +item.diff.toFixed(2);
        item.value = +(1 / data[item.name]).toFixed(2);
        item.diffIcon = (item.diff > 0) ? '▲' : (item.diff < 0) ? '▼' : ' ';
      }
    }});
  }
}