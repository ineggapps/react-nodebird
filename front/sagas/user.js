import { all, fork, takeLatest, call, put, take } from "redux-saga/effects";
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from "../reducers/user";

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
      typE: LOG_IN_FAILURE
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN, login);
}

function* hello() {
  try {
    yield put({
      type: "HELLO_TWO"
    });
    console.log("hello");
  } catch (e) {
    console.error(e);
  }
}

function* helloSaga() {
  console.log("Before saga");
  while (true) {
    yield take(HELLO_SAGA, hello);
    console.log("Hello saga?");
  }
}

export default function* userSaga() {
  // yield all([fork(watchLogin), helloSaga()]);
  yield helloSaga();
}
