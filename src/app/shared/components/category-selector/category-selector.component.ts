import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Observable, of } from 'rxjs';
import { Category, Subcategory } from '../../../core';
import { NgSelectOption } from '@angular/forms';

@Component({
    selector: 'app-category-selector',
    templateUrl: './category-selector.component.html',
    styleUrls: ['./category-selector.component.scss']
})
export class CategorySelectorComponent {
    public categories$: Observable<Category[]>;
    public subCategories$: Observable<Subcategory[]>;
    public subCategoriesAvailable: boolean = false;

    @Input()
    hasError: boolean = false;

    @Input()
    category: string;
    @Input()
    label: string = 'Category';
    @Input()
    subcategoriesVisible: boolean = true;
    @Input()
    subcategories: Array<string>;

    @Output()
    categoryChange = new EventEmitter<string>();
    @Output()
    subcategoriesChange = new EventEmitter<Array<string>>();

    constructor(categoryService: CategoryService) {
        this.categories$ = categoryService.getCategories();
    }
    selectCategory() {
        this.categoryChange.emit(this.category);
    }
    selectSubCategory() {
        this.subcategoriesChange.emit(this.subcategories);
    }
    categorySelected(selected: Array<NgSelectOption>) {
        // TODO: https://github.com/aspnet/EntityFrameworkCore/issues/10508
        // this.subCategoriesAvailable = Boolean(
        //     selected[0] && selected[0].data.children && selected[0].data.children.length !== 0
        // );
        // const ___temp = Boolean(
        //     selected[0] && selected[0].data.children && selected[0].data.children.length !== 0
        // );
        // if (___temp /*this.subCategoriesAvailable*/) {
        //     this.subCategories$ = of(selected[0].data.children);
        // }
    }
    subCategorySelected() {}
}
