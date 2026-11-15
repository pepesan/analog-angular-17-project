import { PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { RenderInfo, useRenderInfo } from './render-info';

const key = makeStateKey<RenderInfo>('render-info:demo');

function run(platform: 'server' | 'browser') {
  TestBed.configureTestingModule({
    providers: [{ provide: PLATFORM_ID, useValue: platform }],
  });
  return TestBed.runInInjectionContext(() => useRenderInfo('demo'));
}

describe('useRenderInfo', () => {
  it('computes and serializes the info on the server', () => {
    const info = run('server');
    expect(info.renderedOn).toBe('servidor');
    expect(TestBed.inject(TransferState).get(key, null)).toEqual(info);
  });

  it('reuses the transferred info in the browser (hydration)', () => {
    const transferred: RenderInfo = { renderedOn: 'servidor', renderedAt: '2026-01-01T00:00:00.000Z' };
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    });
    TestBed.inject(TransferState).set(key, transferred);
    expect(TestBed.runInInjectionContext(() => useRenderInfo('demo'))).toEqual(transferred);
  });

  it('renders in the browser when there is no transferred state (client navigation)', () => {
    expect(run('browser').renderedOn).toBe('navegador');
  });
});
