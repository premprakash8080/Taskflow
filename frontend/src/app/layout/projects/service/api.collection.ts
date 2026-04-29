import { environment } from 'src/environments/environment';

const BASE = environment.apiBaseUrl;

export const ENDPOINTS = {

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