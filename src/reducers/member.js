import Store from '../store/member';

export const initialState = Store;

export default function userReducer(state = initialState, action) {
  // console.log(action);
  switch (action.type) {
    case 'USER_LOGIN': {
      if (action.data) {
        console.log('ACTION DATA');
        // console.log(action.data);
        return {
          ...state,
          loading: false,
          error: null,
          token: action.data.token,
          email: action.data.email,
          bankSet: action.data.bankSet,
          firstname: action.data.firstname,
          emailVerified: false,
          active: action.data.active,
          outstandingBalance: action.data.outstandingBalance,
          subscriptionEnrolled: action.data.subscriptionEnrolled,
        };
      }
      return initialState;
    }
    case 'UPDATE_USER': {
      console.log('dispatch recieved');
      // console.log(action.data);
      if (action.data) {
        return {
          ...state,
          bankSet: action.data.bankSet,
          outstandingBalance: action.data.outstandingBalance,
          subscriptionEnrolled: action.data.subscriptionEnrolled,
          active: action.data.active,
          emailVerified: false,
        };
      }
      return initialState;
    }
    case 'BANK_SET': {
      console.log('setting bank');
      if (1) {
        return {
          ...state,
          bankSet: true,
        };
      }
      return initialState;
    }
    case 'LOGOUT': {
      return initialState;
    }
    case 'USER_TRANSFER': {
      return {
        ...state,
        outstandingBalance: action.amount,
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
    case 'USER_ENROLLED': {
      return {
        ...state,
        active: true,
      };
    }
    default:
      return state;
  }
}
