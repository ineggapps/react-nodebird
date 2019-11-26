const dummyUser = {
  nickname: "inegg",
  Post: [],
  Followings: [],
  Followers: []
};

export const initialState = {
  isLoggedIn: false,
  user: null
};

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FILOEURE";

export const LOG_IN_REUQEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REUQEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

//동적 데이터는 함수를 만들어야 한다
export const signUpAction = data => {
  return {
    type: SIGN_UP_REQUEST,
    signUpData: data
  };
};

export const loginAction = {
  type: LOG_IN_REQUEST
  // ,data: {
  //   nickname: "inegg",
  //   Post: [],
  //   Followings: [],
  //   Follwers: []
  // }
};
export const logoutAction = {
  type: LOG_OUT_REQUEST
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      return {
        ...state,
        isLoggedIn: true,
        user: dummyUser //action.data
        isLoading:true,
      };
    }
    case LOG_IN_SUCCESS:{
      return{
        ...state,
        isLoading:false
      }
    }
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    }
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        signUpData: action.data
      };
    }
    default:
      return {
        ...state
      };
  }
};

export default reducer;
