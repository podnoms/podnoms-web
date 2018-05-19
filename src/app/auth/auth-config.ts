import {
    GoogleLoginProvider,
    FacebookLoginProvider,
    AuthServiceConfig
} from 'angularx-social-login';

const config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(
            '357461672895-2mevm3b10b4bd3gjdvugl00up8ba2n4m.apps.googleusercontent.com'
        )
    },
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('117715354940616')
    }
]);
export function authServiceConfig() {
    return config;
}
