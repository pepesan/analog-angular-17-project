import { Component, afterNextRender, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-skip-hydration',
  host: { ngSkipHydration: 'true' },
  template: `<p data-testid="skip-hydration">
    Este componente usa <code>ngSkipHydration</code>: Angular lo vuelve a crear en el
    navegador en lugar de hidratarlo. Contador: {{ count() }}
    <button type="button" (click)="count.update((n) => n + 1)">+1</button>
  </p>`,
})
export class SkipHydrationComponent {
  readonly count = signal(0);
}

@Component({
  selector: 'app-hydration',
  imports: [RouterLink, SkipHydrationComponent],
  template: `
    <h2>Hidratación</h2>
    <p>
      ¿Hidratada ya?
      <strong data-testid="hydrated">{{ hydrated() ? 'sí' : 'no' }}</strong>
      (el servidor siempre envía «no»; <code>afterNextRender</code> solo corre en el navegador)
    </p>

    <h3>Hidratación completa + event replay</h3>
    <button type="button" (click)="count.update((n) => n + 1)">
      Clics: {{ count() }}
    </button>
    <p>Los clics dados antes de hidratar se reproducen gracias a <code>withEventReplay()</code>.</p>

    <h3>Hidratación incremental</h3>
    @defer (hydrate on interaction) {
      <button type="button" (click)="deferred.update((n) => n + 1)">
        Bloque diferido: {{ deferred() }}
      </button>
    } @placeholder {
      <p>Placeholder</p>
    }

    <h3>Sin hidratación</h3>
    <app-skip-hydration />

    <nav>
      <ul>
        <li><a routerLink="/">Go Back Home</a></li>
      </ul>
    </nav>
  `,
})
export default class HydrationPageComponent {
  readonly hydrated = signal(false);
  readonly count = signal(0);
  readonly deferred = signal(0);

  constructor() {
    afterNextRender(() => this.hydrated.set(true));
  }
}
