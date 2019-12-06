import React, { useEffect } from "react";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { useDispatch, useSelector } from "react-redux";

const Home = (/*{user,dispatch, login, logout}*/) => {
  const dispatch = useDispatch();
  //잘게 쪼개는 것이 리렌더링이 줄어들어서 성능 확보에는 더 유리하다. 가끔은 {} 대신 하나씩 쪼개줄 때도 있음..
  const { me, user } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);
  console.log(user);
  useEffect(() => {
    // dispatch({ type: "HELLO_SAGA" });
    // dispatch({ type: "HELLO_SAGA" });
    // dispatch({ type: "HELLO_SAGA" });
    // dispatch({ type: "HELLO_SAGA" });
    // dispatch({ type: "HELLO_SAGA" });
  }, []);
  console.log("index page");
  return (
    <div>
      {me && <PostForm />}
      {mainPosts.map(c => {
        return <PostCard key={c} post={c} />;
      })}
    </div>
  );
};

// function mapStateToProps(state) {
//   return {
//     user: state.user
//   };
// } //(이전 방식)

// function mapDispatchProps(dispatch) {
//   return {
//     login: () => dispatch(loginAction),
//     logout: () => dispatch(logoutAction)
//   };
// }

// export default connect(mapStateToProps)(Home);
export default Home;
