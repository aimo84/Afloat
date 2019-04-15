import Store from '../store/member';

export const initialState = Store;

export default function userReducer(state = initialState, action) {
  // console.log(action);
  switch (action.type) {
    case 'USER_LOGIN': {
      if (action.data) {
        console.log('ACTION DATA');
        console.log(action.data);
        return {
          ...state,
          loading: false,
          error: null,
          token: action.data.token,
          email: action.data.email,
          firstname: action.data.firstname,
          emailVerified: false,
        };
      }
      return initialState;
    }
    case 'BANK_SET': {
      console.log('dispatch recieved');
      if (action.data) {
        return {
          ...state,
          bankSet: action.data,
        };
      }
      return initialState;
    }
    case 'LOGOUT': {
      return {
        ...state,
        token: '',
      };
    }
    case 'USER_DETAILS_UPDATE': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          firstname: action.data.firstname,
          lastname: action.data.lastname,
          signedUp: action.data.signedUp,
          role: action.data.role,
        };
      }
      return initialState;
    }
    case 'USER_ERROR': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: action.data,
        };
      }
      return initialState;
    }
    case 'USER_RESET': {
      return initialState;
    }
    default:
      return state;
  }
}
