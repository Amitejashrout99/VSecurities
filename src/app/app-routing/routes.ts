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
import {ForumBannerComponent} from '../forum-banner/forum-banner.component';
import {ForumComponent} from '../forum/forum.component';
import {FaqComponent} from '../faq/faq.component';
import {ForumDashboardComponent} from '../forum-dashboard/forum-dashboard.component';
import {ContactUsComponent} from '../contact-us/contact-us.component';
import {StockWatchComponent} from '../stock-watch/stock-watch.component';
import {StockWatchBannerComponent} from '../stock-watch-banner/stock-watch-banner.component';
import {StockWatchDashboardComponent} from '../stock-watch-dashboard/stock-watch-dashboard.component';
import {StockRecommendationsComponent} from '../stock-recommendations/stock-recommendations.component';
import {AccountDetailsDashBoardComponent} from '../account-details-dash-board/account-details-dash-board.component';
import {AdminNavComponent} from '../admin-nav/admin-nav.component';
import {AdminUserDetailsComponent} from '../admin-user-details/admin-user-details.component';
import {AdminTransactionDetailsComponent} from '../admin-transaction-details/admin-transaction-details.component';
import {AdminStatisticsDetailsComponent} from '../admin-statistics-details/admin-statistics-details.component';


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
        ]},
    {path:'stockForum',component:ForumComponent,
        children:[
            {path:'banner',component:ForumBannerComponent,outlet:'side'},
            {path:'faq',component:FaqComponent,outlet:'side'},
            {path:'forumDashboard',component:ForumDashboardComponent,outlet:'side'}
        ]},
    {path:'contact',component:ContactUsComponent},
    {path:'stockWatch',component:StockWatchComponent,
        children:[
            {path:'banner',component:StockWatchBannerComponent,outlet:'side'},
            {path:'stockResearch',component:StockWatchDashboardComponent,outlet:'side'},
            {path:'stockRecommends',component:StockRecommendationsComponent,outlet:'side'}   
        ]},
    {path:'account',component:AccountDetailsDashBoardComponent},
    {path:'admin',component:AdminNavComponent},
    {path:'allUsersDetail',component:AdminUserDetailsComponent},
    {path:'allTransactionsDetail',component:AdminTransactionDetailsComponent},
    {path:'allStats',component:AdminStatisticsDetailsComponent}
    

];