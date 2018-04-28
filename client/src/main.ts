import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
    console.log(
        `%c ________________________________________
< mooooooooooooooooooooooooooooooooooooo >
<        Looking under the hood?         >
<      Source: http://bit.ly/2HzR9Qk     >
 ----------------------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`,
        'font-family:monospace; color: brown; font-size: x-large'
    );

    if (typeof window.console !== 'undefined') {
        window.console.log = function() {};
        window.console.debug = function() {};
        window.console.warn = function() {};
        window.console.error = function() {};
    }
    // window.console.error = function () { };
}

platformBrowserDynamic().bootstrapModule(AppModule);
