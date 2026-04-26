const UserModel = require("../models/userModel");
const NotificationsModel = require("../models/notificationModel");
const WorkspaceMemberModel = require("../models/workspaceMemberModel");
const workspaceModel = require("../models/workspaceModel");

const preData = require("../config/preData.json");

//Handle Pre-population of data if Permissions, Roles or RolePermissions tables are empty with static data
const initiatePreData = async () => {

  await UserModel.sync();
  await NotificationsModel.sync();
  await WorkspaceMemberModel.sync();
  await workspaceModel.sync();




  
  //Add one super admin
  let users = await UserModel.findAll();
  if (users.length == 0) {
    await UserModel.bulkCreate(preData.users);
  }
};

module.exports = initiatePreData;
