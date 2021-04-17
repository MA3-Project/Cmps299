import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgetPasswordService } from './forget-password.service';
//import { MatButton } from '@angular/material/button';
//import { MatProgressBar } from '@angular/material/progress-bar';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm: FormGroup
  public successMessage: string;
  public errorMessage: string;
  public showSuccess: boolean;
  public showError: boolean;

  constructor(private FPService: ForgetPasswordService, private route: Router) { }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      Email: new FormControl("", [Validators.required, Validators.email])
    })
  }
  login() {
    this.route.navigate(["pages/login"]);
  }
  onSubmit() {
    const data = {
      "Email": this.forgotPasswordForm.value.Email,
      "ClientURI": "http://localhost:4200/pages/reset-password"
    }
    this.FPService.forgotPassword(data).subscribe(result => { this.showSuccess = true; this.successMessage = "The link has been sent, please check your email to reset your password." }, error => { this.showError = true; this.errorMessage = error; })
  }
}
