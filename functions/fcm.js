const functions = require("firebase-functions").region("asia-northeast3");
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.sendCloudMessage = functions.https.onCall((data) => {

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



