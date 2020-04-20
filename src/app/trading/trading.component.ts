import { Component, OnInit, ElementRef } from '@angular/core';

import {Chart} from 'chart.js';

import {user} from '../shared/user';
import {stock_sales} from '../shared/stock_sales';

import {TradingDashboardServiceService} from '../services/trading-dashboard-service.service';
import {UserloginserviceService} from '../services/userloginservice.service';

import { map, switchMap, tap, catchError, mergeMap } from 'rxjs/operators';
import { stock } from '../shared/stock';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss']
})
export class TradingComponent implements OnInit {

  
  bought_price_array:number[]=[];
  selling_price_array:number[]=[];
  profit_array:number[]=[];
  date_bought:string[]=[];
  date_sold:string[]=[];
  stock_names_array:string[]=[];
  stock_object:stock;
  all_stock_ids:number[];
  current_user_object:user;
  current_user_id:number;
  error_message_faced:string;

  bought_stocks:stock_sales[];
  sold_stocks:stock_sales[];

  LineChart=[];
  BarChart=[];
  PieChart=[];
  color_array:any[]=[];

  
  constructor(private dashboard_data_service_provider:TradingDashboardServiceService,
    private user_service_provider:UserloginserviceService,
    private elementRef: ElementRef)
  {

  }

  dynamicColors() 
  {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
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
          this.date_bought.push(val.stock_bought_on),
          this.date_sold.push(val.stock_sold_on)
          if(val.price_sold_for-val.price_bought_for>0)
          {
            this.profit_array.push(val.price_sold_for-val.price_bought_for);
          }
        })),

        switchMap(()=>this.dashboard_data_service_provider.getAllBoughtStocksId(this.current_user_id)
        .pipe(catchError((err_msg)=>this.error_message_faced=err_msg))),

        tap((data)=>this.all_stock_ids=data),

        switchMap(()=>this.all_stock_ids.map((val)=>this.dashboard_data_service_provider.getParticularStock(val)
        .subscribe((data)=>{
          this.stock_object=data;
          this.stock_names_array.push(this.stock_object.stock_name);
          this.color_array.push(this.dynamicColors());
        })))

      
    
    ).subscribe();
      
    
    
    this.LineChart = new Chart('lineChartCP', {
      type: 'line',
    data: {
     labels: this.date_bought,
     datasets: [{
      data: this.bought_price_array,
      borderColor: '#3cba9f',
      fill: false
    }]
    }, 
    options: {
      responsive:true,
      maintainAspectRatio: false,
      title:{
        text:"Amount you have spent in buying stocks",
        display:true
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Date on which the Stock were bought',
            
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Price Paid to buy the stocks in INR'
          }
        }]
      }
    }
    });

    this.LineChart = new Chart('lineChartSP', {
      type: 'line',
    data: {
     labels: this.date_sold,
     datasets: [{
      data: this.selling_price_array,
      borderColor: '#de1b1b',
      fill: false
    }]
    }, 
    options: {
      responsive:true,
      maintainAspectRatio: false,
      title:{
        text:"Amount you have earnt by selling stocks",
        display:true
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Date on which the Stock were sold',
            
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Price earned by selling the stocks in INR'
          }
        }]
      }
    }
    });

    this.LineChart = new Chart('lineChartCompareCPSP', {
      type: 'line',
    data: {
     labels:this.date_bought,
     datasets: [{
      data: this.bought_price_array,
      borderColor: '#3cba9f',
      fill: true
    },
    {
      data: this.selling_price_array,
      borderColor: '#de1b1b',
      fill: true
    }]
    }, 
    options: {
      responsive:true,
      maintainAspectRatio: false,
      title:{
        text:"Money Invested(Green)/Money Earned(Red)(Date Wise)",
        display:true
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Date',
            
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Price of the stocks in INR'
          }
        }]
      }
    }
    });


    this.LineChart = new Chart('lineChartComparePriceStock', {
      type: 'line',
    data: {
     labels:this.stock_names_array,
     datasets: [{
      data: this.bought_price_array,
      borderColor: '#3cba9f',
      fill: true
    },
    {
      data: this.selling_price_array,
      borderColor: '#de1b1b',
      fill: true
    }]
    }, 
    options: {
      responsive:true,
      maintainAspectRatio: false,
      title:{
        text:"Money Invested(Green)/Money Earned(Red)(Stock Wise)",
        display:true
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Stock Name',
            
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Price of the stocks in INR'
          }
        }]
      }
    }
    });

    this.BarChart = new Chart('barChartPerStock', {
      type: 'bar',
    data: {
     labels: this.stock_names_array,
     datasets: [{
      data: this.profit_array,
      backgroundColor: '#1b28de',
      fill: false
    }]
    }, 
    options: {
      responsive:true,
      maintainAspectRatio: false,
      title:{
        text:"Profit Earnt so far",
        display:true
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Stock Name',
            
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Profit earned in INR'
          }
        }]
      }
    }
    });
    

    this.PieChart = new Chart('pieChartInvestment', {
      type: 'pie',
    data: {
     labels: this.stock_names_array,
     datasets: [{
      data: this.bought_price_array,
      backgroundColor:this.color_array,
      borderColor:this.color_array,
      borderWidth: 1,
      fill: false
    }]
    }, 
    options: {
      responsive:true,
      maintainAspectRatio: false,
      title:{
        text:"Investment made in each Stock",
        display:true
      },
      legend: {
        display: true
      }
    }
    });

    


  }

}
