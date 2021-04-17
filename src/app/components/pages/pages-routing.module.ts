import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { LoginComponent } from './login/login.component';
import { BasketComponent } from './basket/basket.component';
import { RegisterComponent } from './register/register.component';
import { SellerRegistrationComponent } from './seller-registration/seller-registration.component';
import { SellerSigninComponent } from './seller-signin/seller-signin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { PersonalInventoryComponent } from '../pages/my-account/personal-inventory/personal-inventory.component';
import { AddItemComponent } from './add-item/add-item.component';
import { AddtocategoryComponent } from './addtocategory/addtocategory.component';
import { EditProfileComponent } from './my-account/edit-profile/edit-profile.component';
import { MyProductsComponent } from './my-account/my-products/my-products.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ConfirmEmailComponent } from '../pages/confirm-email/confirm-email.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'about', component: AboutUsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'basket', component: BasketComponent },
      { path: 'error', component: ErrorPageComponent },
      { path: 'testimonials', component: ReviewsComponent },
      { path: 'order-success', component: OrderSuccessComponent },
      { path: 'seller-signin', component: SellerSigninComponent },
      { path: 'seller-registration', component: SellerRegistrationComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'email-confirmation', component: EmailConfirmationComponent },
      {
        path: 'my-account', component: MyAccountComponent, children: [
          { path: 'personal-inventory', component: PersonalInventoryComponent },
          { path: 'edit-profile', component: EditProfileComponent },
          { path: 'my-products', component: MyProductsComponent } 
        ]
      },
      { path: 'add-item', component: AddItemComponent },
      { path: 'addtocategories', component: AddtocategoryComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'confirm-email', component: ConfirmEmailComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
