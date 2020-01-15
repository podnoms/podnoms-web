export const environment = {
    production: true,
    apiHost: 'https://api.podnoms.com',
    signalRHost: 'https://rt.podnoms.com',
    radioHost: 'http://radio.podnoms.com:8000',
    radioMount: 'podnoms',
    vapidPublicKey:
        'BNfw7YvE15a7JdmladYN0Gx5U8y2x0kZyLswuXLemz8dzU36ssI-pRbTEfNct2TzQC5K4KU5raPcV1PkYeMjtz4',
    helpUrl: 'https://talk.podnoms.com/',
    version: require('../../package.json').version,
    appInsightsConfig: {
        instrumentationKey: '020b002a-bd3d-4b25-8a74-cab16fd39dfc'
    },
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
    stripeKey: 'pk_live_OuzgnXHEMRQ4NueI4YVvcLYa',
    recaptchaKey: '6Ldu4acUAAAAAPNihpgZTPxECB9f9HvYEVwKXz2k'
};
