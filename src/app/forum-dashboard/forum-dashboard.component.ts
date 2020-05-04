import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';


import {forum_main_db} from '../shared/forum_main_db';
import {user} from '../shared/user';
import {forum_answer_db} from '../shared/forum_answer_db';
import {forum_overview_dto} from '../shared/forum_overview_dto';

import {ForumServiceService} from '../services/forum-service.service';
import {UserloginserviceService} from '../services/userloginservice.service';


import {Observable, Subscription, timer} from 'rxjs';
import {map, startWith, switchMap, catchError, tap} from 'rxjs/operators';
import { query } from '@angular/animations';




@Component({
  selector: 'app-forum-dashboard',
  templateUrl: './forum-dashboard.component.html',
  styleUrls: ['./forum-dashboard.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class ForumDashboardComponent implements OnInit {

  
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = ['#revenue'];
  allTags: string[] = ['#revenue', '#stock', '#reliance', '#jio', '#profits','#loss',"#oil"];
  isLinear = false;


  all_tags_selected:string[];
  all_filtered_tags:string[]=[];
  display_result_div:boolean=true;

  all_search_results:forum_main_db[];
  all_posts:forum_main_db[];
  all_comments_per_question:forum_answer_db[];
  user_forum_data:forum_overview_dto=null;

  error_message_faced:string;
  question_asked_by:string;
  answer_given_by:string;
  answer_given_by_user_age:number;
  current_user_id:number;
  current_user_name:string;
  test_message:string="Hello world";
  
  comment_submitted:string;
  comment_object_submitted:forum_answer_db; //comment provided by the user
  update_question_object_submitted:forum_main_db;// used for updating the question that is already present in the database
  query_submitted:forum_main_db; //question object submitted by the user
  updated_stats_received:forum_main_db;


  comment_display_card_status:boolean=false;
  first_reply_display_status:boolean=false;
  normal_reply_display_status:boolean=false;

  comment_form_group:FormGroup;
  thread_comment_form_group:FormGroup;
  question_form_group:FormGroup;
  tag_form_group:FormGroup;

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  
  
  constructor(private forum_service_provider:ForumServiceService,
    private user_service_provider:UserloginserviceService,
    private fb:FormBuilder,
    private snack_bar:MatSnackBar) 
  {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));

  }

  ngOnInit(): void 
  {
    let username= sessionStorage.getItem("username");

    this.current_user_name=username;

    this.user_service_provider.getUserId(username).pipe(
        tap((data)=>this.current_user_id=data.id),

        switchMap(()=>this.forum_service_provider.getForumOverviewData(this.current_user_id)
        .pipe(catchError((err_msg)=>this.error_message_faced=err_msg))),

        tap((data:forum_overview_dto)=>this.user_forum_data=data)

    ).subscribe();

    this.forum_service_provider.getAllPosts().subscribe((data)=>this.all_posts=data);

    this.thread_comment_form_group = this.fb.group({
      thread_comment: ['', Validators.required]
    });

    this.question_form_group = this.fb.group({
      question: ['', Validators.required]
    });

    this.tag_form_group=this.fb.group({
      tag:['',Validators.required]
    });

  }

  /* ***************************Chips Input Logic***************************************** */


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

  /*  ************************************ Chips Logic ends ***************************** */

  displaySearchResult(tags_selected:string[])
  {
    this.display_result_div=false;
    tags_selected.map((val)=>{
      this.all_filtered_tags.push(val.substring(1,val.length));
    });

    this.forum_service_provider.getSearchResult(this.all_filtered_tags)
    .subscribe((data)=>this.all_search_results=data,(err_msg)=>this.error_message_faced=err_msg);
  }

  getQuestionDetails(selected_question:forum_main_db)
  {
    
    this.comment_display_card_status=false;
    this.first_reply_display_status=false;
    this.normal_reply_display_status=false;

    
    this.user_service_provider.getUserById(selected_question.qstn_user_id)
      .subscribe((data)=>this.question_asked_by=data.name,(err_msg)=>this.error_message_faced=err_msg);
    
  }

  getPostDetails(selected_question:forum_main_db)
  {
    
    this.user_service_provider.getUserById(selected_question.qstn_user_id).pipe(

      tap((data)=>this.question_asked_by=data.name),

      switchMap(()=>this.forum_service_provider.getCommentsForPost(selected_question.qstn_id).pipe(
        catchError((err_msg)=>this.error_message_faced=err_msg)
      )),

      tap((data:forum_answer_db[])=>this.all_comments_per_question=data)

    ).subscribe();

    

  }


  submitQuestion()
  {
    let question_provided= Object.values(this.question_form_group.value).toString();
    let tag_provided= Object.values(this.tag_form_group.value).toString();
    tag_provided="#"+tag_provided;

    let date_time= new Date();
    let day= date_time.getDate();
    let month=date_time.getMonth();
    let year= date_time.getFullYear();

    let question_id_created=Math.random()*100;

    let date= day+"/"+(month+1)+"/"+year;

    this.query_submitted={
      "qstn_id":question_id_created,
      "forum_qstn":question_provided,
      "forum_answr_status":1,
      "qstn_user_id":this.current_user_id,
      "qstn_askd_on":date,
      "times_answered":0,
      "qstn_tag":tag_provided
    };

    //alert(JSON.stringify(this.query_submitted));

    this.forum_service_provider.postQuery(this.query_submitted).subscribe((data)=>{
      this.snack_bar.open("Your Query"+data.forum_qstn+"has been posted in Forum",'Close', {
        duration: 3000})
    },(err_msg)=>this.error_message_faced=err_msg);

  }

  showComments(qstn_id:number)
  {
    
    this.comment_display_card_status=true;
    this.first_reply_display_status=false;
    this.normal_reply_display_status=false;
    
    //this.resetInitialCommentStatus();

    this.comment_form_group = this.fb.group({
      comment: ['', Validators.required]
    });
    
    this.forum_service_provider.getCommentsForPost(qstn_id)
    .subscribe((data)=>{this.all_comments_per_question=data
      if(this.all_comments_per_question.length==0)
      {
        this.first_reply_display_status=true
      }
    },
    (err_msg)=>this.error_message_faced=err_msg);

  }

  displayCommentDetails(comment_user_id:number)
  {
    this.user_service_provider.getUserById(comment_user_id).subscribe((data)=>{
        this.answer_given_by=data.name
        this.answer_given_by_user_age=data.age
    },(err_msg)=>this.error_message_faced=err_msg);
  }



  displayCommentBox()
  {
    this.comment_display_card_status=false;
    this.normal_reply_display_status=true;

    this.comment_form_group = this.fb.group({
      comment: ['', Validators.required]
    });
  }

  submitFirstComment(question_id:number,question_object:forum_main_db)
  {
    this.comment_submitted=Object.values(this.comment_form_group.value).toString();
    
    let date_time= new Date();
    let day= date_time.getDate();
    let month=date_time.getMonth();
    let year= date_time.getFullYear();

    let answr_id=Math.random()*100;

    let date= day+"/"+(month+1)+"/"+year;

    this.comment_object_submitted={
      "answer_id":answr_id,
      "forum_answer":this.comment_submitted,
      "answer_user_id":this.current_user_id,
      "answr_given_on":date,
      "question_id":question_id

    };

    this.update_question_object_submitted={
      "qstn_id":question_id,
      "forum_qstn":question_object.forum_qstn,
      "forum_answr_status":question_object.forum_answr_status,
      "qstn_user_id":this.current_user_id,
      "qstn_askd_on":question_object.qstn_askd_on,
      "times_answered":question_object.times_answered,
      "qstn_tag":question_object.qstn_tag
    }

    //alert(JSON.stringify(this.comment_object_submitted)+" "+JSON.stringify(this.update_question_object_submitted));
 
    this.forum_service_provider.postInitialComment(this.comment_object_submitted).subscribe((data)=>
    {this.snack_bar.open("Your Comment "+data.forum_answer+"has been submitted",'Close', {
          duration: 3000});
    },(err_msg)=>this.error_message_faced=err_msg);

    this.forum_service_provider.updateQuestionStats(this.update_question_object_submitted,question_id)
    .subscribe((data)=>this.updated_stats_received=data,(err_msg)=>this.error_message_faced=err_msg);

  }

  submitNormalComment(question_id:number,question_object:forum_main_db)
  {
    this.comment_submitted=Object.values(this.comment_form_group.value).toString();
    
    let date_time= new Date();
    let day= date_time.getDate();
    let month=date_time.getMonth();
    let year= date_time.getFullYear();

    let answr_id=Math.random()*100;

    let date= day+"/"+(month+1)+"/"+year;

    this.comment_object_submitted={
      "answer_id":answr_id,
      "forum_answer":this.comment_submitted,
      "answer_user_id":this.current_user_id,
      "answr_given_on":date,
      "question_id":question_id

    };

    this.update_question_object_submitted={
      "qstn_id":question_id,
      "forum_qstn":question_object.forum_qstn,
      "forum_answr_status":question_object.forum_answr_status,
      "qstn_user_id":this.current_user_id,
      "qstn_askd_on":question_object.qstn_askd_on,
      "times_answered":question_object.times_answered,
      "qstn_tag":question_object.qstn_tag
    }

    //alert(JSON.stringify(this.comment_object_submitted)+" "+JSON.stringify(this.update_question_object_submitted));
 
    this.forum_service_provider.postInitialComment(this.comment_object_submitted).subscribe((data)=>
    {this.snack_bar.open("Your Comment "+data.forum_answer+"has been submitted",'Close', {
          duration: 3000});
    },(err_msg)=>this.error_message_faced=err_msg);

    this.forum_service_provider.updateQuestionStats(this.update_question_object_submitted,question_id)
    .subscribe((data)=>this.updated_stats_received=data,(err_msg)=>this.error_message_faced=err_msg);
  }

  submitDiscussionComment(question_id:number,question_object:forum_main_db)
  {
    this.comment_submitted=Object.values(this.thread_comment_form_group.value).toString();
    
    let date_time= new Date();
    let day= date_time.getDate();
    let month=date_time.getMonth();
    let year= date_time.getFullYear();

    let answr_id=Math.random()*100;

    let date= day+"/"+(month+1)+"/"+year;

    this.comment_object_submitted={
      "answer_id":answr_id,
      "forum_answer":this.comment_submitted,
      "answer_user_id":this.current_user_id,
      "answr_given_on":date,
      "question_id":question_id

    };

    this.update_question_object_submitted={
      "qstn_id":question_id,
      "forum_qstn":question_object.forum_qstn,
      "forum_answr_status":question_object.forum_answr_status,
      "qstn_user_id":this.current_user_id,
      "qstn_askd_on":question_object.qstn_askd_on,
      "times_answered":question_object.times_answered,
      "qstn_tag":question_object.qstn_tag
    }

    //alert(JSON.stringify(this.comment_object_submitted)+" "+JSON.stringify(this.update_question_object_submitted));
    
    this.forum_service_provider.postInitialComment(this.comment_object_submitted).subscribe((data)=>
    {this.snack_bar.open("Your Comment "+data.forum_answer+"has been submitted",'Close', {
          duration: 3000});
    },(err_msg)=>this.error_message_faced=err_msg);

    this.forum_service_provider.updateQuestionStats(this.update_question_object_submitted,question_id)
    .subscribe((data)=>this.updated_stats_received=data,(err_msg)=>this.error_message_faced=err_msg);


  }

}
