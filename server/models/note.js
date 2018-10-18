'use strict';
module.exports = (sequelize, DataTypes) => {
  var note = sequelize.define('note', {
    content: DataTypes.STRING,
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  note.associate = function(models) {
    // associations can be defined here
    models.note.belongsTo(models.book);
    models.note.belongsTo(models.user);
  };
  return note;
};