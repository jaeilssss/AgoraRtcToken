const functions = require("firebase-functions").region("asia-northeast3");
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.sendCloudMessageByToken = functions.https.onCall((data) => {

    var registrationToken = data.token;
    var title = data.title;
    var body = data.body;

    var message = {
        data: {
            title: title,
            body: body
        },
        token: registrationToken
    };

    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
});

exports.sendCloudMessageByTokens = functions.https.onCall((data) => {

    var tokens = data.tokens;
    var title = data.title;
    var body = data.body;

    var message = {
        data: {
            title: title,
            body: body
        },
        token: tokens
    };

    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
});

exports.sendCloudMessageByTopic = functions.https.onCall((data) => {

    var topic = data.topic;
    var title = data.title;
    var body = data.body;

    var message = {
        data: {
            title: title,
            body: body
        },
        topic: topic
    };

    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
});



