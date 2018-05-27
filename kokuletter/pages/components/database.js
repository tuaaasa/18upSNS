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
}

export const removeSalsal = (salsalKey) => {
  FB.ref('salsals/'+salsalKey).on('child_added', (data) => {
    if(data.key.match('sendUserKey')){
      const path = 'users/'+data.val()+'/receiveMessage';
      let num = '';
      FB.ref(path).on('child_added', (salsal) => {
        if(salsal.val().match(salsalKey)){
          num = salsal.key;
        }
      });
      FB.ref(path+'/'+num).remove();
    }
  });
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

export const checkUserId = (userKey, onCallback) => {
  FB.ref('users').once('value', (data) => {
    if(data.val()[userKey]){
      AsyncStorage.setItem(JSON.stringify('userId'), JSON.stringify(userKey)).then(() => {
        onCallback(true);
      });
    }else{
      onCallback(false);
    }
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

export const setRandMessage = (salsalKey, onCallback) => {
  const userKeys = [];
  let count = 0;
  FB.ref('users').on('child_added', (data) => {
    userKeys.push(data.key);
    count++;
  });
  FB.ref('users').once('value', (data) => {
    if(data.numChildren() == count){
      const rand_value = Math.floor(Math.random() * data.numChildren());
      onCallback(userKeys[rand_value]);

      const path = 'users/'+userKeys[rand_value]+'/receiveMessage';
      FB.ref(path).once('value', (val) => {
        let update = {};
        if(!val.val()){
          update[path] = [salsalKey];
          FB.ref().update(update);
        }else{
          const currentMessage = [].concat(val.val());
          currentMessage.push(salsalKey);
          update[path] = currentMessage;
          FB.ref().update(update);
        }
      });
    }
  });
}

export const referenceMessage = (salsalKey, onCallback) => {
  FB.ref('salsals').on('child_added', (data) => {
    if(data.key.match(salsalKey)){
      onCallback({
        salsalKey: data.key,
        userKey: data.val().userKey,
        toName: data.val().toName,
        salsal: data.val().salsal,
        date: data.val().date,
        time: data.val().time,
        goodUserList: data.val().goodUserList,
      });
    }
  });
}


// ----------------------------------------------
//                    AsyncStorage
// ----------------------------------------------

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

// export const setLocalSalsal = (list) => {
//   AsyncStorage.removeItem(JSON.stringify('localSalsal')).then(() => {
//     AsyncStorage.setItem(JSON.stringify('localSalsal'), JSON.stringify(list));
//   });
// }
//
// export const getLocalSalsal = (onCallback) => {
//   AsyncStorage.getItem(JSON.stringify('localSalsal')).then((list) => {
//     if(list){
//       onCallback(JSON.parse(list));
//     }else{
//       onCallback(false);
//     }
//   });
// }
