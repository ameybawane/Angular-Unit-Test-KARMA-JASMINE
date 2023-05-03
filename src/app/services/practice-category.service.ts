import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PracticeCategoryService {

  selectedOption!: any;
  private readonly baseApiUrl: string = environment.baseApiUrl

  constructor(private http: HttpClient) { }

  getAllPracticeCategories(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + "PracticeCategory").pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => new Error(error.message))
      })
    )
  }


  getPracticeCategoryById(id: number): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + "PracticeCategory/" + id).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => new Error(error.message))
      })
    )
  }

  getPracticeCategoryByPracticeId(id: number): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + "PracticeCategory/PracticeID/" + id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(() => new Error(error.message))
        })
      )
  }

  editPracticeCategory(id: number, body: any): Observable<any> {
    return this.http.put<any>(this.baseApiUrl + "PracticeCategory/" + id, body).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => new Error(error.message))
      })
    )
  }

  deletePracticeCategory(id: number): Observable<any> {
    return this.http.delete<any>(this.baseApiUrl + "PracticeCategory/SoftDelete/" + id).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => new Error(error.message))
      })
    )
  }

  addPracticeCategory(body: any[]): Observable<any[]> {
    return this.http.post<any[]>(this.baseApiUrl + "PracticeCategory", body).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => new Error(error.message))
      })
    )
  }
}
