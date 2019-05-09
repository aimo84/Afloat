import axios from 'axios';
import statusMessage from './status';
import config from '../constants/config';
// import ErrorMessages from '../constants/errors';

const ROOT_URL = `${config.ROOT_URL}/api`;

export function addUserToBank(authToken, publicToken, accountId, cb) {
  // console.log('id in bank');
  // console.log(accountId);
  return (dispatch) => {
    axios.post(`${ROOT_URL}/addBank`, { publicToken, accountId }, { headers: { authorization: `Token ${authToken}` } })
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: 'BANK_SET', data: true });
          cb();
        }
      });
  };
}

export function transferAchToUser(authToken, amount, cb) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/transferToUser`, { amount }, { headers: { authorization: `Token ${authToken}` } })
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          // cb();
          dispatch({ type: 'USER_TRANSFER', amount: response.data.amount });
        }
      });
  };
}

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }


export function getTransactions(authToken) {
  console.log('get transactions action called');
  return (dispatch) => {
    axios.get(`${ROOT_URL}/getTransactions`, { headers: { authorization: `Token ${authToken}` } })
      .then((response) => {
        dispatch({ type: 'FETCH_TRANSACTIONS', data: response.data.transactions });
      }).catch((error) => {
        console.log(error);
      });
  };
}

export function getBalance(authToken, cb) {
  // TODO: Find better way of beating this race condition
  axios.get(`${ROOT_URL}/getBalance`, { headers: { authorization: `Token ${authToken}` } })
    .then((response) => {
      cb(response.data.balance);
    });
}

export function enrollSubscription(authToken, cb) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/enrollSubscription`, { }, { headers: { authorization: `Token ${authToken}` } })
      .then((response) => {
        console.log('response');
        cb();
        if (response.status === 200) {
          dispatch({ type: 'USER_ENROLLED' });
        }
      });
  };
}

export default function dummy() {
  return dispatch => new Promise(async (resolve) => {
    // Validate locale

    await statusMessage(dispatch, 'loading', false);

    return resolve(dispatch({
      type: 'LOCALE_REPLACE',
    }));
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}
