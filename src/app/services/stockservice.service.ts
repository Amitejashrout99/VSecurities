import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpResponse} from '@angular/common/http';
import {base_url} from '../shared/baseurl';


import {stock} from '../shared/stock';
import {stock_sales} from '../shared/stock_sales';
import {stock_reviews} from '../shared/stock_reviews';
import {stock_watchlist} from '../shared/stock_watchlist';
import {user_pending_reviews_track} from '../shared/userPendingReviewTrack';

import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {ProcessHTTPerrorService} from '../services/process-httperror.service';



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

  async checkWatchlistStatus(stock_id:number):Promise<stock_watchlist>
  {
    return this.http_service_stock.get<stock_watchlist>(base_url+"checkWatchListStatus/"+stock_id)
    .pipe(catchError(this.error_management_service.handle_error_faced)).toPromise();
  }

  removeStockFromWatchlist(watchlist_id:number):Observable<string>
  {
    return this.http_service_stock.delete<string>(base_url+"deleteWatchlistedStock/"+watchlist_id)
    .pipe(catchError(this.error_management_service.handle_error_faced));
  }


  getBoughtButNotSoldStocks(user_id:number):Observable<HttpResponse<stock_sales[]>>
  {
    return this.http_service_stock.get<stock_sales[]>(base_url+"getBoughtStocks/"+user_id,{observe:'response'})
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

  getAllBoughtStocks(user_id:number):Observable<HttpResponse<stock_sales[]>>
  {
    return this.http_service_stock.get<stock_sales[]>(base_url+"getAllBoughtStocks/"+user_id,{observe:'response'})
    .pipe(catchError(this.error_management_service.handle_error_faced));
  }

  getAllSoldStocks(user_id:number):Observable<HttpResponse<stock_sales[]>>
  {
    return this.http_service_stock.get<stock_sales[]>(base_url+"getAllSoldStocks/"+user_id,{observe:'response'})
    .pipe(catchError(this.error_management_service.handle_error_faced));
  }


  getAllBoughtStocksId(user_id:number):Observable<number[]|any>
  {
    return this.http_service_stock.get<stock_sales[]>(base_url+"getAllBoughtStocks/"+user_id)
    .pipe(map(stocks=>stocks.map(stock=>stock.stock_id))).pipe(catchError(this.error_management_service.handle_error_faced));
  }

  getAllBoughtStocksReviews(bought_stocks_ids:number[]):Observable<stock_reviews[]>
  {
    return this.http_service_stock.get<stock_reviews[]>(base_url+"BoughtStockReviews/"+bought_stocks_ids)
    .pipe(catchError(this.error_management_service.handle_error_faced));
  }

  getPendingReviewsStockIds(bought_stock_ids:number[],user_id:number):Observable<number[]>
  {
    return this.http_service_stock.get<number[]>(base_url+"getPendingReviewsForUser/"+user_id+"/"+bought_stock_ids)
    .pipe(catchError(this.error_management_service.handle_error_faced));
    
  }

  postBoughtStockPeronalReview(bought_stock_review:stock_reviews):Observable<stock_reviews>
  {
    return this.http_service_stock.post<stock_reviews>(base_url+"submitStockReview",bought_stock_review)
    .pipe(catchError(this.error_management_service.handle_error_faced));
  }

  postUserReviewTrack(user_review_data:user_pending_reviews_track):Observable<user_pending_reviews_track>
  {
    return this.http_service_stock.post<user_pending_reviews_track>(base_url+"insertStockReviewTrackData",user_review_data)
    .pipe(catchError(this.error_management_service.handle_error_faced));
  }
  
  
}
