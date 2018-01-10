import firebase from './firebase.js';
import {AsyncStorage} from 'react-native';

const FB = firebase.database();

// 乱数生成
export const makeRandomNum = () => {
  return String(Date.now())+String(Math.floor(1000*Math.random()));
}

// ----------------------------------------------
//                    firebase
// ----------------------------------------------
export const setSalsal = (salsal) => {
  FB.ref('salsals').push(salsal);
}

export const getSalsal = (onSalsals) => {
  const salsals = [];
  FB.ref('salsals').on('child_added', (data) => {
    salsals.push({

    });
  });
}

export const setPersonalInfo = (userName, userPass, userKey) => {
  const userData = {
    userName: userName,
    userPass: userPass,
    comment: 'よろしくお願いします。',
    level: 0,
  };
  const key = FB.ref('users').push(userData).key;
  userKey(key);
}

export const getPersonalInfo = (userName, userPass, userKey) => {
  let key = false;
  FB.ref('users').on('child_added', (data) => {
    if(userName == data.val().userName && userPass == data.val().userPass){
      userKey(data.key);
    }
  });
  return userKey(false);
}


// ----------------------------------------------
//                    AsyncStorage
// ----------------------------------------------
export const loginUser = (userKey, onCallback) => {
  AsyncStorage.setItem(JSON.stringify('loginUser'), JSON.stringify(userKey)).then(() => {
    onCallback(true);
  });
}

export const logoutUser = () => {
  AsyncStorage.removeItem(JSON.stringify('loginUser'));
}

export const checkLogin = (onCheckLogin) => {
  AsyncStorage.getItem(JSON.stringify('loginUser')).then((value) => {
    if(value){
      onCheckLogin(true);
    }
    else{
      onCheckLogin(false);
    }
  });
}

export const getLoginUser = (onUserKey) => {
  AsyncStorage.getItem(JSON.stringify('loginUser')).then((userKey) => {
    if(userKey){
      onUserKey(userKey);
    }else{
      onUserKey(false);
    }
  });
}
