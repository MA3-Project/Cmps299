import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


interface Country {
  value: string;
  country_name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  Genders: any = ['Male', 'Female', 'Other'];

  hide = true;

  selectedValue: string;
  selectedCountry: string;



  countries: Country[] = [
    {value: 'Lebanon', country_name: 'Lebanon'},
    {value: 'USA', country_name: 'USA'},
    {value: 'France', country_name: 'France'}
  ];

  registrationForm: FormGroup;

  options: FormGroup;
  floatLabelControl = new FormControl('auto');

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      floatLabel: this.floatLabelControl,
    });
   }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      username: new FormControl('')
    });
  }

}

/**
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CscService } from './csc.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  createAccountForm: FormGroup;
  countries: {};
  regions: {};
  cities: {};

  constructor(private cscService: CscService) { }

  ngOnInit() {
    this.cscService.getCountries().subscribe(
      data => this.countries = data
    );

    this.createAccountForm = new FormGroup({
      country: new FormControl(''),
      region: new FormControl(''),
      city: new FormControl('')
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

}
**/