export const environment = {
    production: false,
    signalRHost: 'http://localhost:5000',
    apiHost: 'http://localhost:5000',
    vapidPublicKey: 'BNfw7YvE15a7JdmladYN0Gx5U8y2x0kZyLswuXLemz8dzU36ssI-pRbTEfNct2TzQC5K4KU5raPcV1PkYeMjtz4',
    helpUrl: 'https://talk.podnoms.com/',
    version: `${require('../../package.json').version}-debug`,
    appInsightsConfig: { instrumentationKey: '020b002a-bd3d-4b25-8a74-cab16fd39dfc' },
    dropboxAppKey: '1eovrmddgatke5a',
    firebase: {
        apiKey: 'AIzaSyA5pGl4o1oGJi1Ke-842Lq0VvL2YZU2rfc',
        authDomain: 'podnoms-api.firebaseapp.com',
        databaseURL: 'https://podnoms-api.firebaseio.com',
        projectId: 'podnoms-api',
        storageBucket: 'podnoms-api.appspot.com',
        messagingSenderId: '357461672895'
    }
};
import 'zone.js/dist/zone-error'; // Included with Angular CLI.
