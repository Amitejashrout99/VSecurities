import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {base_url} from '../shared/baseurl';

import {users} from '../shared/users';
import {user} from '../shared/user';
import {user_kyc_data} from '../shared/user_kyc_data';

import {Observable, BehaviorSubject} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {ProcessHTTPerrorService} from '../services/process-httperror.service';

@Injectable({
  providedIn: 'root'
})
export class UserloginserviceService 
{

  login_status: number;
  status_flag:number;
  user_attempt_to_login:users;
  constructor(private http_service: HttpClient,
    private error_management_service:ProcessHTTPerrorService) 
  { 

  }

  userdata= new BehaviorSubject("");
  kyc_form_status_update= new BehaviorSubject("");

  async verifyUser(user_name:string):Promise<users>
  {
      return this.http_service.get<users>(base_url+"verify_user/"+user_name)
      .pipe(catchError(this.error_management_service.handle_error_faced)).toPromise();
  }

  checkUsernameAvailabilityStatus(username:string):Observable<boolean>
  {
    return this.http_service.get<boolean>(base_url+"checkAvailability/"+username).pipe(catchError(this.error_management_service.handle_error_faced));
  }

  signUpNewUser(new_user:user):Observable<user>
  {
    return this.http_service.post<user>(base_url+"add_user",new_user).pipe(catchError(this.error_management_service.handle_error_faced));
  }

  addNewUserCredentials(new_user_credentials:users):Observable<users>
  {
    return this.http_service.post<users>(base_url+"add_user_credentials",new_user_credentials).pipe(catchError(this.error_management_service.handle_error_faced));
  }

  public getUserId(user_name:string):Observable<user>
  {
    
    return this.http_service.get<user>(base_url+"getUserId/"+user_name)
    .pipe(catchError(this.error_management_service.handle_error_faced));
  }

  async getUserIdPromise(user_name:string):Promise<user>
  {
    
    return this.http_service.get<user>(base_url+"getUserId/"+user_name)
    .pipe(catchError(this.error_management_service.handle_error_faced)).toPromise();
  }

  public getAllUsers():Observable<user[]>
  {
    return this.http_service.get<user[]>(base_url+"getAllUsers")
    .pipe(catchError(this.error_management_service.handle_error_faced));
  }

  getAllUserIds():Observable<number[]|any>
  {
    return this.getAllUsers().pipe(map(users=>users.map(user=>user.id))).pipe(catchError(this.error_management_service.handle_error_faced));
  }

  getUserById(user_id:number):Observable<user>
  {
    return this.http_service.get<user>(base_url+"getUserById/"+user_id);
  }

  getKYCData(user_id:number):Observable<user_kyc_data>
  {
    return this.http_service.get<user_kyc_data>(base_url+"getKYCData/"+user_id).pipe(catchError(this.error_management_service.handle_error_faced));
  }

  updateKYCStatus(user_id:number,user_obj:user):Observable<user>
  {
    return this.http_service.put<user>(base_url+"updateKYCStatus/"+user_id,user_obj).pipe(catchError(this.error_management_service.handle_error_faced));
  }

  postKYCData(kyc_form_data:user_kyc_data):Observable<user_kyc_data>
  {
      return this.http_service.post<user_kyc_data>(base_url+"postKYCData",kyc_form_data).pipe(catchError(this.error_management_service.handle_error_faced));
  }

}
