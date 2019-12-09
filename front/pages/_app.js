import React from "react";
import PropTypes from "prop-types";
import withRedux from "next-redux-wrapper";
import Head from "next/head";
import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import AppLayout from "../components/AppLayout";
import reducer from "../reducers";
import rootSaga from "../sagas";

const NodeBird = ({ Component, store, pageProps }) => {
  //getInitialProps에서 넘긴 pageProps를 받을 수 있다.
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
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  );
};

//Component Didmount보다 더 먼저 실행된다. getInitialProps는 next가 임의로 추가 한 라이프사이클
//프론트와 서버 모두에서 실행이 된다.
NodeBird.getInitialProps = async context => {
  const { ctx, Component } = context;
  let pageProps = {};
  if (context.Component.getInitialProps) {
    pageProps = await context.Component.getInitialProps(ctx);
  }
  return { pageProps };
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object.isRequired
};

// 3단 커링(Curring), next는 dispatch라고 보면 됨.
// const middleware = (store)=>(next)=>(action)=>{
//   next(action);
// }

// 거의 바뀔 일이 없는 구문
const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : compose(
          applyMiddleware(...middlewares),
          !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f
        );
  const store = createStore(reducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
};

export default withRedux(configureStore)(NodeBird);
