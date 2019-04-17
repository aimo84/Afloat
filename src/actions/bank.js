import axios from 'axios';
import statusMessage from './status';
import config from '../constants/config';
// import ErrorMessages from '../constants/errors';

const ROOT_URL = `${config.ROOT_URL}/api`;

export function addUserToBank(authToken, publicToken, accountId, cb) {
  console.log('id in bank');
  console.log(accountId);
  return (dispatch) => {
    axios.post(`${ROOT_URL}/addBank`, { publicToken, accountId }, { headers: { authorization: `Token ${authToken}` } })
      .then((response) => {
        if (response.status === 200) {
          cb();
          dispatch({ type: 'BANK_SET', data: true });
        }
      });
  };
}

export function transferAchToUser(authToken, amount, cb) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/transferToUser`, { amount }, { headers: { authorization: `Token ${authToken}` } })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // cb();
          dispatch({ type: 'USER_TRANSFER', amount: response.data.amount });
        }
      });
  };
}

export function getTransactions(authToken, cb) {
  axios.get(`${ROOT_URL}/getTransactions`, { headers: { authorization: `Token ${authToken}` } })
    .then((response) => {
      cb(response.data);
    });
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
