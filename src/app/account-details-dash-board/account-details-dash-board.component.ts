import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {MatBottomSheet,MatBottomSheetRef} from '@angular/material/bottom-sheet';

import {user} from '../shared/user';

import {UserloginserviceService} from '../services/userloginservice.service';
import {KycDetailsFormComponent} from '../kyc-details-form/kyc-details-form.component';

@Component({
  selector: 'app-account-details-dash-board',
  templateUrl: './account-details-dash-board.component.html',
  styleUrls: ['./account-details-dash-board.component.scss']
})
export class AccountDetailsDashBoardComponent implements OnInit {

  current_user_name:string;
  current_user_object:user;
  error_message_faced:string;
  kyc_data_status:boolean=false;

  constructor(private route_service:ActivatedRoute, 
    private router:Router,
    private user_service_provider:UserloginserviceService,
    private kyc_form_bottomsheet:MatBottomSheet) 
  {
    
  }

  ngOnInit(): void 
  {
    let username= sessionStorage.getItem("username");
    this.current_user_name=username;
    if(username===null)
    {
      alert("Please login to continue");
      this.router.navigate(['/login']);
    }

    this.user_service_provider.getUserId(username)
    .subscribe((data)=>{
      this.current_user_object=data
      if(this.current_user_object.kyc_status==="true")
      {
        this.kyc_data_status=true;
      }
    },(err)=>this.error_message_faced=err);

  }

  open_kyc_form(user_id:number)
  {
    this.kyc_form_bottomsheet.open(KycDetailsFormComponent,{
      data: { current_user_id:user_id},
    });
  }

}
