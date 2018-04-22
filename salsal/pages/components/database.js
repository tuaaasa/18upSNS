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
export const setSalsal = (to, salsal, userKey) => {
  let date = new Date();
  const salsalData = {
    userKey: userKey,
    toName: to,
    salsal: salsal,
    date: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
    time: date.getMinutes() > 9 ? date.getHours()+':'+date.getMinutes() : date.getHours()+':0'+date.getMinutes(),
  };
  FB.ref('salsals').push(salsalData);
}

export const getSalsal = (onSalsal) => {
  // const list = [];
  FB.ref('salsals').on('child_added', (data) => {
    onSalsal({
      salsalKey: data.key,
      userKey: data.val().userKey,
      toName: data.val().toName,
      salsal: data.val().salsal,
      date: data.val().date,
      time: data.val().time,
      goodUserList: data.val().goodUserList,
    });
  });
  // onSalsal(list);
}

export const removeSalsal = (salsalKey) => {
  FB.ref('salsals/'+salsalKey).remove();
}

export const setPersonalInfo = (userKey) => {
  const userData = {
    goodCount: 0,
  };
  const key = FB.ref('users').push(userData).key;
  AsyncStorage.setItem(JSON.stringify('userId'), JSON.stringify(key)).then(() => {
    userKey(key);
  });
}

export const setGood = (userKey, salsalKey) => {
  FB.ref('salsals/'+salsalKey+'/goodUserList').once('value', (data) => {
    let update = {};
    if(!data.val()){
      update['salsals/'+salsalKey+'/goodUserList'] = [userKey];
      FB.ref().update(update);
    }else{
      const goodUserList = [].concat(data.val());
      if(goodUserList.indexOf(userKey) < 0){
        goodUserList.push(userKey);
      }
      update['salsals/'+salsalKey+'/goodUserList'] = goodUserList;
      FB.ref().update(update);
    }
  });
}

// export const getPersonalKey = (userName, userPass, userKey) => {
//   let key = false;
//   FB.ref('users').on('child_added', (data) => {
//     if(userName == data.val().userName && userPass == data.val().userPass){
//       userKey(data.key);
//     }
//   });
//   return userKey(false);
// }

// export const getPersonalInfo = (userKey, onPersonalInfo) => {
//   FB.ref('users').on('child_added', (data) => {
//     if(userKey == data.key){
//       const info = {
//         userName: data.val().userName,
//         comment: data.val().comment,
//         level: data.val().level,
//       };
//       onPersonalInfo(info);
//     }
//   });
// }

// export const keyToName = (userKey, userName) => {
//   FB.ref('users').on('child_added', (data) => {
//     if(userKey == data.key){
//       userName(data.val().userName);
//     }
//   });
//
// }

// ----------------------------------------------
//                    AsyncStorage
// ----------------------------------------------
// export const loginUser = (userKey, onCallback) => {
//   AsyncStorage.setItem(JSON.stringify('loginUser'), JSON.stringify(userKey)).then(() => {
//     onCallback(true);
//   });
// }

export const logoutUser = () => {
  AsyncStorage.removeItem(JSON.stringify('userId'));
}

export const checkLogin = (onCheckLogin) => {
  AsyncStorage.getItem(JSON.stringify('userId')).then((value) => {
    if(value){
      onCheckLogin(JSON.parse(value));
    }
    else{
      onCheckLogin(false);
    }
  });
}

// export const getLoginUser = (onUserKey) => {
//   AsyncStorage.getItem(JSON.stringify('loginUser')).then((userKey) => {
//     if(userKey){
//       onUserKey(JSON.parse(userKey));
//     }else{
//       onUserKey(false);
//     }
//   });
// }

export const setLocalSalsal = (list) => {
  AsyncStorage.removeItem(JSON.stringify('localSalsal')).then(() => {
    AsyncStorage.setItem(JSON.stringify('localSalsal'), JSON.stringify(list));
  });
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
