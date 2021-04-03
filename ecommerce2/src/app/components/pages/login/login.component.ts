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
  constructor(private service: RegisterService, private router: Router) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      UserName: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
    });

    //if (localStorage.getItem('token') != null)
      //this.router.navigateByUrl('home');
  }

  onSubmit() {
    this.service.login(this.signinForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['home']);
      },
      err => {
        if (err.status == 400)
          this.error = true;
        else
          console.log(err);
      }
    );
  }

}
