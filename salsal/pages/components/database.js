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
export const setSalsal = (salsal, userKey) => {
  let date = new Date();
  const salsalData = {
    userKey: userKey,
    salsal: salsal,
    date: date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate(),
    time: date.getMinutes() > 9 ? date.getHours()+':'+date.getMinutes() : date.getHours()+':0'+date.getMinutes(),
  };
  FB.ref('salsals').push(salsalData);
}

export const getSalsal = (onSalsal) => {
  // const list = [];
  FB.ref('salsals').on('child_added', (data) => {
    onSalsal({
      userKey: data.val().userKey,
      salsal: data.val().salsal,
      date: data.val().date,
      time: data.val().time,
    });
  });
  // onSalsal(list);
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

export const getPersonalKey = (userName, userPass, userKey) => {
  let key = false;
  FB.ref('users').on('child_added', (data) => {
    if(userName == data.val().userName && userPass == data.val().userPass){
      userKey(data.key);
    }
  });
  return userKey(false);
}

export const getPersonalInfo = (userKey, onPersonalInfo) => {
  FB.ref('users').on('child_added', (data) => {
    if(userKey == data.key){
      const info = {
        userName: data.val().userName,
        comment: data.val().comment,
        level: data.val().level,
      };
      onPersonalInfo(info);
    }
  });
}

export const keyToName = (userKey, userName) => {
  FB.ref('users').on('child_added', (data) => {
    if(userKey == data.key){
      userName(data.val().userName);
    }
  });

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
      onUserKey(JSON.parse(userKey));
    }else{
      onUserKey(false);
    }
  });
}

export const setLocalSalsal = (list) => {
  AsyncStorage.setItem(JSON.stringify('localSalsal'), JSON.stringify(list));
}

export const getLocalSalsal = (onCallback) => {
  AsyncStorage.getItem(JSON.stringify('localSalsal')).then((list) => {
    if(list){
      onCallback(JSON.parse(list));
    }else{
      onCallback(false);
    }
  });
}
