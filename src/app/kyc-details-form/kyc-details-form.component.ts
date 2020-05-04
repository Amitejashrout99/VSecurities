import { Component, OnInit, Inject } from '@angular/core';
import {MatBottomSheet,MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatSnackBar} from '@angular/material/snack-bar';
import { format } from 'path';

@Component({
  selector: 'app-kyc-details-form',
  templateUrl: './kyc-details-form.component.html',
  styleUrls: ['./kyc-details-form.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class KycDetailsFormComponent implements OnInit {

  current_user_id:number;
  isLinear = false;
  
  //Peronal Data Form Group
  
  father_name_form_group:FormGroup;
  mother_name_form_group:FormGroup;
  date_of_birth:FormGroup;
  occupation:FormGroup;

  //Ends

  //Personal Identification Data

  passport_number:FormGroup;
  passport_expiry_date:FormGroup;
  aadhar_card_number:FormGroup;
  pan_card_number:FormGroup;

  //Ends

  //Contact Details

  email:FormGroup;
  mobile_number:FormGroup;
  
  //address details

  city_name:FormGroup;
  state_name:FormGroup;
  country_name:FormGroup;
  pin_code:FormGroup;

  personal_data_form_values={

    "father_name":"",
    "mother_name":"",
    "dob":"",
    "occupation":""

  };


  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  private fb:FormBuilder,
  private kyc_form_bottom_sheet:MatBottomSheetRef<KycDetailsFormComponent>) 
  {

  }

  ngOnInit(): void 
  {
    this.current_user_id=this.data.current_user_id;
    
  }

  

  step:number = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  personal_details_form()
  {
    this.father_name_form_group=this.fb.group({
      father_name:[this.personal_data_form_values.father_name,[Validators.required,Validators.minLength(1),Validators.maxLength(30)]]
    });

    this.mother_name_form_group=this.fb.group({
      mother_name:[this.personal_data_form_values.mother_name,[Validators.required,Validators.minLength(1),Validators.maxLength(30)]]
    });

    this.date_of_birth=this.fb.group({
      dob:[this.personal_data_form_values.dob,[Validators.required]]
    });

    this.occupation=this.fb.group({
      occupation:[this.personal_data_form_values.occupation,[Validators.required]]
    });

  }

  savePersonalFormData()
  {
    
  }

  personal_identification_form()
  {
    this.passport_number=this.fb.group({
      passport_number:['',[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern("^[A-Z]{1}[0-9]{7}$")]]
    });

    this.passport_expiry_date=this.fb.group({
      expiry_date:['',[Validators.required]]
    });

    this.aadhar_card_number=this.fb.group({
      aadhar_card_number:['',[Validators.required,Validators.minLength(12),Validators.maxLength(12)]]
    });

    this.pan_card_number=this.fb.group({
      pan_card_number:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$")]]
    });

  }

  contact_details_form()
  {
    this.email=this.fb.group({
      email_id:['',[Validators.required,Validators.email]]
    });

    this.mobile_number=this.fb.group({
      mobile_number:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]]
    });

  }

  address_details_form()
  {
    this.city_name=this.fb.group({
      city_name:['',[Validators.required]]
    });

    this.state_name=this.fb.group({
      state_name:['',[Validators.required]]
    });

    this.country_name=this.fb.group({
      country_name:['',[Validators.required]]
    });

    this.pin_code=this.fb.group({
      pin_code:['',[Validators.required,Validators.minLength(6),Validators.maxLength(6)]]
    });

  }


  closeContactForm()
  {
    this.kyc_form_bottom_sheet.dismiss();
  }

}
