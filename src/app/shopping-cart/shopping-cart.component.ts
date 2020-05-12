import { Component, OnInit } from '@angular/core';
import {shopping_cart} from '../shared/shoppingCart';
import {ShoppingCartServiceService} from '../services/shopping-cart-service.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PaymentGatewayComponent} from '../payment-gateway/payment-gateway.component';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  
  added_items_to_cart:shopping_cart[];
  cart_data_source:shopping_cart[];
  single_cart_item:shopping_cart;
  dataSource:any[]=[];
  total_cost_price:number=0;
  proceed_to_checkout_status:boolean=true;
  displayedColumns: string[] = ['item_id', 'item_name', 'item_count', 'item_price'];
  constructor(private shopping_cart_service_provider:ShoppingCartServiceService,
   private payment_gateway_dialog:MatDialog)
  {

  }

  ngOnInit(): void 
  {
     
      if(this.dataSource.length==0)
      {
         this.proceed_to_checkout_status=false;
      }
   
     let called_by= sessionStorage.getItem("triggeredBy");
     if(called_by==="directBuy")
     {
        let item =this.shopping_cart_service_provider.get_items_directly_from_buy();
        
        this.single_cart_item=JSON.parse(item);
        
        this.cart_data_source=JSON.parse(item);
        
        //this.single_cart_item=this.cart_data_source[0];
        
        //alert(this.single_cart_item.item_count);

        this.proceed_to_checkout_status=true;

        this.total_cost_price+=this.single_cart_item.item_price;
        //alert(this.cart_data_source);
        
        this.dataSource = new Array(this.cart_data_source);
        sessionStorage.setItem("items_to_pay_for",JSON.stringify(this.dataSource));


     }
     if(called_by==="cartBuy")
     {
        let items = this.shopping_cart_service_provider.get_items_from_Cart(); 

        //this.proceed_to_checkout_status=true;
         

        this.cart_data_source=JSON.parse(items);

        for(let i=0;i<this.cart_data_source.length;i++)
        {
            this.single_cart_item=this.cart_data_source[i];

            //alert(this.single_cart_item.item_count);
            this.total_cost_price+=this.single_cart_item.item_price;
        }

        this.dataSource=this.cart_data_source;

         if(this.dataSource.length!=0)
         {
            this.proceed_to_checkout_status=true;
         }
        sessionStorage.setItem("items_to_pay_for",JSON.stringify(this.dataSource));
        //alert(this.cart_data_source);
     }
  }

  openPaymentGateway()
  {
     this.payment_gateway_dialog.open(PaymentGatewayComponent,{width:"800px",height:'450px'});
     sessionStorage.setItem("cost_to_be_paid",this.total_cost_price.toString());
  }

}
