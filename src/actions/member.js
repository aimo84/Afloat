import axios from 'axios';
import ErrorMessages from '../constants/errors';
import config from '../constants/config';
import statusMessage from './status';
import { Firebase, FirebaseRef } from '../lib/firebase';
import { store } from '../store/index';

const ROOT_URL = `${config.ROOT_URL}/api`;
/**
  * Get this User's Details - TODO still in development by Joe
  */
export function getUserData(token, cb) {
  return dispatch => new Promise(async (resolve, reject) => {
    await statusMessage(dispatch, 'loading', true);

    // TODO: Replace with local auth:
    //       - Create user
    //       - getUserData (store token locally)
    //       - send login action with user details
    axios.get(`${ROOT_URL}/getUser`, { headers: { authorization: `Token ${token}` } }).then((response) => {
      const userDetails = response.data.user;
      dispatch({
        type: 'UPDATE_USER',
        data: userDetails,
      });

      if (cb) {
        cb(response.data.user);
      } else {
        resolve({});
      }
    }).catch(reject);
  }).catch(async (error) => {
    await statusMessage(dispatch, 'loading', false);
    throw error;
  });
  // axios.get(`${ROOT_URL}/getUser`, { headers: { authorization: `Token ${authToken}` } })
  //   .then((response) => {
  //     cb(response.data);
  //     const userDetails = response.data.user;
  //     console.log(`userDetails ${userDetails}`);
  //   });
}

export function signUp(formData) {
  const {
    email,
    password,
    password2,
    firstname,
    lastname,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!firstname) return reject({ message: ErrorMessages.missingFirstName });
    if (!lastname) return reject({ message: ErrorMessages.missingLastName });
    if (!email) return reject({ message: ErrorMessages.missingEmail });
    if (!password) return reject({ message: ErrorMessages.missingPassword });
    if (!password2) return reject({ message: ErrorMessages.missingPassword });
    if (password !== password2) return reject({ message: ErrorMessages.passwordsDontMatch });

    await statusMessage(dispatch, 'loading', true);

    // TODO: Replace with local auth:
    //       - Create user
    //       - getUserData (store token locally)
    //       - send login action with user details
    axios.post(`${ROOT_URL}/signup`, {
      email, password, firstname, lastname,
    }, { headers: { authorization: '' } }).then((response) => {
      // getUserData(dispatch);
      const userDetails = response.data.user;
      return resolve(dispatch({
        type: 'USER_LOGIN',
        data: userDetails,
      }));
    }).catch(reject);
  }).catch(async (error) => {
    await statusMessage(dispatch, 'loading', false);
    throw error;
  });
}

export function linkBank() {
  return dispatch => dispatch({
    type: 'BANK_SET',
  });
}

export function getIcon() {
  return new Promise((resolve) => {
    axios.get(`${ROOT_URL}/getIconForTransaction`).then((response) => {
      resolve(response);
    }).catch(() => {
      console.log('error homie');
    });
  });
}

/**
  * Login to Firebase with Email/Password
  */
export function login(formData) {
  const {
    email,
    password,
  } = formData;
  return dispatch => new Promise(async (resolve, reject) => {
    await statusMessage(dispatch, 'loading', true);
    // Validation checks
    if (!email) return reject({ message: ErrorMessages.missingEmail });
    if (!password) return reject({ message: ErrorMessages.missingPassword });

    axios.post(`${ROOT_URL}/signin`, { email, password },
      { headers: { authorization: '' } }).then((response) => {
      // getUserData(dispatch);
      const userDetails = response.data.user;
      return resolve(dispatch({
        type: 'USER_LOGIN',
        data: userDetails,
      }));
    }).catch(reject);
  }).catch(async (error) => {
    await statusMessage(dispatch, 'loading', false);
    throw error;
  });
}

/**
  * Reset Password
  */
export function resetPassword(formData) {
  const { email } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!email) return reject({ message: ErrorMessages.missingEmail });

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
    return Firebase.auth()
      .sendPasswordResetEmail(email)
      .then(() => statusMessage(dispatch, 'success', 'We have emailed you a reset link').then(resolve(dispatch({ type: 'USER_RESET' }))))
      .catch(reject);
  }).catch(async (err) => {
    await statusMessage(dispatch, 'loading', false);
    throw err.message;
  });
}

/**
  * Update Profile
  */
export function updateProfile(formData) {
  const {
    email,
    password,
    password2,
    firstname,
    lastname,
    changeEmail,
    changePassword,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Are they a user?
    const UID = Firebase.auth().currentUser.uid;
    if (!UID) return reject({ message: ErrorMessages.missingFirstName });

    // Validation checks
    if (!firstname) return reject({ message: ErrorMessages.missingFirstName });
    if (!lastname) return reject({ message: ErrorMessages.missingLastName });
    if (changeEmail) {
      if (!email) return reject({ message: ErrorMessages.missingEmail });
    }
    if (changePassword) {
      if (!password) return reject({ message: ErrorMessages.missingPassword });
      if (!password2) return reject({ message: ErrorMessages.missingPassword });
      if (password !== password2) return reject({ message: ErrorMessages.passwordsDontMatch });
    }

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
    return FirebaseRef.child(`users/${UID}`).update({ firstname, lastname })
      .then(async () => {
        // Update Email address
        if (changeEmail) {
          await Firebase.auth().currentUser.updateEmail(email).catch(reject);
        }

        // Change the password
        if (changePassword) {
          await Firebase.auth().currentUser.updatePassword(password).catch(reject);
        }

        // Update Redux
        // await getUserData(dispatch);
        await statusMessage(dispatch, 'loading', false);
        return resolve('Profile Updated');
      }).catch(reject);
  }).catch(async (err) => {
    await statusMessage(dispatch, 'loading', false);
    throw err.message;
  });
}

/**
  * Logout
  */
export function logout(cb) {
  console.log('actions logout');
  return (dispatch) => {
    dispatch({ type: 'LOGOUT' });
    dispatch({ type: 'STATUS_REPLACE', loading: false });
    cb();
  };
}
