import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment, subjectServices } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SubjectTopicService {

  constructor(
    private http:HttpClient
  ) { }

  addSubjectWithTopic(data:any){
    return this.http.post<any>(`${environment.baseUrl}${subjectServices.addSubjectWithTopicAPI}`, data);
  }
}
