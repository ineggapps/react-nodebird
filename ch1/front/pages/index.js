import React from "react";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

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
  console.log("index page");
  return (
    <div>
      {dummy.isLoggedIn && <PostForm />}
      {dummy.mainPosts.map(c => {
        return <PostCard key={c} post={c} />;
      })}
    </div>
  );
};

export default Home;
