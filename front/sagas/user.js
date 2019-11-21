import { all, fork, takeLatest, call, put, take } from "redux-saga/effects";
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from "../reducers/user";

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
      typE: LOG_IN_FAILURE
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

function* watchSignUp() {}

export default function* userSaga() {
  yield all([watchLogin(), watchSignUp()]);
}
