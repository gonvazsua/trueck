const isProdEnv = process.env.NODE_ENV === 'production';

export const API_HOST_NAME = isProdEnv ? '/url/to/prod' : 'http://localhost:8080';
