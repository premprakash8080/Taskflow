const User = require('./userModel');
const Workspace = require('./workspaceModel');
const WorkspaceMember = require('./workspaceMemberModel');
const Notification = require('./notificationModel');

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

module.exports = { User, Workspace, WorkspaceMember, Notification };