import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Params,ActivatedRoute } from '@angular/router';
import {stock} from '../shared/stock';
import {StockserviceService} from '../services/stockservice.service';
import {shopping_cart} from '../shared/shoppingCart';
import {ShoppingCartServiceService} from '../services/shopping-cart-service.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ShoppingCartComponent} from '../shopping-cart/shopping-cart.component';



@Component({
  selector: 'app-buy-stocks-window',
  templateUrl: './buy-stocks-window.component.html',
  styleUrls: ['./buy-stocks-window.component.scss']
})
export class BuyStocksWindowComponent implements OnInit {

  initial_buy_count:number=1;
  display_status:boolean=true;
  stock_id_selected:number;
  particular_stock:stock;
  error_message:string;
  total_price_of_stocks:number=0;
  regulation_message:string="You can buy only 3 stocks at a time due to company regulations,Sorry for the Inconvenience";
  successfull_Cart_AddMessage:string="Stock added to cart succesfully";
  
  total_brokerage_stock:number=0;
  stt_total:number=128;
  stamp_duty:number=50;
  gst:number=0;
  transaction_charges:number=0.009;

  total_brokerage_fees:number=0;
  gross_price_value:number=0;

  stock_item_cart:shopping_cart;
  cart_items:shopping_cart[];

  
  
  constructor(private snack_bar:MatSnackBar,
    private activated_route:ActivatedRoute,
    private stock_service_provider:StockserviceService,
    private shopping_cart_service_provider: ShoppingCartServiceService,
    private shopping_cart_dialog_opener:MatDialog)
  {

  }

  ngOnInit(): void 
  {
    this.activated_route.params.subscribe(params=>{this.stock_id_selected=params["stock_id"]});
    this.stock_service_provider.getParticularStock(this.stock_id_selected)
    .subscribe((stock_found)=>this.particular_stock=stock_found,(err_msg)=>this.error_message=err_msg);

  }

  calculateBrokerageFees(total_fees:number)
  {
    this.total_brokerage_stock=total_fees/10000;
    this.gst=((this.total_brokerage_fees+(this.transaction_charges*total_fees)/100)*18)/100;
    this.gst=+(this.gst.toFixed(2));
    this.total_brokerage_fees=this.total_brokerage_stock+this.stt_total+this.stamp_duty+this.gst+(this.transaction_charges*total_fees)/100;
    this.gross_price_value=this.total_brokerage_fees+total_fees;
    
  }

  increaseCount()
  {
    this.initial_buy_count+=1;
    this.checkCount();

    this.total_price_of_stocks=this.particular_stock.stock_present_price*this.initial_buy_count;

    this.calculateBrokerageFees(this.total_price_of_stocks);

  }

  checkCount()
  {
    if(this.initial_buy_count>=3)
    {
        this.display_status=false;
        this.snack_bar.open(this.regulation_message,'Close', {
          duration: 5000});
    }
  }

  decreaseCount()
  {
    if(this.initial_buy_count>=3)
    {
      this.display_status=true;
      this.initial_buy_count-=1;
      this.total_price_of_stocks-=this.particular_stock.stock_present_price;

      this.calculateBrokerageFees(this.total_price_of_stocks);
    }
    else{
      this.initial_buy_count-=1;
      this.total_price_of_stocks-=this.particular_stock.stock_present_price;

      this.calculateBrokerageFees(this.total_price_of_stocks);

    }
  }

  directPayAction()
  {
      this.shopping_cart_dialog_opener.open(ShoppingCartComponent,{width:'500px', height:'450px'});
      sessionStorage.setItem("triggeredBy","directBuy");

      this.stock_item_cart=
      {
        "item_id":this.particular_stock.stock_id,
        "item_name":this.particular_stock.stock_name,
        "item_count":this.initial_buy_count,
        "item_price":this.gross_price_value
      };

      sessionStorage.setItem("directBuy",JSON.stringify(this.stock_item_cart));
  }
  addToCartAction()
  {
    

    this.stock_item_cart=
    {
      "item_id":this.particular_stock.stock_id,
      "item_name":this.particular_stock.stock_name,
      "item_count":this.initial_buy_count,
      "item_price":this.gross_price_value
    };

    this.shopping_cart_service_provider.addToCartItem(this.stock_item_cart);

    //alert(sessionStorage.getItem("cartItems"));

    this.snack_bar.open(this.successfull_Cart_AddMessage,'Close', {
      duration: 5000});

    this.cart_items=JSON.parse(sessionStorage.getItem("cartItems"));

    this.shopping_cart_service_provider.shopping_cart_items.next(this.cart_items);

    //this.cart_items_emitter.emit(this.cart_items.length);

  }


}
