import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {shopping_cart} from '../shared/shoppingCart';

import {ShoppingCartServiceService} from '../services/shopping-cart-service.service';
import {UserloginserviceService} from '../services/userloginservice.service';
import {AdminServiceService} from '../services/admin-service.service';

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
  username:string=null;

  admin_authorization_status:boolean=false;

  admin_username:string=null;
  company_name_display_status:boolean=false;
  company_name:string="Vshare Securities";
  
  
  constructor(private route_service:ActivatedRoute, 
    private router:Router,
    private shopping_cart_service:ShoppingCartServiceService,
    public shopping_cart_dialog: MatDialog,
    private user_service_provider:UserloginserviceService,
    private snack_bar:MatSnackBar,
    private admin_service_provider:AdminServiceService) 
  {
      
  }

 
  

  ngOnInit(): void 
  {
    this.username= sessionStorage.getItem("username");
    this.admin_username= sessionStorage.getItem("adminUsername");
    let password= sessionStorage.getItem("password");
    
    this.stock_items_in_cart= JSON.parse(sessionStorage.getItem("cartItems")) || [];

    this.no_of_items=this.stock_items_in_cart.length;

    /*if(this.username!=null)
    {
      document.getElementById("banner_message").innerHTML="Hello "+this.username;
    }*/
    
    this.user_service_provider.userdata.subscribe((data)=>this.username=data);

    this.admin_service_provider.adminData.subscribe((data)=>this.admin_username=data);

    this.admin_service_provider.adminMenuDisplay.subscribe((data)=>this.admin_authorization_status=data);

    this.shopping_cart_service.shopping_cart_items.subscribe((data)=>{
      if(data==null)
      {
        this.no_of_items=0;
      }
      else{
        this.no_of_items=data.length;
      }
    });
    
    
  }


  openShoppingCartDialog()
  {
    this.shopping_cart_dialog.open(ShoppingCartComponent,{width:'500px',height:'450px'});
    sessionStorage.setItem("triggeredBy","cartBuy");
  }

  displaySignOut()
  {
    this.snack_bar.open("Are you sure to Log-out",'Log-out',{
      duration: 5000
    }).onAction().subscribe(()=>{

      let all_session_items= Object.keys(sessionStorage);
      for(let i=0;i<all_session_items.length;i++)
      {
        sessionStorage.removeItem(all_session_items[i]);
      }

      this.user_service_provider.userdata.next("");

      this.admin_service_provider.adminData.next("");

      this.shopping_cart_service.shopping_cart_items.next(null);

      this.admin_service_provider.adminMenuDisplay.next(false);

      this.router.navigate(['/login']);

      this.snack_bar.open("You have been logged out",'Close',{
        duration: 5000
      });
    });
    
    
  }


}
