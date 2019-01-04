export const environment = {
    production: false,
    signalRHost: 'http://localhost:5000',
    apiHost: 'http://localhost:5000',
    vapidPublicKey: '',
    helpUrl: 'https://talk.podnoms.com/',
    version: `${require('../../package.json').version}-debug`,
    appInsightsConfig: { instrumentationKey: '020b002a-bd3d-4b25-8a74-cab16fd39dfc' },
    dropboxAppKey: '1eovrmddgatke5a'
};
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
