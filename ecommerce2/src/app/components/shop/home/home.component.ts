import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {Product} from "../../../modals/product.model";
import {CartItem} from "../../../modals/cart-item";
import {ProductService} from "../../shared/services/product.service";
import {CartService} from "../../shared/services/cart.service";
import { Router, NavigationEnd } from '@angular/router';
import { SidebarMenuService } from '../../shared/sidebar/sidebar-menu.service';
import { SidenavMenu } from '../../shared/sidebar/sidebar-menu.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public sidenavMenuItems:Array<any>;

  public currencies = ['USD', 'EUR', 'LP'];
  public currency:any;
  public flags = [
    { name:'English', image: 'assets/images/flags/gb.svg' },
    { name:'French', image: 'assets/images/flags/fr.svg' },
    { name:'German', image: 'assets/images/flags/de.svg' },
    { name:'Russian', image: 'assets/images/flags/ru.svg' },
    { name:'Turkish', image: 'assets/images/flags/tr.svg' }
  ]
  public flag:any;
  
  products: Product[];

  indexProduct: number;
  shoppingCartItems: CartItem[] = [];

  public banners = [];

  wishlistItems  :   Product[] = [];

  public url : any;

  navItems: SidenavMenu[] = [
    {
      displayName: 'Home',
      iconName: 'recent_actors',
      route: '/home',
    },
    {
      displayName: 'Products',
          iconName: 'feedback',
          route: '/home/products/all'
    },
    {
      displayName: 'Shop',
      iconName: 'movie_filter',
      children: [
        {
          displayName: 'Computers',
          iconName: 'group',
          children: [
            {
              displayName: 'Laptops',
              iconName: 'person',
              route: 'michael-prentice',
            },
            {
              displayName: 'Cables',
              iconName: 'person',
              route: 'stephen-fluin',
               },
            {
              displayName: 'Monitors',
              iconName: 'person',
              route: 'mike-brocchi',
           },
           {
            displayName: 'Tablets',
            iconName: 'person',
            route: 'mike-brocchi',
         },
         {
          displayName: 'Headsets',
          iconName: 'person',
          route: 'mike-brocchi',
       }
          ]
        },
        {
          displayName: 'Tv & Audio',
          iconName: 'speaker_notes',
          children: [
            {
              displayName: 'Tv',
              iconName: 'star_rate',
              route: 'material-design'
            },
            {
              displayName: 'Audio',
              iconName: 'star_rate',
              route: 'what-up-web'
            },
            {
              displayName: 'Video',
              iconName: 'star_rate',
              route: 'my-ally-cli'
            },
            {
              displayName: 'Dvd',
              iconName: 'star_rate',
              route: 'become-angular-tailer'
            }
          ]
        },
        {
          displayName: 'Phones',
          iconName: 'feedback',
          children: [
            {
              displayName: 'Mobile phones',
              iconName: 'star_rate',
              route: 'material-design'
            },
            {
              displayName: 'Power Bank',
              iconName: 'star_rate',
              route: 'what-up-web'
            },
            {
              displayName: 'Memory Cards',
              iconName: 'star_rate',
              route: 'my-ally-cli'
            },
            {
              displayName: 'Accesories',
              iconName: 'star_rate',
              route: 'become-angular-tailer'
            }
          ]
        },
        {
          displayName: 'Electronics',
          iconName: 'feedback',
          children: [
            {
              displayName: 'Washing Machines',
              iconName: 'star_rate',
              route: 'material-design'
            },
            {
              displayName: 'Water heater',
              iconName: 'star_rate',
              route: 'what-up-web'
            },
            {
              displayName: 'Cookers',
              iconName: 'star_rate',
              route: 'my-ally-cli'
            },
            {
              displayName: 'Cold stores',
              iconName: 'star_rate',
              route: 'become-angular-tailer'
            }
          ]
        }
      ]
    },
    {
      displayName: 'Pages',
      iconName: 'report_problem',
      children: [
        {
          displayName: 'About Us',
          iconName: 'group',
          route: '/pages/about'
        },
        {
          displayName: 'Contact',
          iconName: 'feedback',
          route: '/pages/contact'
        },
        {
          displayName: 'Wishlist',
          iconName: 'group',
          route: '/pages/wishlist'
        },
        {
          displayName: 'Checkout',
          iconName: 'feedback',
          route: '/pages/checkout'
        },
        {
          displayName: 'Basket',
          iconName: 'group',
          route: '/pages/basket'
        },
        {
          displayName: 'My Account',
          iconName: 'speaker_notes',
          route: '/pages/my-account',
        },
        {
          displayName: 'Login',
          iconName: 'speaker_notes',
          route: '/pages/login',
        },
        {
          displayName: 'Profile',
          iconName: 'speaker_notes',
          route: '/pages/profile',
        },
        {
          displayName: 'Register',
          iconName: 'speaker_notes',
          route: '/pages/register',
        },        
        {
          displayName: '404',
          iconName: 'feedback',
          route: '/pages/error'
        }
      ]
    },
    {
      displayName: 'Contact',
          iconName: 'feedback',
          route: '/pages/contact'
    }
  ];

  contentLoaded = false;

  public featuredProducts: Array<Product>;
  public onSaleProducts: Array<Product>;
  public topRatedProducts: Array<Product>;
  public newArrivalsProducts: Array<Product>;

  public slides = [
    { title: 'Huge sale', subtitle: 'Up to 70%', image: 'assets/images/carousel/banner1.jpg' },
    { title: 'Biggest discount', subtitle: 'Check the promotion', image: 'assets/images/carousel/banner2.jpg' },
    { title: 'Biggest sale', subtitle: 'Dont miss it', image: 'assets/images/carousel/banner3.jpg' },
    { title: 'Our best products', subtitle: 'Special selection', image: 'assets/images/carousel/banner4.jpg' },
    { title: 'Massive sale', subtitle: 'Only for today', image: 'assets/images/carousel/banner5.jpg' }
  ];

  constructor(private productService: ProductService, private cartService: CartService, public router: Router, public sidenavMenuService:SidebarMenuService) { 

    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    } )
  } 

  ngAfterViewInit() {
  }

  ngOnInit() {

    this.currency = this.currencies[0];
    this.flag = this.flags[0];

    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    this.productService.getProducts()
    .subscribe(
      (product: Product[]) => {
        this.products = product;
      }
    )
    this.productService.getBanners()
    .subscribe(
      data => this.banners = data
    );

    setTimeout(() => {
      this.contentLoaded = true;
    }, 3000);
  }

  signin() {
    this.router.navigateByUrl("pages/login");
  }

  Register() {
    this.router.navigateByUrl("pages/register");
  }

  signinSeller() {
    this.router.navigateByUrl("pages/seller-signin");
  }

  RegisterSeller() {
    this.router.navigateByUrl("pages/seller-registration");
  }

  profile() {
    this.router.navigateByUrl("pages/profile");
  }
  public changeCurrency(currency){
    this.currency = currency;
  }
  public changeLang(flag){
    this.flag = flag;
  }
}


