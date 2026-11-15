import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink],
  template: `
    <h2>Product Details</h2>

    <h3>ID: {{ productId() }}</h3>
    <nav>
      <ul>
        <li><a routerLink="/">Go Back Home</a></li>
      </ul>
    </nav>
  `,
})
export default class ProductDetailsPageComponent {
  private readonly route = inject(ActivatedRoute);

  readonly productId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('productId'))),
    { initialValue: this.route.snapshot.paramMap.get('productId') },
  );
}
