import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../demo/service/productservice';
import { PhotoService } from '../../../../demo/service/photoservice';
import { Product } from '../../../../demo/domain/product';
import { HttpClient } from '@angular/common/http';
import { Image } from '../../../../demo/domain/image';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  products: Product[];

    images: any[];

    galleriaResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '960px',
            numVisible: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    carouselResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    constructor(private httpClient:HttpClient, private productService: ProductService, private photoService: PhotoService) {}

    ngOnInit() {
        this.productService.getProductsSmall().then(products => {
            this.products = products;
        });
        
        this.photoService.getImages().then(images => {
            this.images = images;
        });


    }

}
