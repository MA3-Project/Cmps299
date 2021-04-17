import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../register/register.service';

@Component({
  selector: 'app-seller-signin',
  templateUrl: './seller-signin.component.html',
  styleUrls: ['./seller-signin.component.sass']
})
export class SellerSigninComponent implements OnInit {

  hide = true;
  signinFormSeller: FormGroup;
  error: boolean = false;
  confirmed: boolean;
  constructor(private service: RegisterService, private router: Router) { }

  ngOnInit() {
    this.signinFormSeller = new FormGroup({
      UserName: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
    });

    //if (localStorage.getItem('token') != null)
    //this.router.navigateByUrl('home/two');
  }

  onSubmit() {
    this.service.login(this.signinFormSeller.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['home/two']);
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
