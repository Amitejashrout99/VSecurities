import { Component, OnInit } from '@angular/core';

import {stock_sales} from '../shared/stock_sales';
import {stock} from '../shared/stock';
import {user} from '../shared/user';
import {all_sold_stocks_custom_class} from '../shared/allSoldStocksExpansion';



import {StockserviceService} from '../services/stockservice.service';
import {UserloginserviceService} from '../services/userloginservice.service';
import { tap, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-all-sold-stocks',
  templateUrl: './all-sold-stocks.component.html',
  styleUrls: ['./all-sold-stocks.component.scss']
})
export class AllSoldStocksComponent implements OnInit {

  
  current_user_object:user;
  current_user_id:number;
  error_message_faced:string;

  
  allSoldStocksArray:stock_sales[];
  SoldStockObject:stock;
  custom_sold_stocks_class_objects_array:all_sold_stocks_custom_class[]=[];
  custom_sold_stocks_class_object:all_sold_stocks_custom_class;


  profit_earned_card_value:number=0;
  profit_percent_earned:number=0.00;

  
  constructor(private stock_service_provider:StockserviceService,
    private user_service_provider:UserloginserviceService) 
  {

  }

  ngOnInit(): void 
  {
      let username= sessionStorage.getItem("username");
      //this.getCurrentUserId(username);
      
      this.user_service_provider.getUserId(username).pipe(

        tap((data)=>this.current_user_id=data.id),

        switchMap(()=>this.stock_service_provider.getAllSoldStocksObservable(this.current_user_id)
        .pipe(catchError((err)=>this.error_message_faced=err))),

        tap((data:stock_sales[])=>{
              
              this.allSoldStocksArray=data;
        
              this.allSoldStocksArray.map((val)=>this.stock_service_provider.getParticularStock(val.stock_id)
              .subscribe((data)=>{

                this.custom_sold_stocks_class_object={

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

                this.custom_sold_stocks_class_objects_array.push(this.custom_sold_stocks_class_object);

              }));
        
        
        }),


        

      ).subscribe();
  }

  /*async getCurrentUserId(user_name:string)
  {
    this.current_user_object=await this.user_service_provider.getUserIdPromise(user_name);
    this.current_user_id=this.current_user_object.id;
    //alert(this.current_user_id);

    this.allSoldStocksArray= await this.stock_service_provider.getAllSoldStocks(this.current_user_id);

    //alert(this.allBoughtStocksArray);

    this.findIndividualStockObject(this.allSoldStocksArray);

  }
  
  async findIndividualStockObject(all_sold_stocks_array:stock_sales[]) 
  {
    for(let i=0;i<all_sold_stocks_array.length;i++)
    {
      this.SoldStockObject= await this.stock_service_provider.getParticularStockPromise(all_sold_stocks_array[i].stock_id);
      
      this.custom_sold_stocks_class_object={

        "stock_sale_id":all_sold_stocks_array[i].stock_sale_id,
        "stock_buy_status":all_sold_stocks_array[i].stock_buy_status,
        "stock_sell_status":all_sold_stocks_array[i].stock_sell_status,
        "id":all_sold_stocks_array[i].id,
        "stock_id":all_sold_stocks_array[i].stock_id,
        "stock_bought_on":all_sold_stocks_array[i].stock_bought_on,
        "stock_sold_on":all_sold_stocks_array[i].stock_sold_on,
        "price_bought_for":all_sold_stocks_array[i].price_bought_for,
        "price_sold_for":all_sold_stocks_array[i].price_sold_for,
        "no_of_times_bought":all_sold_stocks_array[i].no_of_times_bought,
        "no_of_times_sold":all_sold_stocks_array[i].no_of_times_sold,
        "stock_name":this.SoldStockObject.stock_name,
        "stock_quantity":this.SoldStockObject.stock_quantity,
        "stock_value":this.SoldStockObject.stock_value,
        "stock_present_price":this.SoldStockObject.stock_present_price
      
      };

      this.custom_sold_stocks_class_objects_array.push(this.custom_sold_stocks_class_object);

    }
  }*/

  initializeValue(selected_object:all_sold_stocks_custom_class)
  {
    this.profit_earned_card_value=selected_object.price_sold_for-selected_object.price_bought_for;
    this.profit_percent_earned=(this.profit_earned_card_value/selected_object.price_bought_for)*100;
    this.profit_percent_earned=+(this.profit_percent_earned.toFixed(2));
  }
  

}
