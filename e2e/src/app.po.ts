import { browser, by, element } from 'protractor';

export class AppPage {
    navigateTo(): Promise<unknown> {
        return browser.get(browser.baseUrl) as Promise<unknown>;
    }

    getTitleText(): Promise<string> {
        // element(by.css('app-root'))
        //     .getText()
        //     .then((r) => {
        //         console.log('app.po', 'getTitleText', r);
        //     })
        //     .catch((err) => {
        //         console.error('app.po', 'getTitleText', err);
        //     });

        return element(
            by.css('app-root span.text-primary-dark')
        ).getText() as Promise<string>;
    }
}
