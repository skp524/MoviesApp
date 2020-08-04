import { UserSchema } from './Schema';

const Realm = require('realm');

export const addUser = async (userDetails) => new Promise((resolve, reject) => {
  Realm.open({ schema: [UserSchema] })
    .then(realm => {
      realm.write(() => {
        realm.create('Users', userDetails);
        resolve();
      });
    })
    .catch(error => {
      reject(error);
    });;
});

export const getAllUsers = async () => new Promise((resolve, reject) => {
  Realm.open({ schema: [UserSchema] })
    .then(realm => {
      let allUsers = realm.objects('Users');
      resolve(allUsers);
    })
    .catch(error => {
      reject(error);
    });;
});
// export const getAdmin = async () => new Promise((resolve, reject) => {
//   Realm.open({ schema: [UserSchema] })
//     .then(realm => {
//       let allUsers = realm.objects('Users');
//       let adminUser = allUsers.filtered('role > 0');
//       (adminUser == null) ? resolve(false) : resolve(true);
//     })
//     .catch(error => {
//       reject(error);
//     });;
// });
