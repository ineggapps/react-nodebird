import React from "react";
import PropTypes from "prop-types";
import withRedux from "next-redux-wrapper";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "../reducers";

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

export default withRedux((initialState, options) => {
  const middlewares = [];
  const enhancer = compose(
    applyMiddleware(...middlewares),
    typeof window !== "undefined" &&
      !options.isServer &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  );
  const store = createStore(reducer, initialState, enhancer);
  return store;
})(NodeBird);
