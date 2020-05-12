import { Component, OnInit, Inject } from '@angular/core';
import {MatBottomSheet,MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatSnackBar} from '@angular/material/snack-bar';


import {user_kyc_data} from '../shared/user_kyc_data';

import {UserloginserviceService} from '../services/userloginservice.service';
import { switchMap, catchError } from 'rxjs/operators';
import { user } from '../shared/user';

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
  current_user_object:user;
  isLinear = false;
  
  personal_identification_form_open_status:boolean=false;
  contact_form_open_status:boolean=false;
  address_form_open_status:boolean=false;
  error_message_faced:string;
  kyc_form_data_object:user_kyc_data;

  /////////////////Form Errors and Error Messages

  



  ///////Ends



  //Peronal Data Form Group
  
  father_name_form_group:FormGroup;
  mother_name_form_group:FormGroup;
  date_of_birth:FormGroup;
  occupation:FormGroup;


  personal_data_form_values={

    "father_name":"",
    "mother_name":"",
    "dob":"",
    "occupation":""

  };

  //Ends

  //Personal Identification Data

  passport_number:FormGroup;
  passport_expiry_date:FormGroup;
  aadhar_card_number:FormGroup;
  pan_card_number:FormGroup;

  personal_identification_form_data={

    "passport_number":"",
    "expiry_date":"",
    "aadhar_card_number":"",
    "pan_card_number":""

  };

  //Ends

  //Contact Details

  email:FormGroup;
  mobile_number:FormGroup;

  contact_form_data={

    "email_id":"",
    "mobile_number":0

  };
  
  //address details

  city_name:FormGroup;
  state_name:FormGroup;
  country_name:FormGroup;
  pin_code:FormGroup;

  address_form_data={

    "city_name":"",
    "state_name":"",
    "country_name":"",
    "pin_code":0

  }


  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  private fb:FormBuilder,
  private kyc_form_bottom_sheet:MatBottomSheetRef<KycDetailsFormComponent>,
  private snack_bar:MatSnackBar,
  private user_service_provider:UserloginserviceService) 
  {

  }

  ngOnInit(): void 
  {
    this.current_user_id=this.data.current_user_id;

    let username= sessionStorage.getItem("username");

    this.user_service_provider.getUserId(username).subscribe((data)=>this.current_user_object=data,(err_msg)=>this.error_message_faced=err_msg);
    
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
      father_name:[this.personal_data_form_values.father_name,[Validators.required,Validators.maxLength(30)]]
    });

    this.mother_name_form_group=this.fb.group({
      mother_name:[this.personal_data_form_values.mother_name,[Validators.required,Validators.maxLength(30)]]
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
    let name_of_father= Object.values(this.father_name_form_group.value).toString();
    let name_of_mother= Object.values(this.mother_name_form_group.value).toString();
    let dob= Object.values(this.date_of_birth.value).toString();
    let occupation_faced= Object.values(this.occupation.value).toString();

    this.personal_data_form_values={
      "father_name":name_of_father,
      "mother_name":name_of_mother,
      "dob":dob,
      "occupation":occupation_faced
    }

    this.snack_bar.open("Personal Data Form Data has been saved,You can come back and make modifications if you want.\n Please continue",'Close', {
      duration: 3000});

    this.personal_identification_form_open_status=true;
    
  }

  personal_identification_form()
  {
    this.passport_number=this.fb.group({
      passport_number:[this.personal_identification_form_data.passport_number,[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern("^[A-Z]{1}[0-9]{7}$")]]
    });

    this.passport_expiry_date=this.fb.group({
      expiry_date:[this.personal_identification_form_data.expiry_date,[Validators.required]]
    });

    this.aadhar_card_number=this.fb.group({
      aadhar_card_number:[this.personal_identification_form_data.aadhar_card_number,[Validators.required,Validators.minLength(12),Validators.maxLength(12)]]
    });

    this.pan_card_number=this.fb.group({
      pan_card_number:[this.personal_identification_form_data.pan_card_number,[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$")]]
    });

  }

  savePersonalIdentificationFormData()
  {
    let passport_number_data= Object.values(this.passport_number.value).toString();
    let expiry_date_data= Object.values(this.passport_expiry_date.value).toString();
    let aadhar_card_number_data= Object.values(this.aadhar_card_number.value).toString();
    let pan_card_number_data= Object.values(this.pan_card_number.value).toString();

    this.personal_identification_form_data={
      "passport_number":passport_number_data,
      "expiry_date":expiry_date_data,
      "aadhar_card_number":aadhar_card_number_data,
      "pan_card_number":pan_card_number_data
    }

    this.snack_bar.open("Personal Data Identification Form Data has been saved,You can come back and make modifications if you want.\n Please continue",'Close', {
      duration: 3000});

    this.contact_form_open_status=true;
  }

  contact_details_form()
  {
    this.email=this.fb.group({
      email_id:[this.contact_form_data.email_id,[Validators.required,Validators.email]]
    });

    this.mobile_number=this.fb.group({
      mobile_number:[this.contact_form_data.mobile_number,[Validators.required,Validators.minLength(10),Validators.maxLength(10)]]
    });

  }

  saveContactDetailsFormData()
  {
    let email_id_data=Object.values(this.email.value).toString();
    let mobile_number_data= Object.values(this.mobile_number.value).toString();

    this.contact_form_data={
      "email_id":email_id_data,
      "mobile_number":+(mobile_number_data)
    }

    this.snack_bar.open("Contact Details Form Data has been saved,You can come back and make modifications if you want.\n Please continue",'Close', {
      duration: 3000});

    this.address_form_open_status=true;


  }



  address_details_form()
  {
    this.city_name=this.fb.group({
      city_name:[this.address_form_data.city_name,[Validators.required]]
    });

    this.state_name=this.fb.group({
      state_name:[this.address_form_data.state_name,[Validators.required]]
    });

    this.country_name=this.fb.group({
      country_name:[this.address_form_data.country_name,[Validators.required]]
    });

    this.pin_code=this.fb.group({
      pin_code:[this.address_form_data.pin_code,[Validators.required,Validators.minLength(6),Validators.maxLength(6)]]
    });

  }

  saveAddressFormData()
  {
    let name_of_city=Object.values(this.city_name.value).toString();
    let name_of_state= Object.values(this.state_name.value).toString();
    let name_of_country= Object.values(this.country_name.value).toString();
    let pin_code_data= Object.values(this.pin_code.value).toString();

    this.address_form_data={
      "city_name":name_of_city,
      "state_name":name_of_state,
      "country_name":name_of_country,
      "pin_code":+(pin_code_data)
    }

    this.kyc_form_data_object={
      "id":this.current_user_id,
      "father_name":this.personal_data_form_values.father_name,
      "mother_name":this.personal_data_form_values.mother_name,
      "dob":this.personal_data_form_values.dob,
      "occupation":this.personal_data_form_values.occupation,
      "passport_number":this.personal_identification_form_data.passport_number,
      "expiry_date":this.personal_identification_form_data.expiry_date,
      "aadhar_card_number":this.personal_identification_form_data.aadhar_card_number,
      "pan_card_number":this.personal_identification_form_data.pan_card_number,
      "email_id":this.contact_form_data.email_id,
      "mobile_number":this.contact_form_data.mobile_number.toString(),
      "city_name":this.address_form_data.city_name,
      "state_name":this.address_form_data.state_name,
      "country_name":this.address_form_data.country_name,
      "pin_code":this.address_form_data.pin_code
    }

    this.snack_bar.open("All the form details are saved. Are you sure to submit the form ?",
    'Yes').onAction().subscribe(()=>{

      this.user_service_provider.postKYCData(this.kyc_form_data_object).subscribe((data)=>{
        
        
        
        this.kyc_form_bottom_sheet.dismiss();

        this.kyc_form_bottom_sheet.afterDismissed().subscribe(()=>{

          this.user_service_provider.kyc_form_status_update.next("true");

        });
        
        this.snack_bar.open("Your KYC Details have been submitted,You can now view your KYC Details",
        'Close',{
          duration: 5000});
        
      });


      this.user_service_provider.updateKYCStatus(this.current_user_id,this.current_user_object).subscribe((err_msg)=>this.error_message_faced=this.error_message_faced);

      },(err_msg)=>this.error_message_faced=err_msg);

  }



  closeContactForm()
  {
    
    this.snack_bar.open("This will reset the form data, Are you sure to close the form ?",'Yes', {
      duration: 5000}).onAction().subscribe(()=>this.kyc_form_bottom_sheet.dismiss());
    
  }

}
