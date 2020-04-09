import {Routes} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import { HomeComponent} from '../home/home.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {TradingComponent} from '../trading/trading.component';
import {DashboardBannerComponent} from '../dashboard-banner/dashboard-banner.component';
import {StockDetailsComponent} from '../stock-details/stock-details.component';
import {StockMenuComponent} from '../stock-menu/stock-menu.component';
import {BuyStocksWindowComponent} from '../buy-stocks-window/buy-stocks-window.component';
import {StockLibraryComponent} from '../stock-library/stock-library.component';
import {WatchlistedStocksComponent} from '../watchlisted-stocks/watchlisted-stocks.component';
import {StockLibraryBannerComponent} from '../stock-library-banner/stock-library-banner.component';
import {SellBoughtStocksComponent} from '../sell-bought-stocks/sell-bought-stocks.component';
import {AllBoughtStocksComponent} from '../all-bought-stocks/all-bought-stocks.component';
import {AllSoldStocksComponent} from '../all-sold-stocks/all-sold-stocks.component';
import {AllReviewsBoughtStocksComponent } from '../all-reviews-bought-stocks/all-reviews-bought-stocks.component';
import {SubmitReviewComponent} from '../submit-review/submit-review.component';

export const various_routes:Routes=[

    {path:'',redirectTo:'/login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'home',component: HomeComponent},
    {path:'dashboard',component:DashboardComponent,
        children:[
            {path:'trading',component:TradingComponent,outlet:'side'},
            {path:'banner',component:DashboardBannerComponent,outlet:'side'},
            {path:'allStocks',component:StockMenuComponent,outlet:'side'},
            {path:'sellYourStocks',component:SellBoughtStocksComponent,outlet:'side'}
        ]},
    {path:'BuyStock/:stock_id',component:BuyStocksWindowComponent},
    {path:'stockLibrary',component:StockLibraryComponent,
        children:[
            {path:'watchlistedStock',component:WatchlistedStocksComponent,outlet:'side'},
            {path:'banner',component:StockLibraryBannerComponent,outlet:'side'},
            {path:'allBoughtStocks',component:AllBoughtStocksComponent,outlet:'side'},
            {path:'allSoldStocks',component:AllSoldStocksComponent,outlet:'side'},
            {path:'allReviews',component:AllReviewsBoughtStocksComponent,outlet:'side'},
            {path:'submitReview',component:SubmitReviewComponent,outlet:'side'}
        ]}

];