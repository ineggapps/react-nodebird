import { all, fork, takeEvery, takeLatest, call, put, take, delay } from "redux-saga/effects";
import axios from "axios";
import {
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from "../reducers/user";

axios.defaults.baseURL = "http://localhost:3065/api/";

const HELLO_SAGA = "HELLO_SAGA";
function loginAPI(loginData) {
  //서버에 요청을 보내는 부분 withCredentials: 쿠키 교환 가능하도록 옵션 설정
  return axios.post("/user/login", loginData, { withCredentials: true });
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
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

function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
}

function* signUpAPI(signUpData) {
  //서버에 요청하는 부분
  return axios.post("/", signUpData);
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

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchSignUp)]);
}
