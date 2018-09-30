import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

//#region console overwrite

if (environment.production && location.host.indexOf('localhost') !== 0) {
enableProdMode();
    console.log(
        `%c ________________________________________
< mooooooooooooooooooooooooooooooooooooo >
<        Looking under the hood?         >
<  Join us: http://github.com/podnoms    >
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
}
//#endregion
if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.log(err));
