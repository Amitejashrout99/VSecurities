import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {base_url} from '../shared/baseurl';

import {stock_sales} from '../shared/stock_sales';
import{stock} from '../shared/stock';

import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {ProcessHTTPerrorService} from '../services/process-httperror.service';

@Injectable({
  providedIn: 'root'
})
export class TradingDashboardServiceService {

  constructor(private http_service_stock:HttpClient,
    private error_management_service:ProcessHTTPerrorService) 
  {

  }

  getAllBoughtStocks(user_id:number):Observable<stock_sales[]>
  {
    return this.http_service_stock.get<stock_sales[]>("getAllBoughtStocks/"+user_id)
    .pipe(catchError(this.error_management_service.handle_error_faced));
  }

  getAllSoldStocks(user_id:number):Observable<stock_sales[]>
  {
    return this.http_service_stock.get<stock_sales[]>("getAllSoldStocks/"+user_id)
    .pipe(catchError(this.error_management_service.handle_error_faced));
  }

  getAllBoughtStocksId(user_id:number):Observable<number[]|any>
  {
    return this.http_service_stock.get<stock_sales[]>("getAllBoughtStocks/"+user_id)
    .pipe(map(stocks=>stocks.map(stock=>stock.stock_id))).pipe(catchError(this.error_management_service.handle_error_faced));
  }

  getParticularStock(particular_stock_id:number):Observable<stock>
  {
    return this.http_service_stock.get<stock>('particularStock/'+particular_stock_id)
    .pipe(catchError(this.error_management_service.handle_error_faced));
  }
}
