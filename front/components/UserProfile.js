import React, { useCallback } from "react";
import { Avatar, Card, Button } from "antd";
import { useSelector } from "react-redux";
import { logoutAction } from "../reducers/user";
import { useDispatch } from "react-redux";
const UserProfile = () => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const onSignOut = useCallback(() => {
    dispatch(logoutAction);
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">
          Posts
          <br />
          {user.Post.length}
        </div>,
        <div key="following">
          Followings
          <br />
          {user.Followings.length}
        </div>,
        <div key="follower">
          Followers
          <br />
          {user.Followers.length}
        </div>
      ]}
    >
      <Card.Meta avatar={<Avatar>{user.nickname[0]}</Avatar>} title={user.nickname} />
      <Button onClick={onSignOut}>Sign Out</Button>
    </Card>
  );
};

export default UserProfile;
