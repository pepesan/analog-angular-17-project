import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { useRenderInfo } from '../shared/render-info';

/**
 * SSR: el HTML se genera en el servidor en cada petición.
 * Los datos de /api/v1/time se piden en el servidor y se transfieren al
 * navegador (HTTP transfer cache), por lo que la hidratación no repite la petición.
 */
@Component({
  selector: 'app-ssr',
  imports: [RouterLink],
  template: `
    <h2>SSR (Server-Side Rendering)</h2>
    <p>
      Renderizada en: <strong data-testid="rendered-on">{{ info.renderedOn }}</strong>
    </p>
    <p>
      Hora de renderizado: <code data-testid="rendered-at">{{ info.renderedAt }}</code>
    </p>
    <p>
      Hora del servidor (API): <code data-testid="api-time">{{ time()?.iso ?? 'cargando...' }}</code>
    </p>
    <p>
      Carga la página directamente (F5): se renderiza en el servidor. Entrando desde un
      enlace de la home se renderiza en el navegador.
    </p>
    <nav>
      <ul>
        <li><a routerLink="/">Go Back Home</a></li>
      </ul>
    </nav>
  `,
})
export default class SsrPageComponent {
  readonly info = useRenderInfo('ssr');
  readonly time = toSignal(inject(HttpClient).get<{ iso: string }>('/api/v1/time'));
}
