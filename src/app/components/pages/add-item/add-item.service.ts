import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddItemService {

  _url = "http://localhost:8342/";
    reqHeader: HttpHeaders | { [header: string]: string | string[]; };
  constructor(private http: HttpClient) { }

  AddItem(data) {
    return this.http.post(`${this._url}api/Items/AddItem`, data, { responseType: "text" });
  }

  GetItemTypes(item_ID  : string) {
    return this.http.get(`${this._url}api/CharacteristicTypes/GetTypes/${item_ID}`, { responseType: "json" })
  }

  GetItemValues(item_ID: string, T_id:string) {
    return this.http.get(`${this._url}api/CharacteristicTypes/GetTypes/${item_ID}/${T_id}`, { responseType: "json" })
  }
}
