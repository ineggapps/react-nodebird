import { all, fork, takeEvery, takeLatest, call, put, take } from "redux-saga/effects";
import axios from "axios";
import {
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from "../reducers/user";

const HELLO_SAGA = "HELLO_SAGA";
function loginAPI() {
  //서버에 요청을 보내는 부분
}

function* login() {
  try {
    yield call(loginAPI);
    yield put({
      //put은 dispatch와 동일하다
      type: LOG_IN_SUCCESS
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE
    });
  }
}

function* watchLogin() {
  while (true) {
    yield take(LOG_IN);
    console.log("login saga");
    yield put({
      type: LOG_IN_SUCCESS
    });
  }
}

function* signUpAPI() {}

function* signUp() {
  try {
    yield call(signUpAPI);
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
  yield takeEvery(LOG_IN_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([watchLogin(), watchSignUp(), watchHello()]);
}
