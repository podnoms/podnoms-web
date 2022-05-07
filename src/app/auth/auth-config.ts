import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';

const config = {
  autologin: false,
  providers: [
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(
        '357461672895-2mevm3b10b4bd3gjdvugl00up8ba2n4m.apps.googleusercontent.com'
      ),
      lazyLoad: true,
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      // provider: new FacebookLoginProvider('117715354940616')
      provider: new FacebookLoginProvider('1887182031397435'),
      lazyLoad: true,
    },
  ],
};
export default config;
