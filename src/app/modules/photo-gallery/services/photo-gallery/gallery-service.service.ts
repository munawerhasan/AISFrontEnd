import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class GalleryServiceService {

  constructor(private http:HttpClient) { }
  getAllPhotos(){
    return 
  }
}
