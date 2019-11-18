import React, { useEffect } from "react";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, logoutAction } from "../reducers/user";

const dummy = {
  isLoggedIn: true,
  imagePaths: [],
  mainPosts: [
    {
      User: {
        id: 1,
        nickname: "inegg"
      },
      content: "the first post",
      img: "https://cdn.pixabay.com/photo/2019/09/11/22/29/leaf-4470075_960_720.jpg"
    }
  ]
};

const Home = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(state => state.user);
  console.log(user);
  useEffect(() => {
    dispatch(loginAction);
    dispatch(logoutAction);
    dispatch(loginAction);
  }, []);
  console.log("index page");
  return (
    <div>
      {user ? <div>Logged in: {user.nickname}</div> : "Logged out."}
      {dummy.isLoggedIn && <PostForm />}
      {dummy.mainPosts.map(c => {
        return <PostCard key={c} post={c} />;
      })}
    </div>
  );
};

export default Home;
