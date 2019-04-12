import axios from 'axios';
import statusMessage from './status';
import ErrorMessages from '../constants/errors';


export default function dummy() {
  return dispatch => new Promise(async (resolve) => {
    // Validate locale

    await statusMessage(dispatch, 'loading', false);

    return resolve(dispatch({
      type: 'LOCALE_REPLACE',
    }));
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

export function addUserToBank({ email, password }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password }, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        localStorage.setItem('token', response.data.user.token);
        dispatch({ type: ActionTypes.AUTH_USER, payload: true });
        history.push('/dashboard');
      }).catch((error) => {
        console.log(error);
        dispatch(authError(`Sign In Failed: ${error}`));
      });
  };
}
