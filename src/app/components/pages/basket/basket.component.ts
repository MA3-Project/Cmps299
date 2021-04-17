import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { basketItem } from 'src/app/modals/basket-item';
import { BasketService } from '../../shared/services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass']
})
export class BasketComponent implements OnInit {

  public basketItems : Observable<basketItem[]> = of([]);
  public shoppingBasketItems  : basketItem[] = [];

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.basketItems = this.basketService.getItems();
    this.basketItems.subscribe(shoppingBasketItems => this.shoppingBasketItems = shoppingBasketItems);

  }


    // Remove basket items
    public removeItem(item: basketItem) {
      this.basketService.removeFromBasket(item);
    }


   // Increase Product Quantity
   public increment(product: any, quantity: number = 1) {
    this.basketService.updateBasketQuantity(product,quantity);
  }

  // Decrease Product Quantity
  public decrement(product: any, quantity: number = -1) {
    this.basketService.updateBasketQuantity(product,quantity);
  }
   // Get Total
   public getTotal(): Observable<number> {
    return this.basketService.getTotalAmount();
  }

}
