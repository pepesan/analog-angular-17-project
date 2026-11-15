import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import HydrationPageComponent from './hydration.page';
import SsgPageComponent from './ssg.page';
import SsrPageComponent from './ssr.page';

const providers = [provideRouter([]), provideHttpClient(), provideHttpClientTesting()];

describe('rendering examples', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers }));

  it('ssr page shows the API time once loaded', () => {
    const fixture = TestBed.createComponent(SsrPageComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('[data-testid="api-time"]')?.textContent).toBe('cargando...');

    TestBed.inject(HttpTestingController)
      .expectOne('/api/v1/time')
      .flush({ iso: '2026-01-01T00:00:00.000Z' });
    fixture.detectChanges();
    expect(el.querySelector('[data-testid="api-time"]')?.textContent).toBe('2026-01-01T00:00:00.000Z');
    expect(el.querySelector('[data-testid="rendered-on"]')?.textContent).toBe('navegador');
  });

  it('ssg page shows when it was rendered', () => {
    const fixture = TestBed.createComponent(SsgPageComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-testid="rendered-at"]')?.textContent).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it('hydration page flags itself as hydrated after the first render and counts clicks', async () => {
    const fixture = TestBed.createComponent(HydrationPageComponent);
    await fixture.whenStable();
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('[data-testid="hydrated"]')?.textContent).toBe('sí');

    el.querySelector<HTMLButtonElement>('button')!.click();
    fixture.detectChanges();
    expect(el.querySelector('button')?.textContent).toContain('Clics: 1');
  });
});
