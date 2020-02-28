export const environment = {
    production: false,
    publicPageEnabled: true,
    signalRHost: 'https://podnoms.local:5001',
    apiHost: 'https://podnoms.local:5001',
    radioHost: 'http://localhost:8000',
    radioMount: 'podnoms',
    vapidPublicKey:
        'BNfw7YvE15a7JdmladYN0Gx5U8y2x0kZyLswuXLemz8dzU36ssI-pRbTEfNct2TzQC5K4KU5raPcV1PkYeMjtz4',
    helpUrl: 'https://talk.podnoms.com/',
    version: `${require('../../package.json').version}-debug`,
    dropboxAppKey: '1eovrmddgatke5a',
    firebase: {
        apiKey: 'AIzaSyA5pGl4o1oGJi1Ke-842Lq0VvL2YZU2rfc',
        authDomain: 'podnoms-api.firebaseapp.com',
        databaseURL: 'https://podnoms-api.firebaseio.com',
        projectId: 'podnoms-api',
        storageBucket: 'podnoms-api.appspot.com',
        messagingSenderId: '357461672895'
    },
    facebook: {
        appId: '1887182031397435',
        version: 'v3.2'
    },
    google: {
        apiKey: 'AIzaSyAw5b_4i7wRqiYGq0bTIjn9VMREFfGqMFA',
        clientId:
            '357461672895-2gtfpasdoguj46vvjv0ohmuii2669ubv.apps.googleusercontent.com'
    },
    stripeKey: 'pk_test_mGinslLydr5VhY65rgHu3hw7',
    recaptchaKey: '6Ldu4acUAAAAAPNihpgZTPxECB9f9HvYEVwKXz2k'
};
import 'zone.js/dist/zone-error';
