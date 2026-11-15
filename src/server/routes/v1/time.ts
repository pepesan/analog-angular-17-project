import { defineEventHandler } from 'h3';

// Devuelve la hora del servidor en cada petición (la usa el ejemplo SSR).
export default defineEventHandler(() => ({ iso: new Date().toISOString() }));
