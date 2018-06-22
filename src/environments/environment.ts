// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    signalRHost: 'http://localhost:5000',
    apiHost: 'http://localhost:5000',
    vapidPublicKey: '',
    helpUrl: 'https://talk.podnoms.com/',
    version: `${require('../../package.json').version}-debug`,
    appInsights: {
        instrumentationKey: '020b002a-bd3d-4b25-8a74-cab16fd39dfc'
    }
};
