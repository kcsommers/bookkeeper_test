'use strict';
module.exports = (sequelize, DataTypes) => {
  var list = sequelize.define('list', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  list.associate = function(models) {
    // associations can be defined here
    models.list.belongsTo(models.user);
    models.list.belongsToMany(models.book, {through: 'listsBooks'});
  };
  return list;
};