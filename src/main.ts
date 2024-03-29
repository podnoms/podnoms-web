import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import { AppInjector } from 'app/services/app-injector.service';

//#region console overwrite

if (
    environment.production &&
    // false &&
    location.host.indexOf('localhost') !== 0 &&
    location.host.indexOf('podnoms.dev.fergl.ie') !== 0
) {
    enableProdMode();

    // if (typeof window.console !== 'undefined') {
    //     // window.this.logger.debug = function() {};
    //     // window.console.debug = function() {};
    //     // window.console.warn = function() {};
    //     // window.this.logger.error = function() {};
    // }
}
//#endregion

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then((moduleRef) => {
        AppInjector.getInstance().setInjector(moduleRef.injector);
        if ('serviceWorker' in navigator && environment.production) {
            navigator.serviceWorker.register('/ngsw-worker.js');
        }
    })
    .catch((err) => console.error(err));
