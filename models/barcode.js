'use strict';
module.exports = (sequelize, DataTypes) => {
  const Barcode = sequelize.define('Barcode', {
    code: DataTypes.STRING,
    date: DataTypes.DATE,
    flag: DataTypes.BOOLEAN
  }, {});
  Barcode.associate = function(models) {
    // associations can be defined here
  };
  return Barcode;
};