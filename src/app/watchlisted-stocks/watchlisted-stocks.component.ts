import { Component, OnInit } from '@angular/core';
import {StockserviceService} from '../services/stockservice.service';
import {stock_watchlist} from '../shared/stock_watchlist';


@Component({
  selector: 'app-watchlisted-stocks',
  templateUrl: './watchlisted-stocks.component.html',
  styleUrls: ['./watchlisted-stocks.component.scss']
})
export class WatchlistedStocksComponent implements OnInit {

  
  watchlisted_stocks:stock_watchlist[];
  error_message_faced:string;
  panelOpenState = false;
  constructor(private stock_service_provider: StockserviceService) 
  { 

  }

  ngOnInit(): void 
  {
    this.stock_service_provider.getAllWatchlistedStocks()
    .subscribe((data)=> this.watchlisted_stocks=data,(err_msg)=>this.error_message_faced=err_msg);
  }

}
