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
          cb();
          console.log(response.data.amount);
          dispatch({ type: 'USER_TRANSFER', amount: response.data.amount });
        }
      });
  };
}


export function transferAchToApp(authToken, cb) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/transferToApp`, { }, { headers: { authorization: `Token ${authToken}` } })
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          cb(response);
          dispatch({ type: 'USER_PAYBACK', amount: response.data.amount });
        }
      });
  };
}

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }


export function getTransactions(authToken, cb, refresh) {
  console.log('get transactions action called');
  return (dispatch) => {
    axios.get(`${ROOT_URL}/getTransactions`, { headers: { authorization: `Token ${authToken}` } })
      .then((response) => {
        cb(response.data.accounts[0].balances.current);
        dispatch({ type: 'FETCH_TRANSACTIONS', data: response.data.transactions, balance: response.data.accounts[0].balances.current });
      }).catch((error) => {
        console.log('response called');
        refresh();
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

export function getBalanceOverTime(authToken, date, cb) {
  // TODO: Find better way of beating this race condition
  axios.post(`${ROOT_URL}/getBalanceRange`, { date }, { headers: { authorization: `Token ${authToken}` } })
    .then((response) => {
      console.log('HERE');
      // console.log(JSON.stringify(response));
      cb(response.data);
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

export function getLoanHistory(authToken, cb) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/getLoanHistory`, { headers: { authorization: `Token ${authToken}` } })
      .then((response) => {
        console.log('LOANRESPONSECALLED');
        cb();
        if (response.status === 200) {
          console.log(response.data);
          dispatch({ type: 'LOAN_HISTORY', data: response.data });
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
