import { Component, OnInit } from '@angular/core';
import {stock} from '../shared/stock';
import {StockserviceService} from '../services/stockservice.service';
import {UserloginserviceService} from '../services/userloginservice.service';
import {user} from '../shared/user';
import {stock_watchlist} from '../shared/stock_watchlist';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-stock-menu',
  templateUrl: './stock-menu.component.html',
  styleUrls: ['./stock-menu.component.scss']
})
export class StockMenuComponent implements OnInit {

  stocks:stock[];
  error_message_faced:string;
  current_user_object:user;
  stock_watchlist_object:stock_watchlist;
  stock_to_be_added_to_watchlist:stock;

  constructor(private stock_service_available: StockserviceService,
    private user_service_available:UserloginserviceService,
    private snack_bar: MatSnackBar) 
  {

  }

  ngOnInit(): void 
  {
      this.stock_service_available.getAllStocksPresent().subscribe((all_stocks)=>this.stocks=all_stocks,
      (err_msg)=>this.error_message_faced=err_msg);

      let username= sessionStorage.getItem("username");
      
      this.user_service_available.getUserId(username).subscribe((data)=>this.current_user_object=data,
      (err_msg)=>this.error_message_faced=err_msg);

  }

  async addToWatchList(particular_stock_id:number)
  {
    //alert(particular_stock_id +" "+ this.current_user_object.id);
    this.stock_to_be_added_to_watchlist= await this.stock_service_available.getParticularStockPromise(particular_stock_id);

    this.stock_watchlist_object=
    {
      "watchlist_id":Math.random()*100,
      "stock_id":this.stock_to_be_added_to_watchlist.stock_id,
      "stock_name":this.stock_to_be_added_to_watchlist.stock_name,
      "stock_quantity":this.stock_to_be_added_to_watchlist.stock_quantity,
      "stock_value":this.stock_to_be_added_to_watchlist.stock_value,
      "stock_present_price":this.stock_to_be_added_to_watchlist.stock_present_price,
      "id":this.current_user_object.id
    };

    this.stock_service_available.addStockToWatchlist(this.stock_watchlist_object).subscribe(
      (data)=>this.snack_bar.open("Item Added to Watchlist",'Close', {
        duration: 5000}))

  }

}
