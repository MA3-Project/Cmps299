import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { ForgetPasswordService } from '../forgot-password/forget-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {

  hide = true;
  hide1 = true;
  token: string;
  ResetPasswordForm: FormGroup;
  constructor(private service: ForgetPasswordService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const password = new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]);
    const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.ResetPasswordForm = new FormGroup({
      Email: new FormControl("", [Validators.required, Validators.email]),
      Password: password,
      ConfirmPassword: confirmPassword
    });
  }

  onSubmit() {
    this.token = this.route.snapshot.queryParams['token'];
    const data = {
      "Email": this.ResetPasswordForm.value.Email,
      "Password": this.ResetPasswordForm.value.Password,
      "ConfirmPassword": this.ResetPasswordForm.value.ConfirmPassword,
      "Token": this.token
    }
    localStorage.removeItem('token');
    this.service.reset(data).subscribe(result => { console.log(result); }, error => console.error(error));
    this.router.navigate(["pages/login"]);
  }

}
