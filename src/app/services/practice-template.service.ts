import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PracticeTemplateService {
  private baseApiUrl: string = environment.baseApiUrl
  constructor(private http: HttpClient) { }

  getPracticeTemplateByPracticeCategoryId(id:number): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + "PracticeTemplate/GetPracticeTemplatesByPracticeCategoryId/"+id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(() => new Error(error.message))
        })
      )
  }

  getAllPracticeTemplate(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + "PracticeTemplate").pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => new Error(error.message))
      })
    )
  }

  addPracticeTemplate(body: any[]): Observable<any[]> {
    return this.http.post<any[]>(this.baseApiUrl + "PracticeTemplate/CreatePracticeTemplateList", body)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(() => new Error(error.message))
        })
      )
  }


  getPracticeTemplateById(id: number): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + "PracticeTemplate/" + id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(() => new Error(error.message))
        })
      )
  }


  editPracticeTemplate(id: number, body: any): Observable<any> {
    return this.http.put<any>(this.baseApiUrl + "PracticeTemplate/" + id, body)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(() => new Error(error.message))
        })
      )
  }
  

  deletePracticeTemplate(id: number): Observable<any> {
    return this.http.delete<any>(this.baseApiUrl + "PracticeTemplate/PracticeTemplateDelete/" + id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(() => new Error(error.message))
        })
      )
  }
}
