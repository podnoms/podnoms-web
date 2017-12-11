console.log('auth.js');
chrome.runtime.onMessage.addListener(function(event, sender, sendResponse) {
    if (event.type === 'authenticate') {
        let options = {
            scope: 'openid profile offline_access',
            device: 'chrome-extension'
        };
        new Auth0Chrome(env.AUTH0_DOMAIN, env.AUTH0_CLIENT_ID)
            .authenticate(options)
            .then(function(authResult) {
                localStorage.authResult = JSON.stringify(authResult);
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: 'images/icon-128.png',
                    title: 'Login Successful',
                    message: 'You can use the app now'
                });
            })
            .catch(function(err) {
                chrome.notifications.create({
                    type: 'basic',
                    title: 'Login Failed',
                    message: err.message,
                    iconUrl: 'images/icon-128.png'
                });
            });
    }
});
