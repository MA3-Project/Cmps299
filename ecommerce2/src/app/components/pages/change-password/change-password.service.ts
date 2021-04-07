import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {


  baseUrl = "https://localhost:44347/";
  constructor(private http: HttpClient) { }

  changePassword(data){
    return this.http.post(`${this.baseUrl}api/ApplicationUser/ChangePassword`, data);
  }

  /** 
  changePassword(userDetails:any) {
    const ChangePasswordModel = {
      oldPassword: userDetails.oldPassword,
      newPassword: userDetails.newPassword,
      confirmPassword: userDetails.newPassword,
      Email: userDetails.email
    };

    return this.http.post<any>(`${this.baseUrl}api/ApplicationUser/ChangePassword`, ChangePasswordModel, {
      headers: {Accept: 'multipart/form-data', 'X-XSRF-TOKEN': this.cookiService.get('XSRF-TOKEN')}
    })
    .pipe(
      map((result) => {
        return result;
      })
    );
  }
  **/

}
