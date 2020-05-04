import { Component, OnInit , Inject } from '@angular/core';
import {MatBottomSheet,MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

import {stock_research_dto} from '../shared/stock_research_dto';
import {user} from '../shared/user';

import {StockWatchServiceService} from '../services/stock-watch-service.service';
import {UserloginserviceService} from '../services/userloginservice.service';
import { tap, switchMap } from 'rxjs/operators';



@Component({
  selector: 'app-stock-research-details',
  templateUrl: './stock-research-details.component.html',
  styleUrls: ['./stock-research-details.component.scss']
})
export class StockResearchDetailsComponent implements OnInit {

  
  stock_id_selected:number;
  stock_name_selected:string;
  error_message_faced:string;

  stock_research_data:stock_research_dto;
  customers_data:user[]=[];
  growth_icon_status:boolean=false;
  decline_icon_status:boolean=false;
  customer_data_available_status:boolean=true;
  reviews_data_available_status:boolean=true;
  
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data:any,
  private stock_research_bottom_sheet: MatBottomSheetRef<StockResearchDetailsComponent>,
  private stock_research_service_provider:StockWatchServiceService,
  private user_service_provider:UserloginserviceService) 
  {

  }

  ngOnInit(): void 
  {
    this.stock_id_selected=this.data.stock_id_selected;
    this.stock_name_selected=this.data.selected_stock_name;

    this.stock_research_service_provider.getResearchDataStockWise(this.stock_id_selected).pipe(

        tap((data)=>{this.stock_research_data=data

          if(this.stock_research_data.profit_margin>0)
          {
            this.growth_icon_status=true;
          }
          if(this.stock_research_data.profit_margin<0)
          {
            this.decline_icon_status=true;
          }
          if(this.stock_research_data.all_customers_ids.length==0)
          {
            this.customer_data_available_status=false;
          }
          if(this.stock_research_data.all_reviews_available.length==0)
          {
            this.reviews_data_available_status=false;
          }
        
        }),

        switchMap(()=>this.stock_research_data.all_customers_ids.map((val)=>this.user_service_provider.getUserById(val)
        .subscribe((data)=>this.customers_data.push(data)))),

        

    ).subscribe();

  }

  closeContactForm()
  {
    this.stock_research_bottom_sheet.dismiss();
  }

}
