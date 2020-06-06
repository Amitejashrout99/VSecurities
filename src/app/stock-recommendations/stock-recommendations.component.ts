import { Component, OnInit } from '@angular/core';


import {StockserviceService} from '../services/stockservice.service';
import {UserloginserviceService} from '../services/userloginservice.service';
import {StockWatchServiceService} from '../services/stock-watch-service.service';

import {stock} from '../shared/stock';
import {stock_recommendations_dto} from '../shared/stock_recommendations_dto';

import { tap, switchMap, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-stock-recommendations',
  templateUrl: './stock-recommendations.component.html',
  styleUrls: ['./stock-recommendations.component.scss']
})
export class StockRecommendationsComponent implements OnInit {

  all_stocks_available:stock[]=[];
  all_stock_recommendations:stock_recommendations_dto[];
  
  all_bought_stock_ids:number[];
  current_user_id:number;
  error_message_faced:string="";
  bought_stocks_id_available_status:boolean=true;

  constructor(private stock_service_provider:StockserviceService,
    private user_service_provider:UserloginserviceService,
    private stock_watch_service_provider:StockWatchServiceService) 
  {

  }

  ngOnInit(): void 
  {
      let username= sessionStorage.getItem("username");

      this.user_service_provider.getUserId(username).pipe(

        tap((data)=>this.current_user_id=data.id),

        switchMap(()=>this.stock_service_provider.getAllBoughtStocksId(this.current_user_id)
        .pipe(catchError((err_msg)=>this.error_message_faced=err_msg))),

        tap((data)=>{

          if(this.error_message_faced==="")
          {
            this.all_bought_stock_ids=data

            if(this.all_bought_stock_ids.length==0)
            {
                this.bought_stocks_id_available_status=false;
            }
          
            if(this.bought_stocks_id_available_status)
            {
              this.all_bought_stock_ids.map((val)=>this.stock_service_provider.getParticularStock(val)
              .subscribe((data)=>this.all_stocks_available.push(data),(err_msg)=>this.error_message_faced=err_msg));
            }

            if(!this.bought_stocks_id_available_status)
            {
            this.stock_service_provider.getAllStocksPresent().subscribe((data)=>this.all_stocks_available=data,(err_msg)=>this.error_message_faced=err_msg);
            }
          }
          else
          {
            let error_code:number=+(this.error_message_faced.split("-")[0]);
            //alert(error_code);
            if(error_code===404)
            {
              this.bought_stocks_id_available_status=false;
            }
            //alert(this.bought_stocks_exist_status);
          }
          
      
        }),


        /*tap((data)=>{
          this.all_bought_stock_ids=data

          if(this.all_bought_stock_ids.length==0)
          {
            this.bought_stocks_id_available_status=false;
          }
          
          if(this.bought_stocks_id_available_status)
          {
              this.all_bought_stock_ids.map((val)=>this.stock_service_provider.getParticularStock(val)
              .subscribe((data)=>this.all_stocks_available.push(data),(err_msg)=>this.error_message_faced=err_msg));
          }

          if(!this.bought_stocks_id_available_status)
          {
            this.stock_service_provider.getAllStocksPresent().subscribe((data)=>this.all_stocks_available=data,(err_msg)=>this.error_message_faced=err_msg);
          }

        }),*/

      ).subscribe();

      
      
  }

  getRecommendations(stock_id:number)
  {
     this.stock_watch_service_provider.getRecommendationsData(stock_id).subscribe((data)=>this.all_stock_recommendations=data,(err_msg)=>this.error_message_faced=err_msg);
  }

}
