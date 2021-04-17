import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../register/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  hide = true;
  signinForm: FormGroup;
  error: boolean = false;
  confirmed: boolean;
  constructor(private service: RegisterService, private router: Router) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      UserName: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.service.login(this.signinForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['home/two'])
          .then(() => {
            window.location.reload();
          });
      },
      err => {
        //if (err)
        //  this.error = true;
        //else
        //  console.log(err);

        if (err.status == 401)
          this.confirmed = true;
        else
          console.log(err);
      }
    );
  }

}
