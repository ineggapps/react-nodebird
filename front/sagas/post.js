import { all, takeLatest, fork, put, delay } from "redux-saga/effects";
import { ADD_POST_REQUEST, ADD_POST_FAILURE, ADD_POST_SUCCESS } from "../reducers/post";

function* addPost() {
  try {
    console.log("이벤트 반응!");
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS
    });
  } catch (e) {
    yield put({
      type: ADD_POST_FAILURE,
      error: e
    });
  }
}

function* watchAddPost() {
  //게시글은 한 글이 여러 번 작성되면 안 되므로
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
