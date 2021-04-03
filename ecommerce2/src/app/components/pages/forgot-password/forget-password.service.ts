import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  baseUrl = "https://localhost:44340/";
  constructor(private http: HttpClient) { }

  forgotPassword(data){
    return this.http.post(`${this.baseUrl}api/ApplicationUser/ForgotPassword`, data);
  }

  reset(data) {
    return this.http.post(`${this.baseUrl}api/ApplicationUser/ResetPassword`, data);
  }
}
