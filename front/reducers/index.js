const initialState = {
  isLoggedIn: false,
  user: {}
};

const loginAction = {
  type: LOG_IN,
  data: {
    nickname: "inegg"
  }
};
const logoutAction = {
  type: LOG_OUT
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      return {
        ...state,
        isLoggedIn: true,
        user: action.data
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    }
    default:
  }
};
