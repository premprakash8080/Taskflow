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
  ListMembers:    `${BASE}/api/users`,
  InviteMember:   `${BASE}/api/users/invite`,
  UpdateUserRole: (userId: number) => `${BASE}/api/users/${userId}/role`,

  // Notifications
  ListNotifications:    `${BASE}/api/notifications`,
  MarkNotificationRead: (id: number) => `${BASE}/api/notifications/${id}/read`,

  // Projects ⬅️ Add
  ListProjects:         `${BASE}/api/projects`,
  CreateProject:        `${BASE}/api/projects`,
  GetProject:           (projectId: number) => `${BASE}/api/projects/${projectId}`,
  UpdateProject:        (projectId: number) => `${BASE}/api/projects/${projectId}`,
  DeleteProject:        (projectId: number) => `${BASE}/api/projects/${projectId}`,
  GetProjectMembers:    (projectId: number) => `${BASE}/api/projects/${projectId}/members`,
  AddProjectMember:     (projectId: number) => `${BASE}/api/projects/${projectId}/members`,
  RemoveProjectMember:  (projectId: number, userId: number) => `${BASE}/api/projects/${projectId}/members/${userId}`,
  GetProjectMetrics:    (projectId: number) => `${BASE}/api/projects/${projectId}/metrics`,
};