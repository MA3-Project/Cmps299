import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketComponent } from './basket/basket.component';
import { ContactComponent } from './contact/contact.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAccountComponent } from './my-account/my-account.component';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { RegisterComponent } from './register/register.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { SellerRegistrationComponent } from './seller-registration/seller-registration.component';
import { SellerSigninComponent } from './seller-signin/seller-signin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    SharedModule,
    NgxSkeletonLoaderModule,
    MatDatepickerModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatProgressBarModule
  ],
  declarations: [
    BasketComponent,
    ContactComponent,
    WishlistComponent,
    CheckoutComponent,
    MyAccountComponent,
    LoginComponent,
    AboutUsComponent,
    ErrorPageComponent,
    ReviewsComponent,
    OrderSuccessComponent,
    RegisterComponent,
    SellerRegistrationComponent,
    SellerSigninComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    EmailConfirmationComponent,
    ChangePasswordComponent,
    ProfileComponent
  ],
  providers: [],
})
export class PagesModule { }
