import { doFetch } from './doFetch';

jest.mock('js-cookie', () => ({
  get: () => 'test-cookie',
}));

describe('doFetch', () => {
  beforeAll(() => {
    jest.spyOn(window, 'fetch');
  });

  it('should add headers to fetch call', async () => {
    const url = '/some-url';
    await doFetch(url);

    expect(window.fetch).toBeCalledWith(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': 'test-cookie',
        'XSRF-TOKEN': 'test-cookie',
      },
    });
  });

  it('should add corresponding HTTP method and body to fetch call', async () => {
    const url = '/some-url';
    const testBody = { test: 'test' };
    const targetMethod = 'PUT';
    await doFetch(url, { method: targetMethod, body: JSON.stringify(testBody) });

    expect(window.fetch).toBeCalledWith(url, {
      method: targetMethod,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': 'test-cookie',
        'XSRF-TOKEN': 'test-cookie',
      },
      body: JSON.stringify(testBody),
    });
  });
});
