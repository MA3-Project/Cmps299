import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { CRCService } from '../register/crc.service';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from '../register/register.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  countries: {};
  regions: {};
  cities: {};
  genders: {};
  usernames: {};

  /**public defaultPictureLink: string = 'assets/images/profile.png';
  public pictureLink: string = JSON.parse(JSON.stringify(this.defaultPictureLink));
  public selectedUser: any;
  public allowedExtensions: string[] = ['jpeg', 'jpg', 'bmp', 'png'];**/

  /**public uploader: FileUploader = new FileUploader({ url: 'api/upload_url' });
  public hasBaseDropZoneOver: boolean = false;**/
  constructor(public dialog: MatDialog, private cscService: CRCService, private http: HttpClient, private Rservice: RegisterService, private router: Router) {}

  changePassword(){
    this.router.navigateByUrl("pages/change-password");
  }

  ngOnInit(): void { 

    this.cscService.getCountries().subscribe(
      data => this.countries = data
    );

    this.Rservice.getUsernames().subscribe(
      data => this.usernames = data
    );

    this.cscService.getGenders().subscribe(
      data => this.genders = data
    );

    this.editProfileForm = new FormGroup({
      First_Name: new FormControl('', Validators.required),
      Last_Name: new FormControl('', Validators.required),
      UserName: new FormControl('', Validators.required),
      Email: new FormControl('', [Validators.required, Validators.email]),
      PhoneNumber: new FormControl(''),
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
    console.log(this.editProfileForm.value);
    const data = {
      "First_Name": this.editProfileForm.value.First_Name,
      "Last_Name": this.editProfileForm.value.Last_Name,
      "UserName": this.editProfileForm.value.UserName,
      "Email": this.editProfileForm.value.Email,
      "PhoneNumber": this.editProfileForm.value.PhoneNumber,
      "Password": this.editProfileForm.value.Password,
      "ConfirmPassword": this.editProfileForm.value.ConfirmPassword,
      "Gender": JSON.parse(this.editProfileForm.value.Gender),
      "Date_Of_Birth": this.editProfileForm.value.Date_Of_Birth,
      "Country": JSON.parse(this.editProfileForm.value.Country),
      "Region": JSON.parse(this.editProfileForm.value.Region),
      "City": JSON.parse(this.editProfileForm.value.City)
    }
  }
}

  /**public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }**/

  /**
  public uploadImage() {
    const dialogRef = this.dialog.open(ModalCropDialogComponent, {
      width: '1600px',
      disableClose: false,
      autoFocus: false,
      data: {
        title: 'Upload image',
        data: this.selectedUser._id,
        currentImage: this.pictureLink
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {}
    });
  }**/
  
  /**
  *  @param target: trigger event
  *
  *  trigger read files browsed files
  */

  /**
  onBrowseFiles(target: any, type): void {
    this.readFiles(target.files, type);
  }**/
  