import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';

import {users_data_for_admin_dto} from '../shared/users_data_for_admin_dto';
import {UserloginserviceService} from '../services/userloginservice.service';


import {AdminServiceService} from '../services/admin-service.service';
import { user_kyc_data } from '../shared/user_kyc_data';

@Component({
  selector: 'app-admin-user-details',
  templateUrl: './admin-user-details.component.html',
  styleUrls: ['./admin-user-details.component.scss']
})
export class AdminUserDetailsComponent implements OnInit {

  
  all_users_data:users_data_for_admin_dto[];
  error_message_faced:string;
  kyc_information_card_display_status:boolean=false;
  display_kyc_button:boolean=true;
  no_questions_posted:boolean=false;
  no_answers_posted:boolean=false;
  particular_user_kyc_data:user_kyc_data;

  constructor(private route_service:ActivatedRoute, 
    private router:Router,
    private admin_service_provider:AdminServiceService,
    private user_service_provider:UserloginserviceService) 
  {

  }

  ngOnInit(): void 
  {
    let usename_of_admin= sessionStorage.getItem("adminUsername");
    if(usename_of_admin===null)
    {
        alert("You are not logged In, Kindly Login to Continue");         
        this.router.navigate(['/login']);

    }

    this.admin_service_provider.getAllUserDataForAdmin().subscribe((data)=>this.all_users_data=data,(err_msg)=>this.error_message_faced=err_msg);
    
  }

  displayKYCDetails(user_id:number)
  {
    
    this.user_service_provider.getKYCData(user_id).subscribe((data)=>this.particular_user_kyc_data=data,(err_msg)=>this.error_message_faced=err_msg);

    this.kyc_information_card_display_status=true;
    
  }

  toggleKYCDetailsVisibility()
  {
    this.kyc_information_card_display_status=false;
  }

  checkForKYCStatus(user_details:users_data_for_admin_dto)
  {
    this.display_kyc_button=true;
    this.kyc_information_card_display_status=false;
    this.no_questions_posted=false;
    this.no_answers_posted=false;
    if(user_details.user_kyc_data_obj===null)
    {
      this.display_kyc_button=false;
    }
    if(user_details.forum_overview_dto_obj.all_questions_posted.length==0)
    {
      this.no_questions_posted=true;
    }
    if(user_details.forum_overview_dto_obj.all_answers_posted.length==0)
    {
      this.no_answers_posted=true;;
    }

  }

}
