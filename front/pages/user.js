import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_USER_POSTS_REQUEST } from "../reducers/post";
import { Avatar, Card } from "antd";
import PostCard from "../components/PostCard";
import { LOAD_USER_REQUEST } from "../reducers/user";

const User = ({ id }) => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.post);
  const { userInfo } = useSelector(state => state.user);
  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
      data: id
    });
    dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      data: id
    });
  }, []);
  return (
    <div>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              Posts
              <br />
              {me.Posts.length}
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
          <Card.Meta acatar={<Avatar>{userInfo.nickname[0]}</Avatar>} />
        </Card>
      ) : null}
      {mainPosts && mainPosts.map(c => <PostCard key={+c.createdAt} post={c} />)}
    </div>
  );
};

User.propTypes = {
  id: PropTypes.number.isRequired
};

User.getInitialProps = async context => {
  console.log("user getInitialProps", context.query);
  return { id: parseInt(context.query.id, 10) };
};

export default User;
