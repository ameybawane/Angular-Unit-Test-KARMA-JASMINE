import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseApiUrl: string = environment.baseApiUrl
  
  constructor(private http: HttpClient) { }

  public query = new BehaviorSubject<string>('');

  public getQuery(){
      return this.query;
  }

  public setQuery(queryStr: string){
      this.query.next(queryStr);
  }

  //https://localhost:7168/api/v1/PracticeReportUser
 //PracticeReportUser

getPracticeReportUsers(): Observable<any> {
  return this.http.get<any>(this.baseApiUrl + "PracticeReportUser").pipe(
    catchError((error: HttpErrorResponse) => {
      console.error(error);
      return throwError(() => new Error(error.message))
    })
  )
}
}