import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/modals/product.model';
import { BasketService } from '../../shared/services/basket.service';
import { WishlistService } from '../../shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.sass']
})
export class WishlistComponent implements OnInit {

  public product        :   Observable<Product[]> = of([]);
  wishlistItems  :   Product[] = [];

  constructor(private basketService: BasketService, private wishlistService: WishlistService) {
    this.product = this.wishlistService.getProducts();
    this.product.subscribe(products => this.wishlistItems = products);
  }

  ngOnInit() {
  }

   // Add to basket
 public addToBasket(product: Product,  quantity: number = 1) {
  if (quantity > 0)
    this.basketService.addToBasket(product,quantity);
   this.wishlistService.removeFromWishlist(product);
}

// Remove from wishlist
public removeItem(product: Product) {
 this.wishlistService.removeFromWishlist(product);
}

}
