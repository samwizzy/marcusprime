const prodConfig = {

    apiKey: "AIzaSyAmOHeT5bubvC1xbfD58GR3Bbb-7Oqgd0k",
    authDomain: "m36ng-f100d.firebaseapp.com",
    databaseURL: "https://m36ng-f100d.firebaseio.com",
    projectId: "m36ng-f100d",
    storageBucket: "m36ng-f100d.appspot.com",
    messagingSenderId: "912251290177",
    appId: "1:912251290177:web:6c22f597b2abdc4ea5fcc0",
    measurementId: "G-9TEE59TRPM",

    // apiKey: "AIzaSyBZEwsFfzuXN_NXOocJoztU7v2ZF-2d-rY",
    // authDomain: "marcus-e9a97.firebaseapp.com",
    // databaseURL: "https://marcus-e9a97.firebaseio.com",
    // projectId: "marcus-e9a97",
    // storageBucket: "marcus-e9a97.appspot.com",
    // messagingSenderId: "786770346235",
    // appId: "1:786770346235:web:80e142e2a5fe23bb"
};

const devConfig = {

    apiKey: "AIzaSyAmOHeT5bubvC1xbfD58GR3Bbb-7Oqgd0k",
    authDomain: "m36ng-f100d.firebaseapp.com",
    databaseURL: "https://m36ng-f100d.firebaseio.com",
    projectId: "m36ng-f100d",
    storageBucket: "m36ng-f100d.appspot.com",
    messagingSenderId: "912251290177",
    appId: "1:912251290177:web:6c22f597b2abdc4ea5fcc0",
    measurementId: "G-9TEE59TRPM",

    // apiKey: "AIzaSyBZEwsFfzuXN_NXOocJoztU7v2ZF-2d-rY",
    // authDomain: "marcus-e9a97.firebaseapp.com",
    // databaseURL: "https://marcus-e9a97.firebaseio.com",
    // projectId: "marcus-e9a97",
    // storageBucket: "marcus-e9a97.appspot.com",
    // messagingSenderId: "786770346235",
    // appId: "1:786770346235:web:80e142e2a5fe23bb"
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
