'use strict';
module.exports = (sequelize, DataTypes) => {
  var clubsUsers = sequelize.define('clubsUsers', {
    clubId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  clubsUsers.associate = function(models) {
    // associations can be defined here
  };
  return clubsUsers;
};