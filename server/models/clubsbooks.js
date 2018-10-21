'use strict';
module.exports = (sequelize, DataTypes) => {
  var clubsBooks = sequelize.define('clubsBooks', {
    clubId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {});
  clubsBooks.associate = function(models) {
    // associations can be defined here
  };
  return clubsBooks;
};