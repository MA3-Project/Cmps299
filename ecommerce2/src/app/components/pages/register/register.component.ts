import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { CRCService } from './crc.service';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  hide = true;
  hide1 = true;
  createAccountForm: FormGroup;
  countries: {};
  regions: {};
  cities: {};
  genders: {};
  usernames: {};
  exist: boolean = false;

  constructor(private cscService: CRCService, private http: HttpClient, private re: RegisterService, private route: Router) { }

  ngOnInit() {
    const password = new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]);
    const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.cscService.getCountries().subscribe(
      data => this.countries = data
    );

    this.re.getUsernames().subscribe(
      data => this.usernames = data
    );

    this.cscService.getGenders().subscribe(
      data => this.genders = data
    );

    this.createAccountForm = new FormGroup({
      First_Name: new FormControl('', Validators.required),
      Last_Name: new FormControl('', Validators.required),
      UserName: new FormControl('', Validators.required),
      Email: new FormControl('', [Validators.required, Validators.email]),
      PhoneNumber: new FormControl(''),
      Password: password,
      ConfirmPassword: confirmPassword,
      Gender: new FormControl('', Validators.required),
      Date_Of_Birth: new FormControl('', Validators.required),
      Country: new FormControl('', Validators.required),
      Region: new FormControl('', Validators.required),
      City: new FormControl('', Validators.required)
    });

  }

  onChangeCountry(countryId: number) {
    if (countryId) {
      this.cscService.getRegions(countryId).subscribe(
        data => {
          this.regions = data;
          this.cities = null;
        }
      );
    } else {
      this.regions = null;
      this.cities = null;
    }
  }

  onChangeRegion(regionId: number) {
    if (regionId) {
      this.cscService.getCities(regionId).subscribe(
        data => this.cities = data
      );
    } else {
      this.cities = null;
    }
  }

  isUsernameExist(username: string): boolean{
    for (var i in this.usernames) {
      if (username === this.usernames[i]) {
        return true;
      }
    }
    return false;
  }
  

  onSubmit() {
    console.log(this.createAccountForm.value);
    const data = {
      "First_Name": this.createAccountForm.value.First_Name,
      "Last_Name": this.createAccountForm.value.Last_Name,
      "UserName": this.createAccountForm.value.UserName,
      "Email": this.createAccountForm.value.Email,
      "PhoneNumber": this.createAccountForm.value.PhoneNumber,
      "Password": this.createAccountForm.value.Password,
      "ConfirmPassword": this.createAccountForm.value.ConfirmPassword,
      "Gender": JSON.parse(this.createAccountForm.value.Gender),
      "Date_Of_Birth": this.createAccountForm.value.Date_Of_Birth,
      "Country": JSON.parse(this.createAccountForm.value.Country),
      "Region": JSON.parse(this.createAccountForm.value.Region),
      "City": JSON.parse(this.createAccountForm.value.City),
      "ClientURI": "http://localhost:4200/pages/email-confirmation"
    }

    if (this.isUsernameExist(this.createAccountForm.value.UserName)) {
      this.exist = true;
      this.createAccountForm.value.UserName = "";
      return;
    }
   
    this.re.register(data).subscribe(result => {
      console.log("Success!", result);
    },
    err => {
      if (err.status == 400)
        this.exist = true;
      else
        console.log(err);
      });
    this.route.navigate(['pages/login']);

  }
}

