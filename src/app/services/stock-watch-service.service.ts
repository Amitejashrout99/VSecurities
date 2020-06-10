import { Injectable } from '@angular/core';


import {stock_research_dto} from '../shared/stock_research_dto';
import {stock_recommendations_dto} from '../shared/stock_recommendations_dto';


import {HttpClient,HttpHeaders} from '@angular/common/http';
import {base_url} from '../shared/baseurl';
import {map, catchError} from 'rxjs/operators';
import {ProcessHTTPerrorService} from '../services/process-httperror.service';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class StockWatchServiceService {

  constructor(private http_service_stock_watch:HttpClient,
    private error_management_service:ProcessHTTPerrorService) 
  {

  }

  getResearchDataStockWise(stock_id:number):Observable<stock_research_dto>
  {
    return this.http_service_stock_watch.get<stock_research_dto>("getStockResearchData/"+stock_id).pipe(catchError(this.error_management_service.handle_error_faced));
  }

  getRecommendationsData(stock_id:number):Observable<stock_recommendations_dto[]>
  {
    return this.http_service_stock_watch.get<stock_recommendations_dto[]>("getStockRecommendations/"+stock_id).pipe(catchError(this.error_management_service.handle_error_faced));
  }

}
