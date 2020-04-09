import { Component, OnInit, ElementRef } from '@angular/core';



import {user} from '../shared/user';
import {stock_sales} from '../shared/stock_sales';

import {TradingDashboardServiceService} from '../services/trading-dashboard-service.service';
import {UserloginserviceService} from '../services/userloginservice.service';

import { map, switchMap, tap, catchError, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss']
})
export class TradingComponent implements OnInit {

  
  bought_price_array:number[]=[];
  selling_price_array:number[]=[];
  date_bought:string[]=[];
  current_user_object:user;
  current_user_id:number;
  error_message_faced:string;

  bought_stocks:stock_sales[];
  sold_stocks:stock_sales[];

  

  chart:any;
  
  constructor(private dashboard_data_service_provider:TradingDashboardServiceService,
    private user_service_provider:UserloginserviceService,
    private elementRef: ElementRef)
  {

  }

  ngOnInit(): void 
  {
    let username= sessionStorage.getItem("username");

    let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);

    this.user_service_provider.getUserId(username).pipe(
    
        tap((data)=>this.current_user_id=data.id),

        
        switchMap(()=>this.dashboard_data_service_provider.getAllBoughtStocks(this.current_user_id)
        .pipe(catchError((err_msg)=>this.error_message_faced=err_msg))),

        tap((data:stock_sales[])=>this.bought_stocks=data),

        switchMap(()=>this.bought_stocks.map((val)=>{
          this.bought_price_array.push(val.price_bought_for),
          this.selling_price_array.push(val.price_sold_for),
          this.date_bought.push(val.stock_bought_on)
        }))
    
    ).subscribe();
      
    /*this.chart = new Chart(htmlRef, {
      type: 'line',
      data: {
        labels: this.date_bought,
        datasets: [
          {
            data: this.bought_price_array,
            borderColor: '#3cba9f',
            fill: false
          },
          {
            data: this.selling_price_array,
            borderColor: '#ffcc00',
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }]
        }
      }
    })*/

    //var ctx = document.getElementById('canvas');
    


  }

}
