export const environment = {
    production: true,
    apiHost: 'https://api.podnoms.com',
    vapidPublicKey:
        'BPFj5ZR_5j6OC9dT-KFUxBxfoXCfVSPckUUSv1ziL-YFFeHviPPDRjiEu1IOhilxMabRzll4yNQhPSNm0HAo81E',
    signalRHost: 'https://rt.podnoms.com/',
    helpUrl: 'https://talk.podnoms.com/',
    version: require('../../package.json').version,
    appInsights: {
        instrumentationKey: '020b002a-bd3d-4b25-8a74-cab16fd39dfc'
    }
};
