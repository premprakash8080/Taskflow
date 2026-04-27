const User = require('./userModel');
const Workspace = require('./workspaceModel');
const WorkspaceMember = require('./workspaceMemberModel');
const Notification = require('./notificationModel');
const ProjectMember = require('./projectMemberModel');
const Project = require('./projectModel');

// User aur Workspace → Many to Many (WorkspaceMember ke through)
User.belongsToMany(Workspace, {
  through: WorkspaceMember,
  foreignKey: 'user_id',
});

Workspace.belongsToMany(User, {
  through: WorkspaceMember,
  foreignKey: 'workspace_id',
});

// WorkspaceMember → User aur Workspace se belong karta hai
WorkspaceMember.belongsTo(User, { foreignKey: 'user_id' });
WorkspaceMember.belongsTo(Workspace, { foreignKey: 'workspace_id' });

// Workspace → Owner (User)
Workspace.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });
User.hasMany(Workspace, { foreignKey: 'owner_id', as: 'ownedWorkspaces' });

// Notifications
User.hasMany(Notification, { foreignKey: 'user_id' });
Notification.belongsTo(User, { foreignKey: 'user_id' });

Workspace.hasMany(Notification, { foreignKey: 'workspace_id' });
Notification.belongsTo(Workspace, { foreignKey: 'workspace_id' });

// Project ka owner
Project.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });
User.hasMany(Project, { foreignKey: 'owner_id', as: 'ownedProjects' });

// Project ka workspace
Project.belongsTo(Workspace, { foreignKey: 'workspace_id' });
Workspace.hasMany(Project, { foreignKey: 'workspace_id' });

// Project aur User → Many to Many (ProjectMember ke through)
User.belongsToMany(Project, {
  through: ProjectMember,
  foreignKey: 'user_id',
  as: 'memberProjects',
});
Project.belongsToMany(User, {
  through: ProjectMember,
  foreignKey: 'project_id',
  as: 'members',
});

ProjectMember.belongsTo(User, { foreignKey: 'user_id' });
ProjectMember.belongsTo(Project, { foreignKey: 'project_id' });


module.exports = { User, Workspace, WorkspaceMember, Notification, Project, ProjectMember };