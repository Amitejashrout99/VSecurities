import { Component, OnInit } from '@angular/core';
import {StockserviceService} from '../services/stockservice.service';
import {MatSnackBar} from '@angular/material/snack-bar';

import {stock_sales} from '../shared/stock_sales';
import {stock} from '../shared/stock';
import {user} from '../shared/user';
import {stock_sale_expansion_object} from '../shared/saleStockExpansion';

import {UserloginserviceService} from '../services/userloginservice.service';
import {ProcessHTTPerrorService} from '../services/process-httperror.service';



@Component({
  selector: 'app-sell-bought-stocks',
  templateUrl: './sell-bought-stocks.component.html',
  styleUrls: ['./sell-bought-stocks.component.scss']
})
export class SellBoughtStocksComponent implements OnInit {

  bought_stocks:stock_sales[];
  bought_stocks_session_array:stock_sales[];
  current_user_object:user;
  bought_stock_objects:stock[]=[];
  bought_stock_object:stock;
  stock_sale_exansion_array:stock_sale_expansion_object[]=[];
  stock_sale_expansion:stock_sale_expansion_object;
  particular_bought_data_object:stock_sales;
  sellingStock_object:stock_sales;
  
  
  error_message_faced:string;
  current_user_id:number;
  current_selling_price_message_status:boolean=false;
  current_selling_price_message:string="Click on Calculate Selling Price to view the Selling price"
  current_selling_price_value:number=0;


  total_brokerage_stock:number=0;
  stt_total:number=128;
  stamp_duty:number=50;
  gst:number=0;
  transaction_charges:number=0.009;
  
  initial_sell_count=1;
  times_bought:number;
  display_status:boolean=true;
  display_status_minus:boolean=true;
  regulation_message:string="Stock Limit reached";
  stocks_bought_for:number=0;
  stocks_sold_for:number=0;
  selling_price_of_stocks:number=0; // to be sent to the function that calculates the brokerage fees
  
  constructor(private stock_service_provider:StockserviceService,
    private user_service_provider:UserloginserviceService,
    private snack_bar:MatSnackBar)
  {

  }

  ngOnInit(): void 
  {
    let username= sessionStorage.getItem("username");
    this.getCurrentUserId(username);
    
  }

  resetValues()
  {
    this.current_selling_price_message_status=false;
    this.current_selling_price_value=0;
    this.display_status=true;
    this.display_status_minus=true;
    this.initial_sell_count=1;
  }

  async getCurrentUserId(user_name:string)
  {
    this.current_user_object= await this.user_service_provider.getUserIdPromise(user_name);
    this.current_user_id=this.current_user_object.id;

    this.stock_service_provider.getBoughtButNotSoldStocks(this.current_user_id)
    .subscribe((data)=>{
      this.bought_stocks=data
      sessionStorage.setItem("allBought",JSON.stringify(data));
    },
    (err_msg)=>this.error_message_faced=err_msg);

    this.getStockItems();

  }

  async getStockItems()
  {
      let items=sessionStorage.getItem("allBought");


      this.bought_stocks_session_array=JSON.parse(items);

      //alert(this.bought_stocks_session_array);

      for(let i=0;i<this.bought_stocks_session_array.length;i++)
      {
        this.bought_stock_object= await this.stock_service_provider.getParticularStockPromise(this.bought_stocks_session_array[i].stock_id);
        //this.bought_stock_objects.push(this.bought_stock_object);

        this.stock_sale_expansion={
            "id":this.bought_stock_object.id,
            "price_bought_for":this.bought_stocks_session_array[i].price_bought_for,
            "stock_bought_on":this.bought_stocks_session_array[i].stock_bought_on,
            "stock_buy_status":this.bought_stocks_session_array[i].stock_buy_status,
            "stock_id":this.bought_stock_object.stock_id,
            "stock_name":this.bought_stock_object.stock_name,
            "stock_present_price":this.bought_stock_object.stock_present_price,
            "no_of_times_bought":this.bought_stocks_session_array[i].no_of_times_bought,
            "no_of_times_sold":this.bought_stocks_session_array[i].no_of_times_sold,
            "stock_sale_id":this.bought_stocks_session_array[i].stock_sale_id,
            "stock_value":this.bought_stock_object.stock_present_price
        };

        this.stock_sale_exansion_array.push(this.stock_sale_expansion);

      }

  }
  
  
  calculateBrokerageFees(current_sp:number,cp_of_stocks:number,no_of_stock:number)
  {
    this.total_brokerage_stock=((cp_of_stocks*no_of_stock)+(current_sp*no_of_stock))/10000;
    this.transaction_charges=(this.transaction_charges*this.total_brokerage_stock)/100;
    this.transaction_charges=+(this.transaction_charges.toFixed(2));
    this.gst=((this.total_brokerage_stock+this.transaction_charges)*18)/100;
    this.gst=+(this.gst.toFixed(2));
    this.current_selling_price_value=current_sp+(this.total_brokerage_stock+this.transaction_charges+this.gst+this.stt_total+this.stamp_duty);

  }
  
  
  showSellDiv(no_times_bought:number,no_of_times_sold:number,cp_of_stocks:number,sp_of_stocks:number)
  {
    this.current_selling_price_message_status=true;
    this.stocks_bought_for=cp_of_stocks;
    this.stocks_sold_for=sp_of_stocks;
    this.times_bought=no_times_bought-no_of_times_sold;

    this.checkCount();

    this.selling_price_of_stocks=this.initial_sell_count*this.stocks_sold_for;

    this.calculateBrokerageFees(this.selling_price_of_stocks,this.stocks_bought_for,this.times_bought);

  }

  /*calculateBrokerageFees(total_fees:number)
  {
    this.total_brokerage_stock=total_fees/10000;
    this.gst=((this.total_brokerage_fees+(this.transaction_charges*total_fees)/100)*18)/100;
    this.gst=+(this.gst.toFixed(2));
    this.total_brokerage_fees=this.total_brokerage_stock+this.stt_total+this.stamp_duty+this.gst+(this.transaction_charges*total_fees)/100;
    this.gross_price_value=this.total_brokerage_fees+this.total_brokerage_fees;
    
  }*/

  increaseCount()
  {
    this.initial_sell_count+=1;
    this.checkCount();

    this.selling_price_of_stocks=this.initial_sell_count*this.stocks_sold_for;

    this.calculateBrokerageFees(this.selling_price_of_stocks,this.stocks_bought_for,this.times_bought);

  }

  checkCount()
  {
    
    if(this.initial_sell_count==this.times_bought)
    {
      this.display_status=false;
        //this.initial_sell_count-=1;
        this.snack_bar.open(this.regulation_message,'Close', {
          duration: 5000}); 
    }
    
    if(this.initial_sell_count>=this.times_bought)
    {
        this.display_status=false;
        //this.initial_sell_count-=1;
        this.snack_bar.open(this.regulation_message,'Close', {
          duration: 5000});
    }
    if(this.initial_sell_count<0)
    {
      this.display_status_minus=false;
      this.initial_sell_count+=1;
      this.snack_bar.open("Stock Count can't be less than 0",'Close', {
        duration: 5000});
    }
    if(this.initial_sell_count>0)
    {
      this.display_status_minus=true;
    }

  }

  decreaseCount()
  {
    if(this.initial_sell_count>=this.times_bought)
    {
      this.display_status=true;
      this.initial_sell_count-=1;

      this.selling_price_of_stocks=this.initial_sell_count*this.stocks_sold_for;
      //this.total_price_of_stocks-=this.particular_stock.stock_present_price;

      this.calculateBrokerageFees(this.selling_price_of_stocks,this.stocks_bought_for,this.times_bought);
    }
    else{
      this.initial_sell_count-=1;
      this.checkCount();
      this.selling_price_of_stocks=this.initial_sell_count*this.stocks_sold_for;
      //this.total_price_of_stocks-=this.particular_stock.stock_present_price;

      this.calculateBrokerageFees(this.selling_price_of_stocks,this.stocks_bought_for,this.times_bought);

    }
  }


  async sellStock(price_sold_for:number,transaction_id:number,sell_count:number)
  {
    //alert(price_sold_for+" "+transaction_id+" "+sell_count);
    this.particular_bought_data_object= await this.stock_service_provider.getParticularBoughtStockData(transaction_id);

    //alert(this.particular_bought_data_object);
    
    let date_time= new Date();
    let day= date_time.getDate();
    let month=date_time.getMonth();
    let year= date_time.getFullYear();

    let date= day+"/"+(month+1)+"/"+year;
    
    //alert(date);
    
    
    this.sellingStock_object={
      "stock_sale_id":this.particular_bought_data_object.stock_sale_id,
      "stock_buy_status":this.particular_bought_data_object.stock_buy_status,
      "stock_sell_status":this.particular_bought_data_object.stock_sell_status,
      "id":this.particular_bought_data_object.id,
      "stock_id":this.particular_bought_data_object.stock_id,
      "stock_bought_on":this.particular_bought_data_object.stock_bought_on,
      "stock_sold_on":date,
      "price_bought_for":this.particular_bought_data_object.price_bought_for,
      "price_sold_for": this.particular_bought_data_object.price_sold_for+ price_sold_for,
      "no_of_times_bought":this.particular_bought_data_object.no_of_times_bought,
      "no_of_times_sold": this.particular_bought_data_object.no_of_times_sold+sell_count

    };

    //alert(this.sellingStock_object);

    this.stock_service_provider.sellStock(transaction_id,this.sellingStock_object)
    .subscribe((data)=>this.snack_bar.open("Stock Sold for"+" "+data.price_sold_for,'Close', {
      duration: 5000}),(err_msg)=>this.error_message_faced=err_msg);


    window.location.reload();
  
  }

}
