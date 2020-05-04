import { Component, OnInit } from '@angular/core';
import {MatBottomSheet,MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {StockResearchDetailsComponent} from '../stock-research-details/stock-research-details.component';

import {stock} from '../shared/stock';
import {user} from '../shared/user';

import {UserloginserviceService} from '../services/userloginservice.service';
import {StockserviceService} from '../services/stockservice.service';

import {Observable, Subscription, timer} from 'rxjs';
import {map, startWith, switchMap, catchError, tap} from 'rxjs/operators';

@Component({
  selector: 'app-stock-watch-dashboard',
  templateUrl: './stock-watch-dashboard.component.html',
  styleUrls: ['./stock-watch-dashboard.component.scss']
})
export class StockWatchDashboardComponent implements OnInit {

  current_user_id:number;
  all_stocks_available:stock[];
  error_message_faced:string;
  
  constructor(private user_service_provider:UserloginserviceService,
    private stock_service_provider:StockserviceService,
    private stock_research_details_sheet: MatBottomSheet) 
  {

  }

  ngOnInit(): void 
  {
    let username= sessionStorage.getItem("username");

    this.stock_service_provider.getAllStocksPresent()
    .subscribe((data)=>this.all_stocks_available=data,(err_msg)=>this.error_message_faced=err_msg);

  }

  displayResearchData(stock_id:number,stock_name:string)
  {
    this.stock_research_details_sheet.open(StockResearchDetailsComponent,{data:{stock_id_selected:stock_id,selected_stock_name:stock_name}});
  }

}
