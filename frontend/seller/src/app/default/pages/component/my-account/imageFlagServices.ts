import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ImageDataService {
  private profiles: any ;
 

  

  constructor() {

  }

  setDataProfileDetails(value: any) {
    this.profiles = value;
  }

  
  getDataProfileDetails(){
    return this.profiles;
  }

 
}
