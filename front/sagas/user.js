import { all, fork, takeEvery, takeLatest, call, put, take } from "redux-saga/effects";
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
  while (true) {
    yield take(LOG_IN);
    console.log("login saga");
    yield put({
      type: LOG_IN_SUCCESS
    });
  }
}

function* watchHello() {
  yield takeEvery(HELLO_SAGA, function*() {
    console.log(1);
    console.log(2);
    console.log(3);
    console.log(4);
  });
}

// function* watchHello() {
//   while (true) {
//     yield take(HELLO_SAGA);
//     console.log(1);
//     console.log(2);
//     console.log(3);
//     console.log(4);
//   }
// }

function* watchSignUp() {}

export default function* userSaga() {
  yield all([watchLogin(), watchSignUp(), watchHello()]);
}
