import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { CRCService } from '../register/crc.service';
import { RegisterService } from '../register/register.service';

@Component({
  selector: 'app-seller-registration',
  templateUrl: './seller-registration.component.html',
  styleUrls: ['./seller-registration.component.sass']
})
export class SellerRegistrationComponent implements OnInit {

  hide = true;
  hide1 = true;
  createAccountFormSeller: FormGroup;
  countries: {};
  regions: {};
  cities: {};
  genders: {};
  usernames: {};
  exist: boolean = false;

  constructor(private cscService: CRCService, private re: RegisterService, private route: Router) { }

  ngOnInit(): void {

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

    this.createAccountFormSeller = new FormGroup({
      First_Name: new FormControl('', Validators.required),
      Last_Name: new FormControl('', Validators.required),
      UserName: new FormControl('', Validators.required),
      Email: new FormControl('', [Validators.required, Validators.email]),
      PhoneNumber: new FormControl(''),
      Password: password,
      ConfirmPassword: confirmPassword,
      Company_Name: new FormControl('', Validators.required),
      Gender: new FormControl('', Validators.required),
      Date_Of_Birth: new FormControl('', Validators.required),
      Country: new FormControl('', Validators.required),
      Region: new FormControl('', Validators.required),
      City: new FormControl('', Validators.required)
    });
  }

  isUsernameExist(username: string): boolean {
    for (var i in this.usernames) {
      if (username === this.usernames[i]) {
        return true;
      }
    }
    return false;
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

  onSubmit() {
    console.log(this.createAccountFormSeller.value);
    const data = {
      "First_Name": this.createAccountFormSeller.value.First_Name,
      "Last_Name": this.createAccountFormSeller.value.Last_Name,
      "UserName": this.createAccountFormSeller.value.UserName,
      "Email": this.createAccountFormSeller.value.Email,
      "PhoneNumber": this.createAccountFormSeller.value.PhoneNumber,
      "Password": this.createAccountFormSeller.value.Password,
      "ConfirmPassword": this.createAccountFormSeller.value.ConfirmPassword,
      "Company_Name": this.createAccountFormSeller.value.Company_Name,
      "Gender": JSON.parse(this.createAccountFormSeller.value.Gender),
      "Date_Of_Birth": this.createAccountFormSeller.value.Date_Of_Birth,
      "Country": JSON.parse(this.createAccountFormSeller.value.Country),
      "Region": JSON.parse(this.createAccountFormSeller.value.Region),
      "City": JSON.parse(this.createAccountFormSeller.value.City),
      "ClientURI": "http://localhost:4200/pages/email-confirmation"
    }
    if (this.isUsernameExist(this.createAccountFormSeller.value.UserName)) {
      this.exist = true;
      this.createAccountFormSeller.value.UserName = "";
      return;
    }

    this.re.registerSeller(data).subscribe(result => {
      console.log("Success!", result);
    },
      err => {
        if (err.status == 400)
          this.exist = true;
        else
          console.log(err);
      });
    this.route.navigate(['pages/seller-signin']);
  }

}
