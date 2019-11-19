import React from "react";
import PropTypes from "prop-types";
import withRedux from "next-redux-wrapper";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "../reducers";
import sagaMiddleware from "redux-saga";
import rootSaga from "../sagas";

const NodeBird = ({ Component, store }) => {
  return (
    <Provider store={store}>
      <Head>
        <title>NodeBird</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.6/antd.min.css"
        />
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </Provider>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType,
  store: PropTypes.object
};

// 3단 커링(Curring), next는 dispatch라고 보면 됨.
// const middleware = (store)=>(next)=>(action)=>{
//   next(action);
// }

// 거의 바뀔 일이 없는 구문
export default withRedux((initialState, options) => {
  const middlewares = [sagaMiddleware];
  //개발용일 때만 부가기능을 사용할 수 있도록 시큐어 코딩.
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : compose(
          applyMiddleware(...middlewares),
          typeof window !== "undefined" &&
            !options.isServer &&
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f
        );
  const store = createStore(reducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
})(NodeBird);
