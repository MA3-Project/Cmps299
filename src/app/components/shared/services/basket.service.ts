import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { basketItem } from 'src/app/modals/basket-item';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subscriber } from 'rxjs';

// Get product from Localstorage
let products = JSON.parse(localStorage.getItem("basketItem")) || [];

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  _url = 'https://localhost:44313/';

  // Array
  public basketItems : BehaviorSubject<basketItem[]> = new BehaviorSubject([]);
  public observer : Subscriber<{}>;

  constructor(public snackBar: MatSnackBar, private http: HttpClient) {
    this.basketItems.subscribe(
      products => products = products
    );
  }

    // Get Products
  public getItems(): Observable<basketItem[]> {
    const itemsStream = new Observable(observer => {
      observer.next(products);
      observer.complete();
    });
    return <Observable<basketItem[]>>itemsStream;
  }

  // Add to basket
  public addToBasket(product: Product, quantity: number) {
    let message, status;
     var item: basketItem | boolean = false;
     // If Products exist
     let hasItem = products.find((items, index) => {
       if(items.product.id == product.id) {
         let qty = products[index].quantity + quantity;
         let stock = this.calculateStockCounts(products[index], quantity);
         if(qty != 0 && stock) {
           products[index]['quantity'] = qty;
           message = 'The product ' + product.name + ' has been added to basket.';
           status = 'success';
           this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
         }
         return true;
       }
    } );

    // If Products does not exist (Add New Products)
    if(!hasItem) {
      item = { product: product, quantity: quantity };
      products.push(item);
      message = 'The product ' + product.name + ' has been added to basket.';
      status = 'success';
      this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    }

     localStorage.setItem("basketItem", JSON.stringify(products));
     return item;

  }

  // Calculate Product stock Counts
  public calculateStockCounts(product: basketItem, quantity): basketItem | Boolean {
    let message, status;
    let qty   = product.quantity + quantity;
    let stock = product.product.stock;
    if(stock < qty) {
      // this.toastrService.error('You can not add more items than available. In stock '+ stock +' items.');
      this.snackBar.open('You can not choose more items than available. There are ' + stock + ' items currently in stock.', '×', { panelClass: [status] /**'error'**/, verticalPosition: 'top', duration: 3000 });
      return false
    }
    return true
  }

  // Removed in basket
  public removeFromBasket(item: basketItem) {
    if (item === undefined) return false;
      const index = products.indexOf(item);
      products.splice(index, 1);
      localStorage.setItem("basketItem", JSON.stringify(products));
  }

  // Total amount
  public getTotalAmount(): Observable<number> {
    return this.basketItems.pipe(map((product: basketItem[]) => {
      return products.reduce((prev, curr: basketItem) => {
        return prev + curr.product.price * curr.quantity;
      }, 0);
    }));
  }

  // Update Basket Value
  public updateBasketQuantity(product: Product, quantity: number): basketItem | boolean {
    return products.find((items, index) => {
      if(items.product.id == product.id) {
        let qty = products[index].quantity + quantity;
        let stock = this.calculateStockCounts(products[index], quantity);
        if (qty != 0 && stock)
          products[index]['quantity'] = qty;
        localStorage.setItem("basketItem", JSON.stringify(products));
        return true;
      }
    });
  }
}
