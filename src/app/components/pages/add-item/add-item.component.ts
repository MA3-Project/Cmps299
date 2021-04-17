import { error, newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from '../SharedServices/categories.service';
import { AddItemService } from './add-item.service';
import { typesValues } from '../add-item/typesValues.model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.sass']
})
export class AddItemComponent implements OnInit {

  types = new typesValues();
  dataarray = [];
  ItemId: string = "";
  getTypes = [];
  getValues = [];
  checkedCategories: number[] = new Array();
  addItemForm: FormGroup;
  addSKUsForm: FormGroup;
  categories: {};
  subcategories = new Array();
  _id: number;
  _name: number;
  count: number = 1;

  constructor(private service: AddItemService, private router: Router, private catService: CategoriesService) { }

  ngOnInit(): void {
    this.dataarray.push(this.types);
    this.catService.getCategories().subscribe(data => this.categories = data);

    this.addItemForm = new FormGroup({
      ItemName: new FormControl("", Validators.required),
      CompanyName: new FormControl("", Validators.required),
      ItemDescription: new FormControl("", Validators.required),
      shippingCost: new FormControl("", Validators.required),
      Main_ImageID: new FormControl("", Validators.required),
      categories: new FormArray([], Validators.required),
      subCategories: new FormArray([], Validators.required),
      characteristicTypes: new FormArray([]),
      characteristicValues: new FormArray([])
    });

    this.addSKUsForm = new FormGroup({
      SKU: new FormControl("", Validators.required)
    });

    
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  onChange(cat: string, isChecked: boolean) {
    const categoriesArray = <FormArray>this.addItemForm.controls.categories;
    this._id = cat["category_ID"];
    this._name = cat["category_nameEN"];
    console.log(this._id);
    console.log(this._name);
    if (isChecked) {
      categoriesArray.push(new FormControl({ category_ID: this._id }));
      this.checkedCategories.push(this._id);
      this.catService.getSubCategories(this._id).subscribe(data => this.subcategories.push(data));
    }
    else {
      let index = categoriesArray.controls.findIndex(x => x.value == { category_ID: this._id });
      categoriesArray.removeAt(index);
      const index1 = this.checkedCategories.indexOf(this._id, 0);
      if (index1 > -1) {
        this.checkedCategories.splice(index1, 1);
        this.subcategories.splice(index1,1)
      }
    }
  }

  change(sub: string, isChecked: boolean) {
    const subcategoriesArray = <FormArray>this.addItemForm.controls.subCategories;
    const idd = sub["subCategoryID"];
    const name = sub["subCategory_NameEN"];
    if (isChecked) {
      subcategoriesArray.push(new FormControl({ subCategoryID: idd }));
      console.log(name);
    }
    else {
      let index = subcategoriesArray.controls.findIndex(x => x.value == { subCategoryID: idd });
      subcategoriesArray.removeAt(index);
    }
  }

  //onBlurMethod(type:string) {
  //  const typesArray = <FormArray>this.addItemForm.controls.characteristicTypes;
  //  if (type != "") {
  //    typesArray.push(new FormControl({ CharType: type }));
  //    console.log(type);
  //  }
  //  else {
  //    alert("Enter a characteristic type!");
  //  }
  //}

  //values(value: string) {
  //  const valuesArray = <FormArray>this.addItemForm.controls.characteristicValues;
  //  if (value != "") {
  //    var val = value.split("/"); 
  //    valuesArray.push(new FormControl({ CharValue: val }));
  //    console.log(val);
  //  }
  //  else {
  //    alert("Enter a characteristic value!");
  //  }
  //}

  add() {
    const type = new typesValues();
    this.dataarray.push(type);
  }

  remove(index) {
    this.dataarray.splice(index,1);
  }

  onSubmit() {

    const c = new Array();
    const s = new Array();
    const t = new Array();
    const v = new Array([]);
    console.log(this.addItemForm.value.categories.length);
    for (let i = 0; i < this.addItemForm.value.categories.length; i++) {
      c.push(this.addItemForm.value.categories[i].category_ID);
    }
    for (let j = 0; j < this.addItemForm.value.subCategories.length; j++) {
      s.push(this.addItemForm.value.subCategories[j].subCategoryID);
    }
    for (let a = 0; a < this.addItemForm.value.characteristicTypes.length; a++) {
      t.push(this.addItemForm.value.characteristicTypes[a].CharType);
    }
    for (let b = 0; b < this.addItemForm.value.characteristicValues.length; b++) {
      v.push(this.addItemForm.value.characteristicValues[b].CharValue);
    }

    const data = {
      "ItemName": this.addItemForm.value.ItemName,
      "CompanyName": this.addItemForm.value.CompanyName,
      "ItemDescription": this.addItemForm.value.ItemDescription,
      "shippingCost": parseFloat(this.addItemForm.value.shippingCost),
      "Main_ImageID": parseInt(this.addItemForm.value.Main_ImageID),
      "categories": c,
      "subCategories": s,
      "characteristicTypes": t,
      "characteristicValues": v
    }
    if (this.addItemForm.valid) {
      console.log(this.addItemForm.value);
      this.service.AddItem(data).subscribe(
        result => {
          console.log("Success!", result);
          this.ItemId = result;
          console.log(this.ItemId);
          this.service.GetItemTypes(result).subscribe(data => { this.getTypes.push(data); console.log(this.getTypes); });
          console.log(this.dataarray);
        },
        error => {
          console.log(JSON.parse(JSON.stringify(error)));
        });
    }
  }
}

