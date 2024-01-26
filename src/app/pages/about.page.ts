import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <h2>Hello Analog</h2>

    Analog is a meta-framework on top of Angular.
    <nav>
      <ul>
        <li><a routerLink="/">Go Back Home</a></li>
      </ul>
    </nav>
  `,
  imports: [
    RouterLink
  ]
})
export default class AboutPageComponent {}
