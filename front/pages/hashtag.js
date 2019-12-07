import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_HASHTAG_POSTS_REQUEST } from "../reducers/post";
import PostCard from "../components/PostCard";

const Hashtag = ({ tag }) => {
  console.log(tag);
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.user);
  useEffect(() => {
    console.log("useEffect in hashtag");
    dispatch({
      type: LOAD_HASHTAG_POSTS_REQUEST,
      data: tag
    });
  }, []);
  return <div>{mainPosts && mainPosts.map(c => <PostCard key={+c.createdAt} post={c} />)}</div>;
};

Hashtag.propTypes = {
  tag: PropTypes.string.isRequired
};
//class가 아닌 메서드 함수임  (powered by next)
//async context의 context는 _app.js의 ~.getInitialProps에서 받아 온 ctx를 의미한다.
Hashtag.getInitialProps = async context => {
  console.log(`hash getInitialProps`, context.query.tag);
  return { id: context.query.tag };
};

export default Hashtag;
