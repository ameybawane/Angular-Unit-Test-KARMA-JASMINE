import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { IPracticeGroup } from '../interface/ipractice-group';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PracticeGroupService {
  
  private baseApiUrl: string = environment.baseApiUrl

  constructor(private http: HttpClient) { }

  public query = new BehaviorSubject<string>('');

  public getQuery(){
      return this.query;
  }

  public setQuery(queryStr: string){
      this.query.next(queryStr);
  }


 //PRACTICE GROUP
 postPracticeGroup(value: IPracticeGroup) {
  return this.http.post<IPracticeGroup>(this.baseApiUrl + 'PracticeGroup', value);
}

getPRbyId(id: number): Observable<any> {
  return this.http.get(this.baseApiUrl + 'PracticeGroup/' + id);
}

putPracticeGroup(id: number, value: any): Observable<any> {
  return this.http.put(this.baseApiUrl + 'PracticeGroup/' + id, value)
}

getAllPracticeGroups(): Observable<any> {
  return this.http.get<any>(this.baseApiUrl + 'PracticeGroup')
}

deletePracticeGroup(id: number): Observable<any> {
  return this.http.delete(this.baseApiUrl + "PracticeGroup/" + id)
}

softdeletePracticeGroup(id: number): Observable<any> {
  return this.http.delete(this.baseApiUrl + "PracticeGroup/SoftDelete/" + id)
}
}