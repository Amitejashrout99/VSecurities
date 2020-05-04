import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-stock-watch',
  templateUrl: './stock-watch.component.html',
  styleUrls: ['./stock-watch.component.scss']
})

export class StockWatchComponent implements OnInit {

  open_state:boolean=false;
  welcome_message:string;
  
  constructor(private route_service:ActivatedRoute, private router:Router) 
  {

  }

  ngOnInit(): void 
  {
    let username= sessionStorage.getItem("username");
    let password= sessionStorage.getItem("password");
    
    this.welcome_message="Hello "+username;

    this.router.navigate(['/stockWatch', {outlets: {'side': ['banner']}}])

    if(username===null)
    {
      alert("Please login to continue");
      this.router.navigate(['/login']);
    }
  }

  checkOpenClose()
  {
    this.open_state=!this.open_state;
  }

}
