import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { basketItem } from 'src/app/modals/basket-item';
import { BasketService } from '../services/basket.service';
import { SidebarMenuService } from '../sidebar/sidebar-menu.service';
import { AppSettings, Settings } from '../services/color-option.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  public sidenavMenuItems:Array<any>;

  public currencies = ['USD', 'EUR', 'LP'];
  public currency:any;
  public flags = [
    { name:'English', image: 'assets/images/flags/gb.svg' },
    { name:'French', image: 'assets/images/flags/fr.svg' },
    { name:'Arabic', image: 'assets/images/flags/lb.svg' }

  ]
  public flag:any;

  products: Product[];

  indexProduct: number;
  shoppingbasketItems: basketItem[] = [];
  public settings: Settings;

  constructor(private BasketService: BasketService, public appSettings:AppSettings) {
    this.settings = this.appSettings.settings;
    this.BasketService.getItems().subscribe(shoppingbasketItems => this.shoppingbasketItems = shoppingbasketItems);
  }

  ngOnInit() {
    this.currency = this.currencies[0];
    this.flag = this.flags[0];
  }

  public changeCurrency(currency){
    this.currency = currency;
  }
  public changeLang(flag){
    this.flag = flag;
  }

}
