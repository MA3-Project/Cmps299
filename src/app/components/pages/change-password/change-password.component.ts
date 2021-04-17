import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { ChangePasswordService } from '../change-password/change-password.service';
import { RegisterService } from '../register/register.service';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass']
})
export class ChangePasswordComponent implements OnInit {

  public forgotPasswordForm: FormGroup
  public successMessage: string;
  public errorMessage: string;
  public showSuccess: boolean;
  public showError: boolean;

  hide = true;
  hide1 = true;
  token: string;
  changePasswordForm: FormGroup;
  constructor(private CPservice: ChangePasswordService, private Rservice: RegisterService, /*private toastr: ToastrService,*/ private route: ActivatedRoute) { }


  ngOnInit(): void {
    const oldPassword = new FormControl('', [Validators.required]);
    const newPassword = new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]);
    const confirmPassword = new FormControl('', CustomValidators.equalTo(newPassword));

    this.changePasswordForm = new FormGroup({
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    });
  }

  onSubmit() {
    this.token = this.route.snapshot.queryParams['token'];
    const data = {
      "oldPassword": this.changePasswordForm.value.oldPassword,
      "newPassword": this.changePasswordForm.value.newPassword,
      "confirmPassword": this.changePasswordForm.value.confirmPassword,
      "Token": this.token
    }
    this.CPservice.changePassword(data).subscribe(result => { this.showSuccess = true; this.successMessage = "Password Changed Successfully!" }, error => { this.showError = true; this.errorMessage = error; })

  }

  /**
    onSubmit() {
      if(this.changePasswordForm.valid) {
        this.Rservice.GetUserNames().subscribe((result) => {
          if (result.email) {
            let userDetails = this.changePasswordForm.value;
            userDetails.email = result.email;
            this.CPservice.changePassword(userDetails).subscribe((result) => {
              this.toastr.success(result.message);
            });
          }
        });
      }
    } 
    **/
}
