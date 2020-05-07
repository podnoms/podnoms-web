interface Scripts {
    name: string;
    src: string;
}
export const ScriptStore: Scripts[] = [
    { name: 'stripe', src: 'https://checkout.stripe.com/checkout.js' },
    {
        name: 'coinbase',
        src: 'https://commerce.coinbase.com/v1/checkout.js?version=201807'
    },
    // {
    //     name: 'facebook',
    //     src: 'https://connect.facebook.net/en_US/sdk.js'
    // },
    {
        name: 'gapi',
        src: 'https://apis.google.com/js/platform.js'
    },
    {
        name: 'gclient',
        src: 'https://apis.google.com/js/client.js'
    }
];
