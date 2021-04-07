import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SellerRegistrationComponent } from './seller-registration/seller-registration.component';
import { SellerSigninComponent } from './seller-signin/seller-signin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'about', component: AboutUsComponent },
      { path: 'basket', component: BasketComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'my-account', component: MyAccountComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'error', component: ErrorPageComponent },
      { path: 'testimonials', component: ReviewsComponent },
      { path: 'order-success', component: OrderSuccessComponent },
      { path: 'seller-signin', component: SellerSigninComponent },
      { path: 'seller-registration', component: SellerRegistrationComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'email-confirmation', component: EmailConfirmationComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'change-password', component: ChangePasswordComponent }

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
