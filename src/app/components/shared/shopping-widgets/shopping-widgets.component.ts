import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { BasketService } from '../services/basket.service';
import { Observable } from 'rxjs';
import { basketItem } from 'src/app/modals/basket-item';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-shopping-widgets',
  templateUrl: './shopping-widgets.component.html',
  styleUrls: ['./shopping-widgets.component.sass']
})
export class ShoppingWidgetsComponent implements OnInit {

  products: Product[];
  indexProduct: number;

  public sidenavMenuItems:Array<any>;

  @Input() shoppingbasketItems: basketItem[] = [];

  constructor(private BasketService: BasketService, public productService: ProductService) { }

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
