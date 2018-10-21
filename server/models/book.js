'use strict';
module.exports = (sequelize, DataTypes) => {
  var book = sequelize.define('book', {
    title: DataTypes.STRING,
    authors: DataTypes.STRING,
    description: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    banner: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  book.associate = function(models) {
    // associations can be defined here
    models.book.belongsTo(models.user);
    models.book.hasMany(models.quote);
    models.book.hasMany(models.note);
    models.book.belongsToMany(models.list, {through: 'listsBooks'});
    models.book.belongsToMany(models.club, {through: 'clubsBooks'});
  };
  return book;
};