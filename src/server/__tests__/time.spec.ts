import handler from '../routes/v1/time';

describe('GET /api/v1/time', () => {
  it('returns a valid ISO timestamp', async () => {
    const { iso } = (await (handler as unknown as () => unknown)()) as { iso: string };
    expect(new Date(iso).toISOString()).toBe(iso);
  });
});
