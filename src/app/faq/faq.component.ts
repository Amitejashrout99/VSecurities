import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {ContactUsComponent} from '../contact-us/contact-us.component';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor(private contact_bottom_sheet:MatBottomSheet)
  {

  }

  ngOnInit(): void 
  {

  }

  displayContactForm()
  {
    const contact_bottom_sheet_ref= this.contact_bottom_sheet.open(ContactUsComponent,{
      ariaLabel: 'Contact us'
    });
  }

}
