import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomEncoder } from '../../shared/CustomEncoder';

@Injectable({
  providedIn: 'root'
})
export class EmailConfirmationService {

  url = "https://localhost:44347";
  constructor(private http: HttpClient) { }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  public confirmEmail(route: string, token: string, email: string) {
    let params = new HttpParams({ encoder: new CustomEncoder() })
    params = params.append('token', token);
    params = params.append('email', email);

    return this.http.get(this.createCompleteRoute(route, this.url), { params: params, responseType: 'text' });
  }
}
