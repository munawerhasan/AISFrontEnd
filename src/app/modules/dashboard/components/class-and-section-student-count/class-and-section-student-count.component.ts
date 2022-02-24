import { Component, OnInit , ViewChild} from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Product } from '../../../../demo/domain/product';
import { ProductService } from '../../../../demo/service/productservice';
import { AuthService } from "../../../../core/auth/auth.service";
import {Table} from 'primeng/table';
@Component({
  selector: 'app-class-and-section-student-count',
  templateUrl: './class-and-section-student-count.component.html',
  styleUrls: ['./class-and-section-student-count.component.scss']
})
export class ClassAndSectionStudentCountComponent implements OnInit {
  first = 0;
  rows = 10;
  currentUserName: string;
  currentUserSchoolName: string;
  products: Product[];
  dropdownItem: SelectItem[];
  barData: any;
  
  countData: any;
  
  
  @ViewChild('dt') table: Table;
  constructor(
    private productService: ProductService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.currentUserName = this.authService.currentUserValue.name;
    this.currentUserSchoolName = this.authService.currentUserValue.schoolName;
    this.productService.getProducts().then(data => this.products = data);

    this.dropdownItem = [];
    this.dropdownItem.push({ label: 'Select One', value: null });
    this.dropdownItem.push({ label: 'Xbox One', value: { id: 1, name: 'Xbox One', code: 'XO' } });
    this.dropdownItem.push({ label: 'PS4', value: { id: 2, name: 'PS4', code: 'PS4' } });
    this.dropdownItem.push({ label: 'Wii U', value: { id: 3, name: 'Wii U', code: 'WU' } });

    this.barData = {
      labels: ['NUR', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'],
      datasets: [
        {
          label: 'A',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          fill: false,
          data: [65, 28, 40, 55, 40, 80, 25, 10, 10, 50, 22, 54, 60]
        },
        {
          label: 'B',
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgb(54, 162, 235)',
          fill: false,
          data: [55, 40, 70, 25, 0, 10, 50, 22, 64, 50, 85, 53, 76]
        },
        {
          label: 'C',
          backgroundColor: 'rgb(54, 162, 25)',
          borderColor: 'rgb(54, 162, 235)',
          fill: false,
          data: [40, 35, 65, 25, 0, 10, 40, 22, 64, 40, 85, 54, 40]
        },

      ]
    };

    

    this.countData = [
      { className: 'NUR', A: 65, B: 55, C: 40 },
      { className: 'NUR', A: 40, B: 25, C: 50},
      { className: 'NUR', A: 40, B: 25, C: 50 },
      { className: 'NUR', A: 25, B: 50, C: 40 },
      { className: 'LKG', A: 35,  B: 55, C: 50 },
      { className: 'LKG', A: 40,  B: 85, C: 40 },
      { className: 'LKG', A: 55,  B: 25, C: 50 },
      { className: 'UKG', A: 62,  B: 35, C: 70},
      { className: 'UKG', A: 45,  B: 25, C: 50},
      { className: 'UKG', A: 28,  B: 75, C: 40 },
      { className: 'I', A: 28,  B: 25, C: 50 },
      { className: 'I', A: 45,  B: 40, C: 70 },
      { className: 'I', A: 68,  B: 67, C: 10 },
      { className: 'II',A: 88,  B: 25, C: 80},
      { className: 'II',A: 79,  B: 45, C: 70},
      { className: 'II',A: 44,  B: 25, C: 50 },
    ]
   
    
  }


}
