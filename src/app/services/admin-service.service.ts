import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpResponse, HttpRequest} from '@angular/common/http';
import {base_url} from '../shared/baseurl';

import {admin} from '../shared/admin';
import {admin_credentials} from '../shared/admin_credentials';
import {users_data_for_admin_dto} from '../shared/users_data_for_admin_dto';
import {transactions_data_for_admin} from '../shared/transactions_data_for_admin';


import { Observable, BehaviorSubject } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {ProcessHTTPerrorService} from '../services/process-httperror.service';


@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  adminData= new BehaviorSubject("");
  adminMenuDisplay= new BehaviorSubject<boolean>(null);

  constructor(private http_service_admin:HttpClient,
    private error_management_service:ProcessHTTPerrorService) 
  {

  }

  verifyAdminStatus(user_name:string):Observable<HttpResponse<number>>
  {
    return this.http_service_admin.get<number>(base_url+"checkAdminStatus/"+user_name,{observe : 'response'})
    .pipe(catchError(this.error_management_service.handle_error_faced));
  }

  verifyAdminCredentials(admin_credentials_obj:admin_credentials):Observable<HttpResponse<admin_credentials>>
  {
      return this.http_service_admin.post<admin_credentials>(base_url+"verifyAdminCredentials",admin_credentials_obj,{observe : 'response'})
      .pipe(catchError(this.error_management_service.handle_error_faced));

  }

  getAllUserDataForAdmin():Observable<users_data_for_admin_dto[]>
  {
    return this.http_service_admin.get<users_data_for_admin_dto[]>(base_url+"getAllUsersData").pipe(catchError(this.error_management_service.handle_error_faced));
  }

  getAllTransactionsDataForAdmin():Observable<transactions_data_for_admin[]>
  {
    return this.http_service_admin.get<transactions_data_for_admin[]>(base_url+"getAllTransactionData").pipe(catchError(this.error_management_service.handle_error_faced));
  }


}
