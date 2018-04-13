
const ROOT_URL = 'https://api.podnoms.com';

export const environment = {
    production: false,
    // API_HOST: 'http://localhost:5000',
    API_HOST: ROOT_URL,
    SIGNALR_HOST: 'https://api.podnoms.com',
    AUTH0_REDIRECT_URL: 'http://localhost:4200/callback',
    BASE_URL: 'http://localhost:4200/',
    appInsights: {
        instrumentationKey: '020b002a-bd3d-4b25-8a74-cab16fd39dfc'
    },
    messaging: {
        endpoint: 'https://fcm.googleapis.com/fcm/send'
    }
};
