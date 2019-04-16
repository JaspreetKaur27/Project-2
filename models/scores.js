module.exports = function(sequelize, DataTypes) {
  var Score = sequelize.define("Score", {
    scores: DataTypes.STRING
  });

  Score.associate = function(models) {
    Score.belongsTo(models.User, {
      foreignKey: {
        allownull: false
      }
    });
  };
  return Score;
};
  