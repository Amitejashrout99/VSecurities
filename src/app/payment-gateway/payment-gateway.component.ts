import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {payment_gateway_model} from '../shared/paymentGatewayModel';

import {UserloginserviceService} from '../services/userloginservice.service';
import {StockserviceService} from '../services/stockservice.service';
import {ShoppingCartServiceService} from '../services/shopping-cart-service.service';

import {user} from '../shared/user';
import {stock} from '../shared/stock';
import {stock_sales} from '../shared/stock_sales';
import {shopping_cart} from '../shared/shoppingCart';

import {Location} from '@angular/common';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';


interface Bank {
  name:string;
}

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss']
})
export class PaymentGatewayComponent implements OnInit {

  
  step:number=0;
  credit_debit_card_model:FormGroup;
  card_object:payment_gateway_model;
  panelOpenState = false;
  cost_to_be_paid:number=0;
  
  stock_cart_object:stock;
  stock_sales_object_to_be_added:stock_sales;
  stock_sales_object_array:stock_sales[]=[];
  
  
  current_user_object:user;
  
  shopping_cart_objects:shopping_cart[];
  shopping_cart_object:shopping_cart;
  
  
  
  current_user_name:string;
  current_user_id:number=0;
  
  error_message_faced:string;

  formErrors={          //error java type object

    'card_number':'',
    'card_holder_name':'',
    'card_expiry_month':'',
    'card_expiry_year':'',
    'card_cvv':''

  };


  banks:Bank[]=[
    {name:'Select Your Bank'},
    {name:'State Bank Of India'},
    {name:'ICICI Bank'},
    {name:'Bank Of Baroda'},
    {name:'Indian Bank'}
  ]

  selected = this.banks[0].name;

  validationMessages={

      'card_number':{
        'required':'Card Number is Required',
        'minlength':'Must be at least 2 characters long',
        'maxlength':"Cannot be more than 25 characters long"
      },

      'card_holder_name':{
        'required':'Name of the Card Holder is Required',
        'minlength':'Must be at least 2 characters long',
        'maxlength':"Cannot be more than 25 characters long"
      },

      'card_expiry_month':{

        'required':'Expiry Month is Required'

      },

      'card_expiry_year':{
        'required':'Expiry Year is required'
      },

      'card_cvv':{
        'required':'Card CVV is required',
        'minlength':'Must be 3 digits'
      }

  };

  
  constructor(private fb: FormBuilder,
    private user_service_provider:UserloginserviceService,
    private stock_service_provider: StockserviceService,
    private shopping_cart_service_provider:ShoppingCartServiceService,
    private snack_bar:MatSnackBar,
    private location_service:Location,
    public dialogRef: MatDialogRef<PaymentGatewayComponent>) 
  {
      this.createCreditDebitCardForm();
  }

  ngOnInit(): void 
  {
      let money= sessionStorage.getItem("cost_to_be_paid");
      let user= sessionStorage.getItem("username");

      this.current_user_name=user;

      this.user_service_provider.getUserId(this.current_user_name).subscribe((data)=> 
      this.current_user_object=data,
      (err_msg)=> this.error_message_faced=err_msg);
    

      let items=sessionStorage.getItem("items_to_pay_for");
      this.shopping_cart_objects=JSON.parse(items);


      //alert(this.current_user.address);
      this.cost_to_be_paid=+money;
  }

  createCreditDebitCardForm()
  {
    this.credit_debit_card_model= this.fb.group({

      card_number:[0,[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      card_holder_name:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      card_expiry_month:[0,[Validators.required]],
      card_expiry_year:[0,[Validators.required]],
      card_cvv:[0,[Validators.required,Validators.minLength(3)]]

    });


    this.credit_debit_card_model.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages
  }


  onValueChanged(data? : any)
  {
      if(!this.credit_debit_card_model)
      {
        return;
      }
      const form_value= this.credit_debit_card_model;
      for(const field in this.formErrors)
      {
          if(this.formErrors.hasOwnProperty(field))
          {
             this.formErrors[field]='';
             const control= this.credit_debit_card_model.get(field);
             if(control && control.dirty && !control.valid)
             {
               const messages= this.validationMessages[field];
               for(const key in control.errors)
               {
                 if(control.errors.hasOwnProperty(key))
                 {
                   this.formErrors[field]+= messages[key]+' ';
                 }
               }
             }
          }
      }

  }

  async payAmount()
  {
    alert(this.current_user_object.id);
    
    let date_time= new Date();
    let day= date_time.getDate();
    let month=date_time.getMonth();
    let year= date_time.getFullYear();

    let date= day+"/"+(month+1)+"/"+year;

    //alert(date);

    for(let i=0;i<this.shopping_cart_objects.length;i++)
    {
      this.shopping_cart_object=this.shopping_cart_objects[i];
      
      this.stock_cart_object= await this.stock_service_provider.getParticularStockPromise(this.shopping_cart_object.item_id);

      //alert(i+""+this.stock_cart_object);

      this.stock_sales_object_to_be_added=
      {

        "stock_sale_id":Math.random()*100,
        "stock_buy_status":"yes",
        "stock_sell_status":"no",
        "id":this.current_user_object.id,
        "stock_id":this.stock_cart_object.stock_id,
        "stock_bought_on":date,
        "stock_sold_on":"not_sold",
        "price_bought_for":this.shopping_cart_object.item_price,
        "price_sold_for":0,
        "no_of_times_bought":this.shopping_cart_object.item_count,
        "no_of_times_sold":0        

      };

      

      //alert(i+"Sales object"+this.stock_sales_object_to_be_added);
      
      //alert(this.stock_sales_object_to_be_added.price);

      this.stock_sales_object_array.push(this.stock_sales_object_to_be_added);
      
    }
    
    let length=this.stock_sales_object_array.length;

    for(let i=0;i<length;i++)
    {
      //this.shopping_cart_service_provider.addStockCartItemsToDatabase(this.stock_sales_object_array[i]);
      //this.shopping_cart_service_provider.addStockSalesCount(this.stock_sales_count_objects[i]);
    
      this.addMethod(this.stock_sales_object_array[i]);
    
    }

  }


  addMethod(stock_sales_object:stock_sales)
  {
      //alert(stock_sales_object.id+" "+stock_sales_count_object.stock_id);

      this.shopping_cart_service_provider.addStockCartItemsToDatabase(stock_sales_object)
      .subscribe((data)=>this.snack_bar.open("Your Transaction ID is"+" "+data.stock_sale_id,'Close', {
        duration: 5000}));
    
  }
  
  goBack():void{
    this.dialogRef.close();
  }

}
