import { Component, OnInit } from '@angular/core';
import {SidenavbarComponent} from '../sidenavbar/sidenavbar.component';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  open_state:boolean=false;
  
  constructor(private route_service:ActivatedRoute, private router:Router) 
  {

  }

  ngOnInit(): void 
  {
    let username= sessionStorage.getItem("username");
    let password= sessionStorage.getItem("password");
    
    this.router.navigate(['/dashboard', {outlets: {'side': ['banner']}}])

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
