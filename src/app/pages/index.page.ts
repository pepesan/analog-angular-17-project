import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div>
      <a href="https://analogjs.org/" target="_blank">
        <img alt="Analog Logo" class="logo analog" src="/analog.svg"/>
      </a>
      <a routerLink="/">Go Home</a>
      <a routerLink="/sub">Go Sub Home</a>
      <a routerLink="/about">Go About</a>
      <a routerLink="/products/1">Producto 1</a>
      <a routerLink="/products/2">Producto 2</a>
      <a routerLink="/otra_ruta">Not found1</a>
    </div>

    <h2>Analog</h2>

    <h3>The fullstack meta-framework for Angular!</h3>

    <div class="card">
      <button type="button" (click)="increment()">Count {{ count }}</button>
    </div>

    <p class="read-the-docs">
      For guides on how to customize this project, visit the
      <a href="https://analogjs.org" target="_blank">Analog documentation</a>
    </p>
  `,
  styles: [
    `
      .logo {
        will-change: filter;
      }

      .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
      }

      .logo.angular:hover {
        filter: drop-shadow(0 0 2em #42b883aa);
      }

      .read-the-docs {
        color: #888;
      }
    `,
  ],
  imports: [
    RouterLink
  ]
})
export default class HomeComponent {
  count = 0;

  increment() {
    this.count++;
  }
}
