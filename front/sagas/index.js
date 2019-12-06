import { all, call } from "redux-saga/effects";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3065/api/";
import user from "./user";
import post from "./post";

export default function* rootSaga() {
  yield all([call(user), call(post)]);
}
