const functions = require('firebase-functions');
const admin     = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.friendRequestNotif = functions.database.ref('/users/{userId}/friends/{senderId}').onWrite(event => {
  const data = event.data.val();
  const recipientId = event.params.userId;
  const senderId = event.params.senderId;
  console.log('senderId '+senderId);
  admin.database().ref(`/users/${senderId}`).once('value', userInfo => {
    let sender = userInfo.val();
    const payload = {
      notification: {
        title: `FireChat`,
        body: `${sender.displayName} send a friend request`,
        icon: `${sender.photo}`,
        click_action : "https://doms123.github.io"
      }
    };

    admin.database()
          .ref(`/fcmTokens/${recipientId}`)
          .once('value')
          .then(token => token.val())
          .then(userFcmToken => {
            return admin.messaging().sendToDevice(userFcmToken, payload);
          })
          .then(res => {
            console.log('Sent succefully', res);
          })
          .catch(err => {
            console.log('error sending', err);
          });
  });
});

