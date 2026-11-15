import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { useRenderInfo } from '../shared/render-info';

/**
 * SSG: esta ruta está en `prerender.routes` (vite.config.ts), así que su HTML
 * se genera una sola vez durante `npm run build` y se sirve como fichero estático.
 */
@Component({
  selector: 'app-ssg',
  imports: [RouterLink],
  template: `
    <h2>SSG (Static Site Generation)</h2>
    <p>
      Renderizada en: <strong data-testid="rendered-on">{{ info.renderedOn }}</strong>
    </p>
    <p>
      Generada el: <code data-testid="rendered-at">{{ info.renderedAt }}</code>
    </p>
    <p>
      Recarga varias veces tras <code>npm run build</code>: la fecha no cambia, porque es
      la del build. En desarrollo (<code>npm start</code>) se renderiza bajo demanda.
    </p>
    <nav>
      <ul>
        <li><a routerLink="/">Go Back Home</a></li>
      </ul>
    </nav>
  `,
})
export default class SsgPageComponent {
  readonly info = useRenderInfo('ssg');
}
