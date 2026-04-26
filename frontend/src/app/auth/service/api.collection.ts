import { environment } from 'src/environments/environment';

export const ENDPOINTS = {
  Login: environment.apiBaseUrl + '/api/auth/login',
  Register: environment.apiBaseUrl + '/api/auth/register',
  verifyToken: environment.apiBaseUrl + '/api/auth/verifyToken',

 
};
