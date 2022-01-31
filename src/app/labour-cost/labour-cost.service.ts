import { Injectable } from '@angular/core';
import { DATA } from './mock.data'
import { Provider, DataProviders } from './provider'

import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable,throwError } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class LabourCostService {
  
  providers : Provider[] | undefined
  totals: Provider | undefined;
  directContractors : Provider | undefined

  constructor() { }

  private handleError(err:HttpErrorResponse){
    console.log('Handle http error');
    console.log(err.message);
    return new Error(err.message);
  }
  public getData() : DataProviders{

    return {
      providers : DATA[0].providers,
      totals : DATA[0].total[0],
      directContractor : DATA[0].directContractors[0]
    }

  }
  public getTotals(): Provider | undefined{
    return this.totals;
  }
  public getProviders(): Provider[] | undefined{
    return this.providers;
  }
  public getDirectContractors(): Provider | undefined{
    return this.directContractors;
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