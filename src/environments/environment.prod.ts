export const environment = {
    production: true,
    publicPageEnabled: true,
    apiHost: 'https://api.podnoms.com',
    signalRHost: 'https://rt.podnoms.com',
    radioHost: 'https://radio.podnoms.com',
    radioMount: 'podnoms',
    vapidPublicKey:
        'BNfw7YvE15a7JdmladYN0Gx5U8y2x0kZyLswuXLemz8dzU36ssI-pRbTEfNct2TzQC5K4KU5raPcV1PkYeMjtz4',
    helpUrl: 'https://talk.podnoms.com/',
    version: require('../../package.json').version,
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
    stripeKey: 'pk_live_OuzgnXHEMRQ4NueI4YVvcLYa',
    recaptchaKey: '6Ldu4acUAAAAAPNihpgZTPxECB9f9HvYEVwKXz2k',,
    features: {
        googleContactSyncEnabled: true
    }
};
