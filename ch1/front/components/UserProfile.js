import React from "react";
import { Avatar, Card } from "antd";

const dummy = {
  nickname: "inegg",
  Post: [],
  Followings: [],
  Follwers: [],
  isLoggedIn: false
};

const UserProfile = () => {
  return (
    <Card
      actions={[
        <div key="twit">
          Posts
          <br />
          {dummy.Post.length}
        </div>,
        <div key="following">
          Followings
          <br />
          {dummy.Followings.length}
        </div>,
        <div key="follower">
          Followers
          <br />
          {dummy.Follwers.length}
        </div>
      ]}
    >
      <Card.Meta avatar={<Avatar>{dummy.nickname[0]}</Avatar>} title={dummy.nickname} />
    </Card>
  );
};

export default UserProfile;
