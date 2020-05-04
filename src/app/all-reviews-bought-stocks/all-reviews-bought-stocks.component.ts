import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import {MatSnackBar} from '@angular/material/snack-bar';

import {user} from '../shared/user';
import {stock} from '../shared/stock'
import {stock_reviews} from '../shared/stock_reviews';
import {stock_review_custom_class} from '../shared/BoughtStockReviewClass';


import {StockserviceService} from '../services/stockservice.service';
import {UserloginserviceService} from '../services/userloginservice.service';
import { map, switchMap, tap, catchError, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs/internal/observable/from';


@Component({
  selector: 'app-all-reviews-bought-stocks',
  templateUrl: './all-reviews-bought-stocks.component.html',
  styleUrls: ['./all-reviews-bought-stocks.component.scss']
})
export class AllReviewsBoughtStocksComponent implements OnInit {

  
  current_user_object:user;
  current_user_id:number;
  current_stock_name:string;
  bought_stocks_id:number[]=[];
  available_reviews_bought_stocks_id:number[];
  //bought_stock_object:stock;
  //bought_stocks_details:stock[]=[];
  boughtStockReviews:stock_reviews[];
  user_id_reviews:number[]=[];
  all_bought_stock_reviews:stock_review_custom_class[]=[];
  bought_stock_review:stock_review_custom_class;
  error_message_faced:string;
  display_review_status:boolean=true;

  
  constructor(private stock_service_provider:StockserviceService,
    private user_service_provider:UserloginserviceService,
    private snack_bar:MatSnackBar)
  { 

  }

  ngOnInit(): void 
  {
    let username= sessionStorage.getItem("username");


    this.user_service_provider.getUserId(username).pipe(
      tap(data=>this.current_user_id=data.id),
      
      switchMap(()=>this.stock_service_provider.getAllBoughtStocksId(this.current_user_id)
      .pipe(catchError((err_msg)=>this.error_message_faced=err_msg))),
      
      tap(data=>{this.bought_stocks_id=data
        if(this.bought_stocks_id.length==0)
        {
          this.display_review_status=false;
          this.bought_stocks_id.push(-1);
        }
      }),

      

      switchMap(()=>this.stock_service_provider.getAllBoughtStocksReviews(this.bought_stocks_id)
      .pipe(catchError((err_msg)=>this.error_message_faced=err_msg))),


      tap((data:stock_reviews[])=>{
        this.boughtStockReviews=data
        this.user_id_reviews=this.boughtStockReviews.map(val=>val.id);
        this.available_reviews_bought_stocks_id=this.boughtStockReviews.map(val=>val.stock_id);

        /*this.available_reviews_bought_stocks_id.map((val)=>this.stock_service_provider.getParticularStock(val)
        .subscribe((data)=>{
            this.bought_stock_object=data
            this.bought_stocks_details.push(this.bought_stock_object);
        }));*/


        this.user_id_reviews.map((val,i)=>this.user_service_provider.getUserById(val).subscribe(
          (data)=>{
            this.bought_stock_review={
              "name":data.name,
              "age":data.age,
              "gender":data.gender,
              "stock_review_id":this.boughtStockReviews[i].stock_review_id,
              "stock_id":this.boughtStockReviews[i].stock_id,
              "stock_review":this.boughtStockReviews[i].stock_review,
              "id":this.boughtStockReviews[i].id,
              "submitted_on":this.boughtStockReviews[i].submitted_on,
              "rating":this.boughtStockReviews[i].rating,
              //"stock_name":this.bought_stocks_details[i].stock_name
            };
            
            this.all_bought_stock_reviews.push(this.bought_stock_review);

          }
        ))
      })

    ).subscribe();

  }

  getStockName(expansion_object:stock_review_custom_class)
  {
    this.stock_service_provider.getParticularStock(expansion_object.stock_id)
    .subscribe((data)=>this.current_stock_name=data.stock_name);
  }

  


}
