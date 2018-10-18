'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    models.user.hasMany(models.list);
    models.user.hasMany(models.book);
    models.user.hasMany(models.quote);
    models.user.hasMany(models.note);
  };
  return user;
};