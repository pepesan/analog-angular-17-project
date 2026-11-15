import handler from '../routes/v1/hello';

describe('GET /api/v1/hello', () => {
  it('returns the hello message', async () => {
    expect(await (handler as unknown as () => unknown)()).toEqual({
      message: 'Hello World',
    });
  });
});
