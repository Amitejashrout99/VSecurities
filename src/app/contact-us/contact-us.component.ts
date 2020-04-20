import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class ContactUsComponent implements OnInit {

  name_form_group:FormGroup;
  number_form_group:FormGroup;
  email_form_group:FormGroup;
  message_form_group:FormGroup
  isLinear = false;
  
  
  constructor(private fb:FormBuilder,
    private snack_bar:MatSnackBar,
    private _bottomSheetRef: MatBottomSheetRef<ContactUsComponent>) 
  { 

  }

  ngOnInit(): void 
  {
    this.name_form_group = this.fb.group({
      name: ['', Validators.required]
    });

    this.email_form_group=this.fb.group({
      email:['',Validators.required]
    });

      this.number_form_group=this.fb.group({
        number:[0,Validators.required]
      });

      this.message_form_group=this.fb.group({
        message:['',Validators.required]
      })
  }

  closeContactForm()
  {
    this._bottomSheetRef.dismiss();
  }

  submitContactForm()
  {
    this.snack_bar.open("We have received your message, We will contact you soon",'Close', {
      duration: 3000});
    
    this._bottomSheetRef.dismiss();
  }

}
