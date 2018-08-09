import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgxSelectOption } from 'ngx-select-ex';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';
import { Category, Subcategory } from '../../../core';

@Component({
    selector: 'app-category-selector',
    templateUrl: './category-selector.component.html',
    styleUrls: ['./category-selector.component.scss']
})
export class CategorySelectorComponent {
    public categories$: Observable<Array<Category>>;
    public subCategories$: Observable<Array<Subcategory>>;
    public subCategoriesAvailable: boolean = false;

    @Input() category: string;
    @Output() categoryChange = new EventEmitter<string>();

    @Input() subcategories: Array<string>;
    @Output() subcategoriesChange = new EventEmitter<Array<string>>();

    constructor(categoryService: CategoryService) {
        this.categories$ = categoryService.getCategories();
    }
    selectCategory() {
        console.log('category-selector.component', 'selectSubCategory', this.category);
        this.categoryChange.emit(this.category);
    }
    selectSubCategory() {
        console.log('category-selector.component', 'selectSubCategory', this.subcategories);
        this.subcategoriesChange.emit(this.subcategories);
    }
    categorySelected(selected: Array<NgxSelectOption>) {
        // TODO: https://github.com/aspnet/EntityFrameworkCore/issues/10508
        // this.subCategoriesAvailable = Boolean(
        //     selected[0] && selected[0].data.children && selected[0].data.children.length !== 0
        // );
        const ___temp = Boolean(
            selected[0] && selected[0].data.children && selected[0].data.children.length !== 0
        );
        if (___temp /*this.subCategoriesAvailable*/) {
            this.subCategories$ = Observable.of(selected[0].data.children);
        }
    }
    subCategorySelected() {}
}
