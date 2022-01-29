import { Injectable } from '@angular/core';
import { DATA } from './mock.data'

import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable,throwError } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class LabourCostService {
  
  providers = DATA[0].providers;
  totals = DATA[0].total;
  constructor() { }

  private handleError(err:HttpErrorResponse){
    console.log('Handle http error');
    console.log(err.message);
    return new Error(err.message);
  }

  public getTotals(): any{
    return this.totals[0];
  }
  public getProviders(): any{
    return this.providers;
  }
}
/*

  private baseUrl = "https://vast-shore-74260.herokuapp.com/banks";
  public myCity = "MUMBAI"

  constructor(private _http : HttpClient) {
    console.log('Bank http service created');
  }

  private handleError(err:HttpErrorResponse){
    console.log('Handle http error');
    console.log(err.message);
    return Observable.throw(err.message);
  }


  public getBankBranches(): any {
    console.log('calling')
    let myResponse = this._http.get(this.baseUrl + '?city=' + this.myCity);
    return myResponse;
  }
   */