import React, { useCallback } from "react";
import { Avatar, Card, Button } from "antd";
import { useSelector } from "react-redux";
import { logoutAction, LOG_OUT_REQUEST, LOG_IN_REQUEST } from "../reducers/user";
import { useDispatch } from "react-redux";
const UserProfile = () => {
  console.log(
    "ddd",
    useSelector(state => state)
  );
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const onSignOut = useCallback(() => {
    dispatch({ type: LOG_OUT_REQUEST });
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">
          Posts
          <br />
          {me.Post.length}
        </div>,
        <div key="following">
          Followings
          <br />
          {me.Followings.length}
        </div>,
        <div key="follower">
          Followers
          <br />
          {me.Followers.length}
        </div>
      ]}
    >
      <Card.Meta avatar={<Avatar>{me.nickname[0]}</Avatar>} title={me.nickname} />
      <Button onClick={onSignOut}>Sign Out</Button>
    </Card>
  );
};

export default UserProfile;
