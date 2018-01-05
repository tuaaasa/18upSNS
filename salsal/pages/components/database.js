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

export const getSalsal = () => {
  console.log('fin');
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


// ----------------------------------------------
//                    AsyncStorage
// ----------------------------------------------
export const loginUser = (userKey) => {
  AsyncStorage.setItem(JSON.stringify('loginUser'), JSON.stringify(userKey));
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
