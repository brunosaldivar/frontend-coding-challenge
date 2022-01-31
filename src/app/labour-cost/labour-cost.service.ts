import { Injectable } from '@angular/core';
import { DATA } from './mock.data'
import { Provider, ResponseDataProviders } from './provider'

import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map, Observable,of,throwError } from 'rxjs'
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class LabourCostService {
  
  providers : Provider[] | undefined
  totals: Provider | undefined;
  directContractors : Provider | undefined

  constructor(private http: HttpClient) {
    
  }

  private handleError(err:HttpErrorResponse){
    console.log('Handle http error');
    console.log(err.message);
    return new Error(err.message);
  }
  public getData() : Observable<ResponseDataProviders>{

    let url = environment.apiEndpoint;

    if(environment.fakeData){
      return of(
        { 
          providers: DATA[0].providers,
          total : DATA[0].total,
          directContractors : DATA[0].directContractors
      })
    }else{
      return this.http.get<Array<ResponseDataProviders>>(url).pipe(
        map((data) => data[0])
      );

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