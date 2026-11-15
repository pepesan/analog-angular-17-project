import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-home',
  template: `<h2>Sub</h2>
  <nav>
    <ul>
      <li><a routerLink="/sub/1">Product 1</a></li>
    </ul>
  </nav>
  <nav>
    <ul>
      <li><a routerLink="/">Go Back Home</a></li>
    </ul>
  </nav>
  <router-outlet></router-outlet>`,
  imports: [
    RouterOutlet,
    RouterLink
  ]
})
export default class HomePageComponent {}
