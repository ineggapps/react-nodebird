import { all, fork, takeEvery, takeLatest, call, put, take, delay } from "redux-saga/effects";
import axios from "axios";
import {
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST
} from "../reducers/user";

axios.defaults.baseURL = "http://localhost:3065/api/";

const HELLO_SAGA = "HELLO_SAGA";
function logInAPI(logInData) {
  //서버에 요청을 보내는 부분 withCredentials: 쿠키 교환 가능하도록 옵션 설정
  return axios.post("/user/login", logInData, { withCredentials: true });
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      // put은 dispatch 동일
      type: LOG_IN_SUCCESS,
      data: result.data
    });
  } catch (e) {
    // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE
    });
  }
}

function* watchLogIn() {
  yield takeEvery(LOG_IN_REQUEST, logIn);
}

function logOutAPI(logOutData) {
  //서버에 요청하는 부분
  return axios.post("/user/logout", {}, { withCredentials: true });
}

function* logOut(action) {
  try {
    yield call(logOutAPI);
    // throw new Error("Error test")/;
    yield put({
      type: LOG_OUT_SUCCESS
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_OUT_FAILURE
    });
  }
}

function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}

function signUpAPI(signUpData) {
  //서버에 요청하는 부분
  return axios.post("/user", signUpData);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);
    // throw new Error("Error test")/;
    yield put({
      type: SIGN_UP_SUCCESS
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

function loadUserAPI() {
  //서버에 요청하는 부분
  return axios.get("/user", { withCredentials: true }); //withCredentials 오타 때문에 하루 헤맸음. 조심하자 ^^
}

function* loadUser() {
  try {
    // yield call(loadUserAPI);
    const result = yield call(loadUserAPI);
    yield put({
      // put은 dispatch 동일
      type: LOAD_USER_SUCCESS,
      data: result.data
    });
  } catch (e) {
    // loginAPI 실패
    console.error(e);
    yield put({
      type: LOAD_USER_FAILURE,
      error: e
    });
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchSignUp), fork(watchLogOut), fork(watchLoadUser)]);
}
