export const environment = {
    production: true,
    DOMAIN: 'podnoms.com',
    API_HOST: 'https://api.podnoms.com',
    SIGNALR_HOST: 'https://rt.podnoms.com',
    BASE_URL: 'https://podnoms.com',
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
