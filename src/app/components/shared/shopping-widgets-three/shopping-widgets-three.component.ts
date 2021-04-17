import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { BasketService } from '../services/basket.service';
import { Observable, of } from 'rxjs';
import { basketItem } from 'src/app/modals/basket-item';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-shopping-widgets-three',
  templateUrl: './shopping-widgets-three.component.html',
  styleUrls: ['./shopping-widgets-three.component.sass']
})
export class ShoppingWidgetsThreeComponent implements OnInit {

  public sidenavMenuItems:Array<any>;

  @Input() shoppingbasketItems: basketItem[] = [];

  constructor(private BasketService: BasketService, public productService: ProductService) {
  }

  ngOnInit() {
  }
  public updateCurrency(curr) {
    this.productService.currency = curr;
  }


  public removeItem(item: basketItem) {
    this.BasketService.removeFromBasket(item);
  }

  public getTotal(): Observable<number> {
    return this.BasketService.getTotalAmount();
  }


}











