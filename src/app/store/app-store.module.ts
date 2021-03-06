import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { EntityStoreModule } from './entity-store.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../shared/auth/token.interceptor';
import { PodcastDataService } from '../podcasts/podcast-data.service';
import { EntryDataService } from '../podcasts/entry-data.service';
import { LoggerModule } from 'ngx-logger';

@NgModule({
    imports: [
        StoreModule.forRoot(
            {},
            {
                // TODO: should re-enable these
                runtimeChecks: {
                    strictStateImmutability: false,
                    strictActionImmutability: false,
                },
            }
        ),
        EffectsModule.forRoot([]),
        environment.production ? [] : StoreDevtoolsModule.instrument(),
        EntityStoreModule,
        LoggerModule.forRoot(environment.logConfig),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
        PodcastDataService,
        EntryDataService,
    ],
})
export class AppStoreModule {}
