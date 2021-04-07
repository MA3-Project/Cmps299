import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailConfirmationService } from './email-confirmation.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.sass']
})
export class EmailConfirmationComponent implements OnInit {

  showSuccess: boolean;
  showError: boolean;
  errorMessage: string;
  showSuccessMessage: string;

  constructor(private service: EmailConfirmationService, private _route: ActivatedRoute) { }

  Email() {
    const token = this._route.snapshot.queryParams['token'];
    const email = this._route.snapshot.queryParams['email'];
    console.log("hello");
    console.log(email);
    console.log(token);
    this.service.confirmEmail("api/ApplicationUser/EmailConfirmation", token, email)
      .subscribe(result => {
        console.log("Hello");
        console.log(result);
        this.showSuccessMessage = "Your email has been successfully confirmed.";
        this.showSuccess = true;
      },
        error => {
          console.log(error);
          this.showError = true;
          this.errorMessage = error;
        });
  }

  ngOnInit(): void {
    this.Email();
    console.log("hhh");
  }
}
