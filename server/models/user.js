'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    location: DataTypes.STRING,
    image: DataTypes.STRING,
    banner: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    models.user.hasMany(models.list);
    models.user.hasMany(models.quote);
    models.user.hasMany(models.note);
    models.user.hasMany(models.post);
    models.user.belongsToMany(models.book, {through: 'usersBooks'});
    models.user.belongsToMany(models.club, {through: 'clubsUsers'});
  };
  return user;
};