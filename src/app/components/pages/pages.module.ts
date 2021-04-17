import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { BasketComponent } from './basket/basket.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MyAccountComponent } from './my-account/my-account.component';
import { PersonalInventoryComponent } from './my-account/personal-inventory/personal-inventory.component';
import { AddItemComponent } from './add-item/add-item.component';
import { AddtocategoryComponent } from './addtocategory/addtocategory.component';
import { MyProductsComponent } from './my-account/my-products/my-products.component';
import { EditProfileComponent } from './my-account/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';



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
    MatFormFieldModule
  ],
  declarations: [
    ContactComponent,
    WishlistComponent,
    LoginComponent,
    BasketComponent,
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
    MyAccountComponent,
    PersonalInventoryComponent,
    AddItemComponent,
    AddtocategoryComponent,
    MyProductsComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    ConfirmEmailComponent
  ],
  providers: [],
})
export class PagesModule { }
