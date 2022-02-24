import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, classServices,subjectServices } from 'src/environments/environment';
import { ClassWithSectionModel } from '../../models/map-class-section/mapClassSection';

@Injectable({
  providedIn: 'root'
})
export class ClasssectionmappingService {

  constructor(private http: HttpClient) { }

  getClassListBySchoolIdAndStatusAPI(schoolId, status) {
    return this.http.get<any>(`${environment.baseUrl}${classServices.getClassListBySchoolIdAndStatusAPI}${'?schoolId=' + schoolId + '&status=' + status}`);
  }
  MapClassClassSectionBatch(mappingData) {
    return this.http.post<any>(`${environment.baseUrl}${classServices.mapClassWithSection}`, mappingData);
  }
}
