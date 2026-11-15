import { PLATFORM_ID, TransferState, inject, makeStateKey } from '@angular/core';
import { isPlatformServer } from '@angular/common';

export interface RenderInfo {
  /** Dónde se generó el HTML inicial de esta página. */
  renderedOn: 'servidor' | 'navegador';
  /** Cuándo se generó (en SSG, el momento del build). */
  renderedAt: string;
}

/**
 * Guarda en TransferState dónde y cuándo se renderizó la página por primera vez.
 * - En el servidor (SSR o SSG) lo calcula y lo serializa en el HTML.
 * - En el navegador, si existe, lo reutiliza (la hidratación no lo recalcula);
 *   si no existe (navegación del lado cliente) la página se genera en el navegador.
 */
export function useRenderInfo(name: string): RenderInfo {
  const state = inject(TransferState);
  const key = makeStateKey<RenderInfo>(`render-info:${name}`);

  if (isPlatformServer(inject(PLATFORM_ID))) {
    const info: RenderInfo = {
      renderedOn: 'servidor',
      renderedAt: new Date().toISOString(),
    };
    state.set(key, info);
    return info;
  }

  const transferred = state.get(key, null);
  if (transferred) {
    state.remove(key);
    return transferred;
  }
  return { renderedOn: 'navegador', renderedAt: new Date().toISOString() };
}
