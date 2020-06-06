import { Component, OnInit } from '@angular/core';


import {stock_sales} from '../shared/stock_sales';
import {stock} from '../shared/stock';
import {user} from '../shared/user';
import {all_bought_stocks_expansion} from '../shared/allBoughtStocksExpansion'

import {MatSnackBar} from '@angular/material/snack-bar';

import {StockserviceService} from '../services/stockservice.service';
import {UserloginserviceService} from '../services/userloginservice.service';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-all-bought-stocks',
  templateUrl: './all-bought-stocks.component.html',
  styleUrls: ['./all-bought-stocks.component.scss']
})
export class AllBoughtStocksComponent implements OnInit {

  current_user_id:number=0;
  error_message_faced:string="";
  
  current_user_object:user;

  bought_stock_record_exists:boolean=true;

  allBoughtStocksArray:stock_sales[];
  allBoughtStocks_session_array:stock_sales[];
  stock_details_array:stock[]=[];
  stock_detail_object:stock;
  all_bought_stocks_expansion_array:all_bought_stocks_expansion[]=[];
  all_bought_stock_object:all_bought_stocks_expansion;

  profit_earned_card_value:number=0;
  profit_percent_earned:number=0.00;
  isStockSold:boolean=false;
  
  
  constructor(private stock_service_provider:StockserviceService,
    private user_service_provider:UserloginserviceService,
    private snack_bar:MatSnackBar) 
  {

  }

  ngOnInit(): void 
  {
    let username= sessionStorage.getItem("username");

    this.user_service_provider.getUserId(username).pipe(

      tap((data)=>this.current_user_object=data),

      switchMap(()=>this.stock_service_provider.getAllBoughtStocks(this.current_user_object.id)
      .pipe(catchError((err_msg)=>this.error_message_faced=err_msg))),

      tap((data:HttpResponse<stock_sales[]>)=>{


        if(this.error_message_faced==="" && data.status===200)
        {
          this.allBoughtStocksArray=data.body
          this.allBoughtStocksArray.map((val)=>{

            this.stock_service_provider.getParticularStock(val.stock_id).subscribe((data)=>{

            this.all_bought_stock_object={

              "stock_sale_id":val.stock_sale_id,
              "stock_buy_status":val.stock_buy_status,
              "stock_sell_status":val.stock_sell_status,
              "id":val.id,
              "stock_id":val.stock_id,
              "stock_bought_on":val.stock_bought_on,
              "stock_sold_on":val.stock_sold_on,
              "price_bought_for":val.price_bought_for,
              "price_sold_for":val.price_sold_for,
              "no_of_times_bought":val.no_of_times_bought,
              "no_of_times_sold":val.no_of_times_sold,
              "stock_name":data.stock_name,
              "stock_quantity":data.stock_quantity,
              "stock_value":data.stock_value,
              "stock_present_price":data.stock_present_price
      
             };

             this.all_bought_stocks_expansion_array.push(this.all_bought_stock_object);

            })

          });
        }
        else
        {
          let error_code:number=+(this.error_message_faced.split("-")[0]);
          //alert(error_code);
          if(error_code===404)
          {
            this.bought_stock_record_exists=false;
          }
        }
        

      }),
    
    ).subscribe();

  }

  /*async getCurrentUserId(user_name:string)
  {
    this.current_user_object=await this.user_service_provider.getUserIdPromise(user_name);
    this.current_user_id=this.current_user_object.id;
    //alert(this.current_user_id);

    this.allBoughtStocksArray= await this.stock_service_provider.getAllBoughtStocks(this.current_user_id);

    //alert(this.allBoughtStocksArray);

    this.findIndividualStockObject(this.allBoughtStocksArray);

  }

  async findIndividualStockObject(bought_stocks_array:stock_sales[])
  {
     for(let i=0;i<bought_stocks_array.length;i++)
     {
       this.stock_detail_object= await this.stock_service_provider.getParticularStockPromise(bought_stocks_array[i].stock_id); 
       
       this.all_bought_stock_object={

        "stock_sale_id":bought_stocks_array[i].stock_sale_id,
        "stock_buy_status":bought_stocks_array[i].stock_buy_status,
        "stock_sell_status":bought_stocks_array[i].stock_sell_status,
        "id":bought_stocks_array[i].id,
        "stock_id":bought_stocks_array[i].stock_id,
        "stock_bought_on":bought_stocks_array[i].stock_bought_on,
        "stock_sold_on":bought_stocks_array[i].stock_sold_on,
        "price_bought_for":bought_stocks_array[i].price_bought_for,
        "price_sold_for":bought_stocks_array[i].price_sold_for,
        "no_of_times_bought":bought_stocks_array[i].no_of_times_bought,
        "no_of_times_sold":bought_stocks_array[i].no_of_times_sold,
        "stock_name":this.stock_detail_object.stock_name,
        "stock_quantity":this.stock_detail_object.stock_quantity,
        "stock_value":this.stock_detail_object.stock_value,
        "stock_present_price":this.stock_detail_object.stock_present_price

       };

       this.all_bought_stocks_expansion_array.push(this.all_bought_stock_object);
    }

  }*/

  initializeValue(selected_object:all_bought_stocks_expansion)
  {
  
    
    this.profit_earned_card_value=selected_object.price_sold_for-selected_object.price_bought_for;
    this.profit_percent_earned=(this.profit_earned_card_value/selected_object.price_bought_for)*100;
    this.profit_percent_earned=+(this.profit_percent_earned.toFixed(2));

    if(selected_object.price_sold_for==0 || this.profit_earned_card_value<0)
    {
      this.isStockSold=true;
    }

  }

  resetValues()
  {
    this.isStockSold=false;
  }

}
