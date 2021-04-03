import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  _url = 'https://localhost:44340/';

  constructor(private http: HttpClient) { }

  register(data) {
    return this.http.post<any>(`${this._url}api/ApplicationUser/Register`, data);
  }

  registerSeller(data) {
    return this.http.post<any>(`${this._url}api/ApplicationUser/RegisterSeller`, data);
  }

  getUsernames() {
    return this.http.get(`${this._url}api/ApplicationUser/GetUserNames`);
  }

  login(data) {
    return this.http.post(this._url + 'api/ApplicationUser/Login', data);
  }
}
