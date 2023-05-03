import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PracticeService {

  private baseApiUrl: string = environment.baseApiUrl

  formDataUpd: any = {

    practiceGroupName: '',
    isActive: true

  }
  constructor(private http: HttpClient) { }

  //PRACTICE

  getAllPractices(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + "Practice")
  }

  deletePractice(id: number): Observable<any> {
    return this.http.delete(this.baseApiUrl + "Practice/" + id)
  }

  softdeletePractice(id: number): Observable<any> {
    return this.http.delete(this.baseApiUrl + "Practice/Delete/" + id)
  }


  postPractice(practice: any): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + "Practice", practice)
  }

  getPracticebyId(id: number): Observable<any> {
    return this.http.get(this.baseApiUrl + 'Practice/' + id);
  }

  putPractice(id: number, value: any): Observable<any> {
    return this.http.put(this.baseApiUrl + 'Practice/' + id, value)
  }

  getAllPracticeGroups(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + 'PracticeGroup')
  }
}
