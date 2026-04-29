import { environment } from 'src/environments/environment';
const BASE = environment.apiBaseUrl;
export const ENDPOINTS = {
  ListMembers: `${BASE}/api/users`,
  InviteMember: `${BASE}/api/users/invite`,

  GetProjectsByWorkspace: `${BASE}/api/projects/getProjectsByWorkspace`,
  CreateProject: `${BASE}/api/projects/create`,
};