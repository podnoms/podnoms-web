// tslint:disable-next-line:max-line-length
const before = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const after = { re: '\\+', flags: 'gi' };

export const environment = {
    production: true,
    apiHost: 'https://api.podnoms.com',
    signalRHost: 'https://rt.podnoms.com',
    vapidPublicKey: 'BNfw7YvE15a7JdmladYN0Gx5U8y2x0kZyLswuXLemz8dzU36ssI-pRbTEfNct2TzQC5K4KU5raPcV1PkYeMjtz4',
    helpUrl: 'https://talk.podnoms.com/',
    version: require('../../package.json').version,
    appInsightsConfig: { instrumentationKey: '020b002a-bd3d-4b25-8a74-cab16fd39dfc' },
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
    emailRegex: new RegExp(after.re, after.flags)
};
