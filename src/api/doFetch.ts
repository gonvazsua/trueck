const Cookies = require('js-cookie');
export const doFetch: (url: string, options?: RequestInit) => Promise<Response> = async (
    url: string,
    options = {
        method: 'GET',
    }
) => {
    const xsrfCookie = Cookies.get('XSRF-TOKEN') || '';
    return await fetch(url, {
        ...options,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': xsrfCookie,
            'XSRF-TOKEN': xsrfCookie,
        },
    });
};