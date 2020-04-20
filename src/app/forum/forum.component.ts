import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

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

    this.router.navigate(['/stockForum', {outlets: {'side': ['banner']}}])

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
