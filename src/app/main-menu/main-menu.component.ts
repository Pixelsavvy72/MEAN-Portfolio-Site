import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  selectedCategory = '';

  constructor(private categoryService: CategoryService ) { }

  ngOnInit() {
  }

  onCategoryClick(category: string) {
    if (this.selectedCategory === category) {
      this.selectedCategory = '';
      this.categoryService.categorySelected.next(this.selectedCategory);
    } else {
      this.selectedCategory = category;
      this.categoryService.categorySelected.next(this.selectedCategory);
    }
  }

}
