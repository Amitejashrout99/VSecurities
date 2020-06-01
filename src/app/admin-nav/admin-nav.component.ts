import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {

  constructor(private route_service:ActivatedRoute, 
    private router:Router,
    private snack_bar:MatSnackBar) 
  {

  }

  ngOnInit(): void 
  {
    let usename_of_admin= sessionStorage.getItem("adminUsername");
    if(usename_of_admin===null)
    {
      
      
      this.snack_bar.open("You are not logged in, Please Login as Admin to continue"+"\n"+"Click on Login to redirect to login page ",'Login Now',{
        duration: 5000
      }).onAction().subscribe(()=>{
          
        this.router.navigate(['/login']);

      });
    }

  }

}
