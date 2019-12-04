module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // 테이블명은 users
      nickname: {
        type: DataTypes.STRING(20), // 20글자 이하
        allowNull: false // 필수
      },
      userId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true // 고유한 값
      },
      password: {
        type: DataTypes.STRING(100), // 100글자 이하
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci" // 한글이 저장돼요
    }
  );

  User.associate = db => {
    db.User.hasMany(db.Post, { as: "Posts" });
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "followingId"
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      //Javascript에서 구별하는 항목이 as이고
      as: "Followings",
      //DB에서 구별하는 애트리뷰트(속성)의 이름이 foreignKey
      //이때 foreignKey는 자신의 것을 가리켜야 하는 것이 아니라 counterpart를 지목해야 한다.
      foreignKey: "followerId"
    });
  };

  return User;
};
