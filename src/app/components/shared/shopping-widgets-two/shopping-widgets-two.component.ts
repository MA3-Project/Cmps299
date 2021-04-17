import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { basketItem } from 'src/app/modals/basket-item';
import { BasketService } from '../services/basket.service';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-widgets-two',
  templateUrl: './shopping-widgets-two.component.html',
  styleUrls: ['./shopping-widgets-two.component.sass']
})
export class ShoppingWidgetsTwoComponent implements OnInit {

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
