'use strict';
module.exports = (sequelize, DataTypes) => {
  var club = sequelize.define('club', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    admin: DataTypes.STRING,
    topic: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    bookImg: DataTypes.STRING
  }, {});
  club.associate = function(models) {
    // associations can be defined here
    models.club.hasMany(models.post);
    models.club.belongsToMany(models.user, {through: 'clubsUsers'});
    models.club.belongsToMany(models.book, {through: 'clubsBooks'});
  };
  return club;
};