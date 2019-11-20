module.exports = function(sequelize, DataTypes) {
    var Squeek = sequelize.define("Squeek", {
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      }
    });
  
    Squeek.associate = function(models) {
      Squeek.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Squeek;
  };
  