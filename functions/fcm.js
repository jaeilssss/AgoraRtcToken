var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// var registrationToken = 'fpVegT6HbUkJnDexKrRAMe:APA91bFD7sLnnOFBixjLpcPEJFId-jG2dLZTWp54U2gnKK2djerM8FyjPlR5D3l2ZPqEn_cV4amkYr5HkzpfJ_4fZ52Sgzz_zXpdptPJFE9Ch4oMSi-ajYwGG5yl6pO7j31gI4crdtHN';

// var message = {
//   data: {
//     score: '850',
//     time: '2:45'
//   },
//   token: registrationToken
// };

// Send a message to the device corresponding to the provided
// registration token.
// admin.messaging().send(message)
//   .then((response) => {
//     // Response is a message ID string.
//     console.log('Successfully sent message:', response);
//   })
//   .catch((error) => {
//     console.log('Error sending message:', error);
//   });

  var topic = 'test';

var message = {
  data: {
    title: '여기는 타이틀',
    body: '이곳은 바디'
  },
  topic: topic
};

// Send a message to devices subscribed to the provided topic.
admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });