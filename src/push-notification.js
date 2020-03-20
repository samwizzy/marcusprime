import firebase from 'firebase';

export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: '912251290177'
  });
}

export const askForPermissioToReceiveNotifications = async () => {
  try {

    const messaging = firebase.messaging();

    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('user token: ', token);

    messaging.onMessage(function(payload) {
      console.log("Message received. ", payload);
    });

    return token;
  } catch (error) {
    console.log("Unable to get permission to notify.", error);
    console.error(error);
  }
}
