import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {base_url} from '../shared/baseurl';
import {stock} from '../shared/stock';
import {stock_sales} from '../shared/stock_sales';
import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {ProcessHTTPerrorService} from '../services/process-httperror.service';
import {stock_watchlist} from '../shared/stock_watchlist';


@Injectable({
  providedIn: 'root'
})

export class StockserviceService 
{

  constructor(private http_service_stock:HttpClient,
    private error_management_service:ProcessHTTPerrorService) 
  {

  }

  getAllStocksPresent():Observable<stock[]>
  {
    return this.http_service_stock.get<stock[]>(base_url+'allStocks')
    .pipe(catchError(this.error_management_service.handle_error_faced));
  }

  getParticularStock(particular_stock_id:number):Observable<stock>
  {
    return this.http_service_stock.get<stock>(base_url+'particularStock/'+particular_stock_id)
    .pipe(catchError(this.error_management_service.handle_error_faced));
  }
  
  async  getParticularStockPromise(particular_stock_id:number):Promise<stock>
  {
    return this.http_service_stock.get<stock>(base_url+'particularStock/'+particular_stock_id)
    .pipe(catchError(this.error_management_service.handle_error_faced)).toPromise();
    
  }

  addStockToWatchlist(partcular_stock:stock_watchlist)
  {
    return this.http_service_stock.post<stock_watchlist>(base_url+"addStockWatchlist",partcular_stock);
  }

  getAllWatchlistedStocks():Observable<stock_watchlist[]>
  {
    return this.http_service_stock.get<stock_watchlist[]>(base_url+"allWatchlistedStocks")
    .pipe(catchError(this.error_management_service.handle_error_faced));
  }

  getBoughtButNotSoldStocks(user_id:number):Observable<stock_sales[]>
  {
    return this.http_service_stock.get<stock_sales[]>(base_url+"getBoughtStocks/"+user_id)
    .pipe(catchError(this.error_management_service.handle_error_faced));
  }

  sellStock(transaction_id:number,sell_stock_object:stock_sales):Observable<stock_sales>
  {
    return this.http_service_stock.put<stock_sales>(base_url+"updateStockSaleData/"+transaction_id,sell_stock_object)
    .pipe(catchError(this.error_management_service.handle_error_faced));
  }

  async getParticularBoughtStockData(transaction_id:number):Promise<stock_sales>
  {
    return this.http_service_stock.get<stock_sales>(base_url+"getParticularStockSaleData/"+transaction_id)
    .pipe(catchError(this.error_management_service.handle_error_faced)).toPromise();
  }

  getAllBoughtStocks(user_id:number):Promise<stock_sales[]>
  {
    return this.http_service_stock.get<stock_sales[]>(base_url+"getAllBoughtStocks/"+user_id)
    .pipe(catchError(this.error_management_service.handle_error_faced)).toPromise();
  }

  getAllSoldStocks(user_id:number):Promise<stock_sales[]>
  {
    return this.http_service_stock.get<stock_sales[]>(base_url+"getAllSoldStocks/"+user_id)
    .pipe(catchError(this.error_management_service.handle_error_faced)).toPromise();
  }

  




  
}
