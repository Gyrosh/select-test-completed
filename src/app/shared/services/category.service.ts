import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/shared/interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Promise<Category[]> {
    return this.http
      .get<Category[]>('assets/mocks/categories.json')
      .toPromise()
      .then((categories: Category[]) => {
        return categories;
      });
  }
}
