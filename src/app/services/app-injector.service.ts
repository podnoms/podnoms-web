import { Injectable, Injector } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AppInjector {
    private static instance: AppInjector;
    private injector: Injector;

    static getInstance() {
        if (!AppInjector.instance) {
            AppInjector.instance = new AppInjector();
        }

        return AppInjector.instance;
    }

    private constructor() {}

    setInjector(injector: Injector) {
        this.injector = injector;
    }

    getInjector(): Injector {
        return this.injector;
    }
}
