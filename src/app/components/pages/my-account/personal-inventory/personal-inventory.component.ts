import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { Router } from '@angular/router';
import { CategoriesService } from '../../SharedServices/categories.service';

@Component({
  selector: 'app-personal-inventory',
  templateUrl: './personal-inventory.component.html',
  styleUrls: ['./personal-inventory.component.sass']
})
export class PersonalInventoryComponent implements OnInit {

  categories: {};
  subcategories: {};

  constructor(private service: CategoriesService, private route: Router) { }


  @ViewChild('submenu')
  set subMenu(value: MatMenu) {
    this.menuItems[1].elementRef = value;
  }

  selected: string;
  menuItems: Array<{ text: string, elementRef: MatMenu }> = [
    { text: "Tabledriven.Item1", elementRef: null },
    { text: "Tabledriven.Item2", elementRef: null },
  ];

  select(pText: string) {
    this.selected = pText;
  }
  ngOnInit(): void {
    this.service.getCategories().subscribe(data => this.categories = data, error => console.error(error));
    console.log(this.categories[0].category_nameEN);
  }

  getid(catId : number) {
    if (catId) {
      this.service.getSubCategories(catId).subscribe(
        data => {
          this.subcategories = data;
        }
      );
    } else {
      this.subcategories = null;
    }
  }
  goToAddItem() {
    this.route.navigate(["pages/add-item"]);
  }
}
