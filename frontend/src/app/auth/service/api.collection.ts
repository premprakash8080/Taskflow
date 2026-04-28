import { environment } from 'src/environments/environment';

const BASE = environment.apiBaseUrl;

export const ENDPOINTS = {

  // Auth
  Login:          `${BASE}/api/auth/login`,
  Register:       `${BASE}/api/auth/register`,
  Logout:         `${BASE}/api/auth/logout`,
  GetCurrentUser: `${BASE}/api/auth/me`,
  verifyToken:    `${BASE}/api/auth/verifyToken`,

  // User/Profile
  GetProfile:     `${BASE}/api/users/profile`,
  UpdateProfile:  `${BASE}/api/users/profile`,
  UpdateUserRole: (userId: number) => `${BASE}/api/users/${userId}/role`,

  // Notifications
  ListNotifications:    `${BASE}/api/notifications`,
  MarkNotificationRead: (id: number) => `${BASE}/api/notifications/${id}/read`,
};