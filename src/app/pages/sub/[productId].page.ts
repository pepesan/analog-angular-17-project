import { Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterLink],
  template: `
    <h2>Product Details</h2>

    <h3>ID: {{ productId$ | async }}</h3>
    <nav>
      <ul>
        <li><a routerLink="/">Go Back Home</a></li>
      </ul>
    </nav>
  `,
})
export default class ProductDetailsPageComponent {
  private readonly route = inject(ActivatedRoute);

  readonly productId$ = this.route.paramMap.pipe(
    map((params) => params.get('productId'))
  );
}
