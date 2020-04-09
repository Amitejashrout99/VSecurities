import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatSnackBar} from '@angular/material/snack-bar';


import {stock} from '../shared/stock';
import {user} from '../shared/user';
import {stock_reviews} from '../shared/stock_reviews';
import {user_pending_reviews_track} from '../shared/userPendingReviewTrack';


import {StockserviceService} from '../services/stockservice.service';
import {UserloginserviceService} from '../services/userloginservice.service';
import { map, switchMap, tap, catchError, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-submit-review',
  templateUrl: './submit-review.component.html',
  styleUrls: ['./submit-review.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class SubmitReviewComponent implements OnInit {

  
  pending_review_stock_ids:number[];
  current_user_object:user;
  current_user_id:number;
  bought_stocks_id:number[];
  error_message_faced:string;
  pending_review_stocks:stock[]=[];
  pending_review_stock_object:stock;
  user_review_track_data:user_pending_reviews_track;

  name_form_group:FormGroup;
  stock_review_form_group:FormGroup;
  rating_form_group:FormGroup
  isLinear = false;

  //review_details_data variables
  name_submitted:string;
  review_given:string;
  rating_given:number;
  review_id:number;
  review_track_id:number;
  stock_review_provided:stock_reviews;


  
  constructor(private stock_service_provider:StockserviceService,
    private user_service_provider:UserloginserviceService,
    private fb:FormBuilder,
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

        tap(bought_stocks_id_data=>this.bought_stocks_id=bought_stocks_id_data),

        switchMap(()=>this.stock_service_provider.getPendingReviewsStockIds(this.bought_stocks_id,this.current_user_id)
        .pipe(catchError((err_msg)=>this.error_message_faced=err_msg))),

        tap((data:number[])=>{
          this.pending_review_stock_ids=data
        }),

        switchMap(()=>this.pending_review_stock_ids.map((val)=>{
          this.stock_service_provider.getParticularStock(val).subscribe((data)=>{
            this.pending_review_stock_object=data;
            this.pending_review_stocks.push(this.pending_review_stock_object)
          },(err_msg)=>this.error_message_faced=err_msg)
        }))


     ).subscribe();

     this.name_form_group = this.fb.group({
      name: ['', Validators.required]
    });

      this.stock_review_form_group=this.fb.group({
        review:['',Validators.required]
      });

      this.rating_form_group=this.fb.group({
        rating:['',Validators.required]
      })

  }

  submitReview(stock_object:stock)
  {
    this.name_submitted=Object.values(this.name_form_group.value).toString();
    this.review_given=Object.values(this.stock_review_form_group.value).toString();
    this.rating_given=+(Object.values(this.rating_form_group.value).toString());
    this.review_id=Math.random();
    this.review_track_id=Math.random();

    let date_time= new Date();
    let day= date_time.getDate();
    let month=date_time.getMonth();
    let year= date_time.getFullYear();

    let date= day+"/"+(month+1)+"/"+year;
    

    this.stock_review_provided={
      "stock_review_id":+((this.review_id*100).toFixed()),
      "stock_id":stock_object.stock_id,
      "stock_review":this.review_given,
      "id":this.current_user_id,
      "submitted_on":date,
      "rating":this.rating_given
    };

    this.user_review_track_data={
      "review_track_id":+((this.review_track_id*100).toFixed()),
      "stock_id":stock_object.stock_id,
      "id":this.current_user_id,
      "stock_review_id":+((this.review_id*100).toFixed())
    }

    //alert(JSON.stringify(this.stock_review_provided)+" "+JSON.stringify(this.user_review_track_data));
    this.stock_service_provider.postBoughtStockPeronalReview(this.stock_review_provided)
    .subscribe((data)=>this.snack_bar.open("Thank you for submitting the review"+" "+this.name_submitted,'Close', {
      duration: 5000}));

    this.stock_service_provider.postUserReviewTrack(this.user_review_track_data).subscribe();

  }

}
