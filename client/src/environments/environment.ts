export const environment = {
    production: false,
    API_HOST: 'http://localhost:5000',
    SIGNALR_HOST: 'http://localhost:5000/',
    AUTH0_REDIRECT_URL: 'http://localhost:4200/callback',
    BASE_URL: 'http://localhost:4200/',
    appInsights: {
        instrumentationKey: '020b002a-bd3d-4b25-8a74-cab16fd39dfc'
    },
    messaging: {
        endpoint: 'https://fcm.googleapis.com/fcm/send'
    }
};
