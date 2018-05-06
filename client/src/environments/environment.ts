// const ROOT_URL = 'https://api.podnoms.com';
const ROOT_URL = 'http://localhost:5000';

export const environment = {
    production: false,
    API_HOST: ROOT_URL,
    DOMAIN: 'localhost',
    SIGNALR_HOST: ROOT_URL,
    BASE_URL: 'http://localhost:4200/',
    HELP_URL: 'https://talk.podnoms.com',
    appInsights: {
        instrumentationKey: '020b002a-bd3d-4b25-8a74-cab16fd39dfc'
    },
    messaging: {
        endpoint: 'https://fcm.googleapis.com/fcm/send'
    }
};
