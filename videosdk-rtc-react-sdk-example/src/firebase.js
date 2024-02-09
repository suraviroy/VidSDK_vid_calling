import { initializeApp } from 'firebase/app';
import { getMessaging, isSupported, onMessage, getToken } from "firebase/messaging";

// Replace this firebaseConfig object with the congurations for the project you created on your firebase console. 
const firebaseConfig = {
  apiKey: "AIzaSyAg77ypFy4ZlhaSvv4qOpXL0b8PJQDLWLA",
  authDomain: "push-notification-ndg.firebaseapp.com",
  projectId: "push-notification-ndg",
  storageBucket: "push-notification-ndg.appspot.com",
  messagingSenderId: "394255299629",
  appId: "1:394255299629:web:14a36d10b841ff26aaf4a4",
  measurementId: "G-YC1LGTCY0E"
};
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);
initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
    return  getToken(messaging, {vapidKey:'BITvsOJfZfCjxtMY4LDp9hZy8isXpmalvh59Z0Un2PgXp0Eri6H60qt5kpxbwcBelMv085u9PqhuFeE61Vh5cn4', })
      .then((currentToken) => {
        if (currentToken) {
          console.log('current token for client: ', currentToken);
          // Perform any other neccessary action with the token
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  };




  export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });

  
  // export const registerServiceWorker = () => {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker.getRegistrations().then((registrations) => {
  //       for (const registration of registrations) {
  //         registration.unregister();
  //       }
  //     });
  //   }
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker.register('/firebase-messaging-sw.js')
  //     .then(function(registration) {
  //       console.log('Registration successful, scope is:', registration.scope);
  //     }).catch(function(err) {
  //       console.log('Service worker registration failed, error:', err);
  //     });
  //   }
  // };
  