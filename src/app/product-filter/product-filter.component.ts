import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$;

  @Input('categoryToFilter') categoryToFilter;

  constructor(private categoryService: CategoryService) 
  { 
    this.categories$ = this.categoryService.getCategories()
  }

}
