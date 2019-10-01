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
    {
        name: 'facebook',
        src: 'https://connect.facebook.net/en_US/sdk.js'
    }
];
