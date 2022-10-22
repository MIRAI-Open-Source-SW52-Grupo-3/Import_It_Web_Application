import { Component, OnInit } from '@angular/core';
import { ProductCategory } from "./model/product-category";
import { CalculatorService } from "./services/calculator.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private calculatorService: CalculatorService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  calculatorForm: FormGroup = this.formBuilder.group({
    categoryName: ['',{validators: [Validators.required], updateOn:'change'}]
  });

  get categoryName() {
    return this.calculatorForm.get('categoryName');
  }

  selectedValue: string = "";
  imgURL: string = "";

  productCategories: ProductCategory[] = [];

  getApproximatedCost(subtotal: string, comission:string) {
    return Number(subtotal) + Number(comission);
  }

  getSelectedValue(category: string) {
    this.selectedValue = category;
    this.getImageUrl();
  }

  getImageUrl() {
    for (let product of this.productCategories) {
      if (product.name == this.selectedValue) {
        this.imgURL = product.imgURL;
      }
    }
    return;
  }

  getCategories() {
    this.calculatorService.getAll().subscribe((response: any) => {
      this.productCategories = response;
      console.log(this.productCategories);
    });
  }

}
