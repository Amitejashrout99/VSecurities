import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';

import {transactions_data_for_admin} from '../shared/transactions_data_for_admin';
import {AdminServiceService} from '../services/admin-service.service';
import {UserloginserviceService} from '../services/userloginservice.service';

import { user_kyc_data } from '../shared/user_kyc_data';
import {user} from '../shared/user';

@Component({
  selector: 'app-admin-transaction-details',
  templateUrl: './admin-transaction-details.component.html',
  styleUrls: ['./admin-transaction-details.component.scss']
})
export class AdminTransactionDetailsComponent implements OnInit {

  
  all_transactions_data:transactions_data_for_admin[]=[];
  error_message_faced:string;
  kyc_information_card_display_status:boolean=false;
  display_kyc_button:boolean=true;
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
    this.admin_service_provider.getAllTransactionsDataForAdmin().subscribe((data)=>{

        this.all_transactions_data=data.filter((obj)=>{

          if(obj.stock_name!=null)
          {
            return obj;
          }

        });
    
    },(err_msg)=>this.error_message_faced=err_msg);
    
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

  checkForKYCStatus(user_details:user)
  {
    this.display_kyc_button=true;
    this.kyc_information_card_display_status=false;
    if(user_details.kyc_status==="false")
    {
      this.display_kyc_button=false;
    }
  }

}
