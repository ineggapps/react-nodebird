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

const HELLO_SAGA = "HELLO_SAGA";
function loginAPI() {
  //서버에 요청을 보내는 부분
}

function* login() {
  try {
    // yield call(loginAPI);
    console.log("Login access");
    yield delay(500);
    yield put({
      // put은 dispatch 동일
      type: LOG_IN_SUCCESS
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

function* signUpAPI() {}

function* signUp() {
  try {
    // yield call(signUpAPI);
    yield delay(2000);
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
