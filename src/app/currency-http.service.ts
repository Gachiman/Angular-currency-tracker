import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Currency } from './currency';

@Injectable()
export class CurrencyHttpService {

  private apiURL = 'https://api.apilayer.com/exchangerates_data/latest';
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
}