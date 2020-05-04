import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {AppRoutingModule} from './app-routing/app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSliderModule} from '@angular/material/slider';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgMarqueeModule } from 'ng-marquee';
import { RatingModule } from 'ng-starrating';

import 'hammerjs'



import {AlienServiceService} from './services/alien-service.service';
import {UserloginserviceService} from './services/userloginservice.service';
import {StockserviceService} from './services/stockservice.service';
import {ShoppingCartServiceService} from './services/shopping-cart-service.service';
import {TradingDashboardServiceService} from './services/trading-dashboard-service.service';
import {ForumServiceService} from './services/forum-service.service';
import {StockWatchServiceService} from './services/stock-watch-service.service';


import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';
import { TradingComponent } from './trading/trading.component';
import { DashboardBannerComponent } from './dashboard-banner/dashboard-banner.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { StockMenuComponent } from './stock-menu/stock-menu.component';
import { BuyStocksWindowComponent } from './buy-stocks-window/buy-stocks-window.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { HighlightDirective } from './directives/highlight.directive';
import { StockLibraryComponent } from './stock-library/stock-library.component';
import { WatchlistedStocksComponent } from './watchlisted-stocks/watchlisted-stocks.component';
import { StockLibraryBannerComponent } from './stock-library-banner/stock-library-banner.component';
import { StockLibraryNavbarComponent } from './stock-library-navbar/stock-library-navbar.component';
import { SellBoughtStocksComponent } from './sell-bought-stocks/sell-bought-stocks.component';
import { AllBoughtStocksComponent } from './all-bought-stocks/all-bought-stocks.component';
import { AllSoldStocksComponent } from './all-sold-stocks/all-sold-stocks.component';
import { AllReviewsBoughtStocksComponent } from './all-reviews-bought-stocks/all-reviews-bought-stocks.component';
import { SubmitReviewComponent } from './submit-review/submit-review.component';
import { ForumBannerComponent } from './forum-banner/forum-banner.component';
import { ForumComponent } from './forum/forum.component';
import { FaqComponent } from './faq/faq.component';
import { ForumDashboardComponent } from './forum-dashboard/forum-dashboard.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { StockWatchComponent } from './stock-watch/stock-watch.component';
import { StockWatchBannerComponent } from './stock-watch-banner/stock-watch-banner.component';
import { StockWatchDashboardComponent } from './stock-watch-dashboard/stock-watch-dashboard.component';
import { StockRecommendationsComponent } from './stock-recommendations/stock-recommendations.component';
import { StockResearchDetailsComponent } from './stock-research-details/stock-research-details.component';
import { AccountDetailsDashBoardComponent } from './account-details-dash-board/account-details-dash-board.component';
import { KycDetailsFormComponent } from './kyc-details-form/kyc-details-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,
    SidenavbarComponent,
    TradingComponent,
    DashboardBannerComponent,
    StockDetailsComponent,
    StockMenuComponent,
    BuyStocksWindowComponent,
    ShoppingCartComponent,
    PaymentGatewayComponent,
    HighlightDirective,
    StockLibraryComponent,
    WatchlistedStocksComponent,
    StockLibraryBannerComponent,
    StockLibraryNavbarComponent,
    SellBoughtStocksComponent,
    AllBoughtStocksComponent,
    AllSoldStocksComponent,
    AllReviewsBoughtStocksComponent,
    SubmitReviewComponent,
    ForumBannerComponent,
    ForumComponent,
    FaqComponent,
    ForumDashboardComponent,
    ContactUsComponent,
    StockWatchComponent,
    StockWatchBannerComponent,
    StockWatchDashboardComponent,
    StockRecommendationsComponent,
    StockResearchDetailsComponent,
    AccountDetailsDashBoardComponent,
    KycDetailsFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    MatSidenavModule,
    MatDividerModule,
    MatMenuModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
    MatExpansionModule,
    MatSelectModule,
    MatIconModule,
    NgMarqueeModule,
    RatingModule,
    MatStepperModule,
    MatSliderModule,
    MatBottomSheetModule,
    MatTabsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDatepickerModule
    
  ],
  
  providers: [AlienServiceService,
    UserloginserviceService,
    StockserviceService,
    ShoppingCartServiceService,
    TradingDashboardServiceService,
    ForumServiceService,
    StockWatchServiceService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
