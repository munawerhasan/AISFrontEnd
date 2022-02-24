import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment, managementService } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
  getUserSessionDetailBySchoolId(id) {
    return this.http.get(`${environment.baseUrl}${managementService.getUserSessionDetailBySchoolId}${'?schoolId=' + id}`);
  }
}
