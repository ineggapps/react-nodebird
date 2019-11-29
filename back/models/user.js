module.expores = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      nickname: {
        type: DataTypes.STRING(20), //less than 20
        allowNull: false //essential
      },
      userId: {
        type: DataTypes.STRING(20), //less than 20
        allowNull: false, // essential
        unique: true //unique value
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci" //hangeul
    }
  );
  //from ERD
  User.associate = db => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
  };
  return User;
};
