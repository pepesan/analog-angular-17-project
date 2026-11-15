import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import AboutPageComponent from './about.page';
import HomeComponent from './index.page';
import PageNotFoundComponent from './[...page-not-found].page';
import ProductDetailsPageComponent from './products.[productId].page';
import NestedProductDetailsPageComponent from './sub/[productId].page';
import SubHomePageComponent from './sub/(home).page';

function render(component: Type<unknown>, providers: unknown[] = []) {
  TestBed.configureTestingModule({
    imports: [component],
    providers: [provideRouter([]), ...(providers as [])],
  });
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

function routeWithProduct(productId: string) {
  const paramMap = convertToParamMap({ productId });
  return {
    provide: ActivatedRoute,
    useValue: { paramMap: of(paramMap), snapshot: { paramMap } },
  };
}

describe('pages', () => {
  it('home increments the counter', () => {
    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Count 0');

    button.click();
    fixture.detectChanges();
    expect(button.textContent).toContain('Count 1');
  });

  it('home links to the main routes', () => {
    const hrefs = Array.from(render(HomeComponent).querySelectorAll('a[href]')).map(
      (a) => a.getAttribute('href'),
    );
    expect(hrefs).toEqual(
      expect.arrayContaining(['/', '/sub', '/about', '/products/1', '/products/2']),
    );
  });

  it('about shows its heading and a link home', () => {
    const el = render(AboutPageComponent);
    expect(el.querySelector('h2')?.textContent).toBe('Hello Analog');
    expect(el.querySelector('a')?.getAttribute('href')).toBe('/');
  });

  it('not-found shows its heading and a link home', () => {
    const el = render(PageNotFoundComponent);
    expect(el.querySelector('h2')?.textContent).toBe('Page Not Found');
    expect(el.querySelector('a')?.getAttribute('href')).toBe('/');
  });

  it('sub home lists the nested product inside a list', () => {
    const el = render(SubHomePageComponent);
    expect(el.querySelector('ul > li > a[href="/sub/1"]')).not.toBeNull();
  });

  it.each([
    ['product', ProductDetailsPageComponent],
    ['nested product', NestedProductDetailsPageComponent],
  ])('%s page shows the route productId', (_name, component) => {
    const el = render(component, [routeWithProduct('42')]);
    expect(el.querySelector('h3')?.textContent).toBe('ID: 42');
  });
});
