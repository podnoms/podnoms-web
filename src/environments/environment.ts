// const ROOT_URL = 'https://api.podnoms.com';
const ROOT_URL = 'http://localhost:5000';

export const environment = {
    production: false,
    API_HOST: ROOT_URL,
    DOMAIN: 'localhost',
    SIGNALR_HOST: ROOT_URL,
    BASE_URL: 'http://localhost:4200/',
    HELP_URL: 'https://talk.podnoms.com',
    appInsights: {
        instrumentationKey: '020b002a-bd3d-4b25-8a74-cab16fd39dfc'
    },
    messaging: {
        endpoint: 'https://fcm.googleapis.com/fcm/send'
    },
    firebase: {
        apiKey: 'AIzaSyA5pGl4o1oGJi1Ke-842Lq0VvL2YZU2rfc',
        authDomain: 'podnoms-api.firebaseapp.com',
        databaseURL: 'https://podnoms-api.firebaseio.com',
        projectId: 'podnoms-api',
        storageBucket: 'podnoms-api.appspot.com',
        messagingSenderId: '357461672895'
    }
};
