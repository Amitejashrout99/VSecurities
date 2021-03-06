import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {base_url} from '../shared/baseurl';

import {forum_main_db} from '../shared/forum_main_db';
import {forum_answer_db} from '../shared/forum_answer_db';
import {forum_overview_dto} from '../shared/forum_overview_dto';

import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {ProcessHTTPerrorService} from '../services/process-httperror.service';

@Injectable({
  providedIn: 'root'
})
export class ForumServiceService 
{

  
  constructor(private http_service_forum:HttpClient,
    private error_management_service:ProcessHTTPerrorService) 
  { 

  }

  getSearchResult(tag_list:string[]):Observable<forum_main_db[]>
  {
    return this.http_service_forum.get<forum_main_db[]>("searchForumByTag/"+tag_list)
    .pipe(catchError(this.error_management_service.handle_error_faced));
  }
  
  getAllPosts():Observable<forum_main_db[]>
  {
    return this.http_service_forum.get<forum_main_db[]>("getAllPosts").pipe(catchError(this.error_management_service.handle_error_faced));
  }

  getCommentsForPost(question_id:number):Observable<forum_answer_db[]>
  {
    return this.http_service_forum.get<forum_answer_db[]>("getComments/"+question_id).pipe(catchError(this.error_management_service.handle_error_faced));
  }

  postInitialComment(comment_object:forum_answer_db):Observable<forum_answer_db>
  {
    return this.http_service_forum.post<forum_answer_db>("postComment",comment_object).pipe(catchError(this.error_management_service.handle_error_faced));
  }

  postQuery(question_object:forum_main_db):Observable<forum_main_db>
  {
    return this.http_service_forum.post<forum_main_db>("postQuestion",question_object).pipe(catchError(this.error_management_service.handle_error_faced));
  }

  updateQuestionStats(updated_question_object:forum_main_db, qstn_id:number):Observable<forum_main_db>
  {
    return this.http_service_forum.put<forum_main_db>("updateQuestionStats/"+qstn_id,updated_question_object).pipe(catchError(this.error_management_service.handle_error_faced));
  }

  getForumOverviewData(userid:number):Observable<forum_overview_dto>
  {
    return this.http_service_forum.get<forum_overview_dto>("getForumOverviewData/"+userid)
    .pipe(catchError(this.error_management_service.handle_error_faced));
  }

}
