export const environment = {
    production: true,
    apiHost: 'https://api.podnoms.com',
    signalRHost: 'https://rt.podnoms.com',
    vapidPublicKey:
        'BJQY5jNSGoa3SVqxlHH3fyhpBx_7pMrqijh92bM4cwZlmfSYrsRG-8Ci1VYkHr3W13Uh2nWmLTRL00pc7HBdias',
    helpUrl: 'https://talk.podnoms.com/',
    version: require('../../package.json').version,
    appInsights: {
        instrumentationKey: '020b002a-bd3d-4b25-8a74-cab16fd39dfc'
    }
};
