import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {shopping_cart} from '../shared/shoppingCart';
import {ShoppingCartServiceService} from '../services/shopping-cart-service.service';
import { async } from '@angular/core/testing';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ShoppingCartComponent} from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit 
{
  
  
  various_stocks:shopping_cart[];
  stock_items_in_cart:shopping_cart[];
  no_of_items:number=0;
  
  
  constructor(private route_service:ActivatedRoute, 
    private router:Router,
    private shopping_cart_service:ShoppingCartServiceService,
    public shopping_cart_dialog: MatDialog) 
  {
      
  }

 
  

  ngOnInit(): void 
  {
    let username= sessionStorage.getItem("username");
    let password= sessionStorage.getItem("password");
    
    this.stock_items_in_cart= JSON.parse(sessionStorage.getItem("cartItems")) || [];

    this.no_of_items=this.stock_items_in_cart.length;

    if(username!=null)
    {
      document.getElementById("banner_message").innerHTML="Hello "+username;
    }
    
    this.shopping_cart_service.shopping_cart_items.subscribe((data)=>this.no_of_items=data.length);    
  }


  openShoppingCartDialog()
  {
    this.shopping_cart_dialog.open(ShoppingCartComponent,{width:'500px',height:'450px'});
    sessionStorage.setItem("triggeredBy","cartBuy");
  }


}
