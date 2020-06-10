import { Injectable} from '@angular/core';
import {shopping_cart} from '../shared/shoppingCart';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import {stock_sales} from '../shared/stock_sales'; //Cart Items object which is modified

import {HttpClient,HttpHeaders} from '@angular/common/http';
import {base_url} from '../shared/baseurl';
import {map, catchError} from 'rxjs/operators';
import {ProcessHTTPerrorService} from '../services/process-httperror.service';



@Injectable({
  providedIn: 'root'
})
export class ShoppingCartServiceService 
{

  stock_items:shopping_cart[];
  buy_item:shopping_cart;
  error_string_message:string;
  
  
  constructor(private http_service_shopping_cart:HttpClient,
    private error_management_service:ProcessHTTPerrorService) 
  {
    
  }
  
  shopping_cart_items= new BehaviorSubject([]);


  addToCartItem(stock_item:shopping_cart)
  {
    this.stock_items= JSON.parse(sessionStorage.getItem("cartItems")) || [];
    this.stock_items.push(stock_item);

    //this.changeCartIconContentMethod(this.stock_items);


    sessionStorage.setItem("cartItems",JSON.stringify(this.stock_items));
  }

  get_items_from_Cart()
  {
    //alert("this is from cart");

    let items=sessionStorage.getItem("cartItems");

    return items;

  }

  get_items_directly_from_buy()
  {
    //alert("this is from buy");
    let item= sessionStorage.getItem("directBuy");
    
    return item;

  }

  addStockCartItemsToDatabase(stock_sales_object_array:stock_sales) //To add cart items to stock_sales_status
  {
     //alert(stock_sales_object_array); 
    return this.http_service_shopping_cart.post<stock_sales>("addStockBuy",stock_sales_object_array);
  }

  




}
