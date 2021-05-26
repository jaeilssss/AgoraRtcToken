//firebase funtions 한국 서버로 설정
const functions = require("firebase-functions").region("asia-northeast3");
const firebase_tools = require("firebase-tools");

//Agora 액세스 토큰빌더,역할 설정
const {RtcTokenBuilder, RtcRole} = require("agora-access-token");
//Agora 앱아이디
const APP_ID = "1186f40c5f4743a7b0650c9a6a0565d6";
//Agora 시크릿
const APP_CERTIFICATE = "ac57e6cc2fb144c1a8659423f1d7724e";

// Cloud Functions으로 토큰 생성 함수 만듦.
exports.generateToken = functions.https.onCall((data)=>{

  // Agora 채널이름
  const channelName = data.channelName;
  //Agora uid
  const uid = data.uid;
  // Agora 역할
  let role = RtcRole.SUBSCRIBER;

  //역할이 트루라면 퍼블리셔로 바꾼다.
  if (data.role == true) {
    role = RtcRole.PUBLISHER;
  }

  // 중단되는 시간
  const expireTime = data.expireTime;
  //현재시간
  const currentTime = Math.floor(Date.now() / 1000);
  //현재부터 중단되는 시간
  const privilegeExpireTime = currentTime + expireTime;
  // Agora 토큰
  const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE,
    channelName, uid, role, privilegeExpireTime);

  // json형식으로 token값 반환
  return {"token" : token};
});

exports.recursiveDelete = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB'
  })
  .https.onCall(async (data) => {
    // Only allow admin users to execute this function.
    // if (!(context.auth && context.auth.token && context.auth.token.admin)) {
    //   throw new functions.https.HttpsError(
    //     'permission-denied',
    //     'Must be an administrative user to initiate delete.'
    //   );
    // }

    const path = data.path;
    console.log(
      // `User ${context.auth.uid} has requested to delete path ${path}`
      'test'
    );

    // Run a recursive delete on the given document or collection path.
    // The 'token' must be set in the functions config, and can be generated
    // at the command line by running 'firebase login:ci'.
    await firebase_tools.firestore
      .delete(path, {
        project: process.env.GCLOUD_PROJECT,
        recursive: true,
        yes: true,
      });

    return {
      path: path
    };
  });

