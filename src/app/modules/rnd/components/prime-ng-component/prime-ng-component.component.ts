import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {SelectItem} from 'primeng/api';
interface City {
  name: string,
  code: string
}



@Component({
  selector: 'app-prime-ng-component',
  templateUrl: './prime-ng-component.component.html',
  styleUrls: ['./prime-ng-component.component.scss']
})


export class PrimeNgComponentComponent implements OnInit {
  cities: City[];

  selectedCity1:SelectItem[];

  
  


  constructor(
   
  ) {
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
    
  }

  

  ngOnInit(): void {
   
    
  }
  
  
  onSubmit() {
    
    //console.log("Form Valuee2", this.form.value)

    // console.log("DropDownValue",  parseInt(this.form.value.selectedCity.code))
    // console.log("Form Valuee1", this.form.value)
    // this.form.setValue({
    //   selectedCity: parseInt(this.form.value.selectedCity.code)
    // }) 
    // console.log("Form Valuee2", this.form.value)
  }

  // clearFilter(dropdown) {
  //   console.log("dropdownValue", dropdown.selectedOption.value.codes)
  //   dropdown.resetFilter();
  // }
}


