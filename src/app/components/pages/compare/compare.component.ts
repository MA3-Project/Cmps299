import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/modals/product.model';
import { ProductService } from '../../shared/services/product.service';
import { BasketService } from '../../shared/services/basket.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.sass']
})
export class CompareComponent implements OnInit {

  public product            :   Observable<Product[]> = of([]);
  public products           :   Product[] = [];

  constructor(private productService: ProductService, private basketService: BasketService) {

  }

  ngOnInit() {
    this.product = this.productService.getComapreProducts();
    this.product.subscribe(products => this.products = products);
    console.log(this.product);
  }

     // Add to basket
     public addToBasket(product: Product, quantity: number = 1) {
      this.basketService.addToBasket(product, quantity);
   }

   // Remove from compare list
   public removeItem(product: Product) {
     this.productService.removeFromCompare(product);
   }

}
