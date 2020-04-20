import { Component, OnInit } from '@angular/core';
import {StockserviceService} from '../services/stockservice.service';
import {stock_watchlist} from '../shared/stock_watchlist';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-watchlisted-stocks',
  templateUrl: './watchlisted-stocks.component.html',
  styleUrls: ['./watchlisted-stocks.component.scss']
})
export class WatchlistedStocksComponent implements OnInit {

  
  watchlisted_stocks:stock_watchlist[];
  error_message_faced:string;
  panelOpenState = false;
  constructor(private stock_service_provider: StockserviceService,
    private snack_bar:MatSnackBar) 
  { 

  }

  ngOnInit(): void 
  {
    this.stock_service_provider.getAllWatchlistedStocks()
    .subscribe((data)=> this.watchlisted_stocks=data,(err_msg)=>this.error_message_faced=err_msg);
  }


  removeFromWatchlist(particular_stock:stock_watchlist)
  {
    this.stock_service_provider.removeStockFromWatchlist(particular_stock.watchlist_id)
    .subscribe((data)=>this.snack_bar.open("Stock has been removed from watchlist",'Close',{
      duration: 5000}));

  }

}
