export const environment = {
    production: true,
    // apiHost: 'https://api.podnoms.com',
    // signalRHost: 'https://rt.podnoms.com',
    signalRHost: 'http://localhost:5000',
    apiHost: 'http://localhost:5000',
    vapidPublicKey:
        'BJQY5jNSGoa3SVqxlHH3fyhpBx_7pMrqijh92bM4cwZlmfSYrsRG-8Ci1VYkHr3W13Uh2nWmLTRL00pc7HBdias',
    helpUrl: 'https://talk.podnoms.com/',
    version: require('../../package.json').version,
    appInsightsConfig: { instrumentationKey: '020b002a-bd3d-4b25-8a74-cab16fd39dfc' },
    dropboxAppKey: '1eovrmddgatke5a'
};
