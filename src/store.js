import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
// reducers
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

const firebaseConfig = {
    apiKey: "AIzaSyA_dh5bnCsxhw9GDmUGLCjnayWL7zz0n_I",
    authDomain: "reactclientpanel-3e3a3.firebaseapp.com",
    databaseURL: "https://reactclientpanel-3e3a3.firebaseio.com",
    projectId: "reactclientpanel-3e3a3",
    storageBucket: "reactclientpanel-3e3a3.appspot.com",
    messagingSenderId: "309807244071"
};

// react-redux firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
}

// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firebase
//const firestore = firebase.firestore();
//const settings = {timestampsInSnapshots: true};
//firestore.settings(settings);

// add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notify: notifyReducer,
    settings: settingsReducer
});

// check for settings in local storage
if(localStorage.getItem('settings') == null){
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  }

  //set to local storage
  localStorage.setItem('settings',JSON.stringify(defaultSettings));
}
// Create initial state
const initialState = {settings: JSON.parse(localStorage.getItem('settings'))};

// Create store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store;